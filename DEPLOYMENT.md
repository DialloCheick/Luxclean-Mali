# Déploiement — LUXCLEAN MALI

## 1. Hébergement : Cloudflare Pages (gratuit)

1. Créez un compte sur [dash.cloudflare.com](https://dash.cloudflare.com) (gratuit).
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → sélectionnez ce dépôt GitHub.
3. Paramètres de build :
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Node version (variable d'environnement) : `NODE_VERSION = 22` (dans Settings → Environment variables, si besoin)
4. Cliquez **Save and Deploy**. Cloudflare build et déploie automatiquement à chaque `git push` sur la branche principale.

## 2. Variable secrète obligatoire : GEMINI_API_KEY

L'estimateur de prix par photo (`functions/api/estimate-condition.ts`) a besoin d'une clé API Gemini **côté serveur uniquement** — sans elle, le bouton "Analyser avec l'IA" affichera un message d'erreur gracieux (le reste du site fonctionne quand même).

1. Obtenez une clé gratuite sur [aistudio.google.com/apikey](https://aistudio.google.com/apikey).
2. Dans Cloudflare Pages : **votre projet** → **Settings** → **Environment variables**.
3. Ajoutez `GEMINI_API_KEY` = votre clé, cochez **Encrypt**, pour **Production** ET **Preview**.
4. Redéployez (ou attendez le prochain push) pour que la variable soit prise en compte.

Optionnel : `GEMINI_MODEL` (ex: `gemini-2.5-flash`) si vous voulez changer de modèle plus tard sans toucher au code.

## 3. Domaine : luxcleanmali.com

1. Achetez `luxcleanmali.com` sur Namecheap (déjà le domaine utilisé partout dans le code et le référencement).
2. Dans Cloudflare Pages → **votre projet** → **Custom domains** → **Set up a custom domain** → entrez `luxcleanmali.com`.
3. Cloudflare vous donne des **nameservers** à renseigner chez Namecheap (Domain List → Manage → Nameservers → Custom DNS).
4. Propagation : quelques minutes à 24h. SSL automatique et gratuit.
5. Bonus gratuit : **Email Routing** dans Cloudflare (Email → Email Routing) pour recevoir les emails `contact@luxcleanmali.com` directement dans votre Gmail, sans payer d'hébergement email.

## 4. À confirmer avant mise en ligne

- **URL Facebook réelle** : `COMPANY_INFO.facebookUrl` dans `src/data/mockData.ts` contient une URL provisoire (`https://www.facebook.com/luxcleanmali223`). Remplacez-la par l'adresse exacte de votre page.
- Vérifiez le numéro Moov Money (`PAYMENT_METHODS` dans `mockData.ts`) — il contient un numéro placeholder (`+223 99 00 00 00`).

## 5. Mises à jour futures

Chaque modification de code + `git push` redéploie automatiquement en moins d'une minute. Pas de FTP, pas de serveur à gérer.
