/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Pages Function: POST /api/estimate-condition
 *
 * Receives 1-3 client-submitted photos (base64 JPEG) of an item (carpet, sofa,
 * carpet floor, mattress, car seat...) and asks Gemini's vision model to classify
 * how dirty/worn it looks into one of three tiers: leger / modere / severe.
 *
 * This NEVER produces a final binding price. It only returns an indicative
 * severity tier + short justification; the actual price multiplier is applied
 * client-side (see src/data/mockData.ts DIRT_SEVERITY_TIERS) and the final
 * price is always confirmed by a human after the client sends photos on
 * WhatsApp. This keeps the business safe from disputes over an AI "quote".
 *
 * Required environment variable (set in Cloudflare Pages dashboard, NEVER
 * committed to git): GEMINI_API_KEY
 * Optional: GEMINI_MODEL (defaults to "gemini-2.5-flash"). Bump this string
 * if/when a newer Gemini flash model becomes current — no other code changes
 * needed.
 */

interface EstimateRequestBody {
  images: string[]; // array of base64-encoded JPEG strings (no data: prefix, or with it — both handled below)
  category?: string; // e.g. "tapis", "canapes", "moquette_mosquee", "moquette_bureau", "matelas", "auto"
}

interface GeminiPart {
  text?: string;
  inline_data?: { mime_type: string; data: string };
}

const MAX_IMAGES = 3;
const MAX_IMAGE_BYTES = 2_500_000; // ~2.5MB per image after base64 decode, generous ceiling (client compresses well below this)

const CATEGORY_LABELS: Record<string, string> = {
  tapis: 'un tapis ou une carpette',
  canapes: 'un canapé, fauteuil ou salon',
  moquette_mosquee: 'une moquette de mosquée',
  moquette_bureau: 'une moquette de bureau',
  matelas: 'un matelas',
  auto: "l'intérieur d'un véhicule (sièges/moquette)",
};

function stripDataUrlPrefix(input: string): string {
  const match = input.match(/^data:image\/[a-zA-Z0-9+.-]+;base64,(.*)$/);
  return match ? match[1] : input;
}

function base64ByteLength(base64: string): number {
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;
  return Math.floor((base64.length * 3) / 4) - padding;
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequestPost: PagesFunction<{ GEMINI_API_KEY: string; GEMINI_MODEL?: string }> = async (context) => {
  const { request, env } = context;

  if (!env.GEMINI_API_KEY) {
    return jsonResponse(
      { error: 'server_misconfigured', message: "Clé API Gemini non configurée côté serveur." },
      500,
    );
  }

  let body: EstimateRequestBody;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: 'invalid_json' }, 400);
  }

  if (!body || !Array.isArray(body.images) || body.images.length === 0) {
    return jsonResponse({ error: 'no_images', message: 'Aucune photo reçue.' }, 400);
  }

  const images = body.images.slice(0, MAX_IMAGES).map(stripDataUrlPrefix);

  for (const img of images) {
    if (base64ByteLength(img) > MAX_IMAGE_BYTES) {
      return jsonResponse({ error: 'image_too_large', message: 'Une photo dépasse la taille autorisée.' }, 413);
    }
  }

  const categoryLabel = (body.category && CATEGORY_LABELS[body.category]) || 'un article textile';

  const promptText = `Tu es un expert en nettoyage professionnel haute pression (injection-extraction) pour l'entreprise LUXCLEAN MALI à Bamako. On te montre ${images.length} photo(s) de ${categoryLabel} envoyée(s) par un client potentiel pour obtenir une estimation de prix.

Évalue UNIQUEMENT le niveau de salissure/usure visible sur les photos (poussière incrustée, taches, auréoles, odeurs suggérées par l'état visuel, ancienneté de la saleté). Classe-le dans l'une de ces 3 catégories exactes :
- "leger" : entretien courant, poussière superficielle, pas de tache visible.
- "modere" : taches visibles, poussière incrustée (ex. poussière rouge de latérite typique de Bamako), usage régulier sans entretien récent.
- "severe" : taches anciennes ou profondes, salissure très marquée, forte fréquentation ou longue durée sans nettoyage.

Réponds STRICTEMENT en JSON valide, sans texte autour, au format exact :
{"tier": "leger" | "modere" | "severe", "confidence": <nombre entre 0 et 1>, "justification": "<une phrase courte en français expliquant ton évaluation, destinée au client>"}`;

  const parts: GeminiPart[] = [{ text: promptText }];
  for (const data of images) {
    parts.push({ inline_data: { mime_type: 'image/jpeg', data } });
  }

  const model = env.GEMINI_MODEL || 'gemini-2.5-flash';
  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${env.GEMINI_API_KEY}`;

  let geminiRes: Response;
  try {
    geminiRes = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      }),
    });
  } catch {
    return jsonResponse({ error: 'upstream_unreachable', message: "Impossible de contacter le service d'analyse." }, 502);
  }

  if (!geminiRes.ok) {
    const errText = await geminiRes.text().catch(() => '');
    return jsonResponse(
      { error: 'upstream_error', message: "Le service d'analyse a retourné une erreur.", detail: errText.slice(0, 500) },
      502,
    );
  }

  let geminiJson: any;
  try {
    geminiJson = await geminiRes.json();
  } catch {
    return jsonResponse({ error: 'upstream_bad_response' }, 502);
  }

  const rawText: string | undefined = geminiJson?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) {
    return jsonResponse({ error: 'no_content', message: "Réponse vide de l'analyse." }, 502);
  }

  let parsed: { tier?: string; confidence?: number; justification?: string };
  try {
    parsed = JSON.parse(rawText);
  } catch {
    return jsonResponse({ error: 'unparseable_response', message: "Réponse de l'analyse illisible." }, 502);
  }

  const validTiers = ['leger', 'modere', 'severe'];
  if (!parsed.tier || !validTiers.includes(parsed.tier)) {
    return jsonResponse({ error: 'invalid_tier', message: 'Catégorie de salissure non reconnue.' }, 502);
  }

  return jsonResponse({
    tier: parsed.tier,
    confidence: typeof parsed.confidence === 'number' ? Math.max(0, Math.min(1, parsed.confidence)) : 0.7,
    justification: typeof parsed.justification === 'string' ? parsed.justification.slice(0, 300) : '',
    source: 'ai',
  });
};

export const onRequestGet: PagesFunction = async () => {
  return jsonResponse({ error: 'method_not_allowed', message: 'Utilisez POST avec des photos.' }, 405);
};
