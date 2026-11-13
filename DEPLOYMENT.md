# Déploiement — LUXCLEAN MALI

## 1. Hébergement : Cloudflare Pages (gratuit)

1. Créez un compte sur [dash.cloudflare.com](https://dash.cloudflare.com) (gratuit).
2. **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → sélectionnez ce dépôt GitHub.
3. Paramètres de build :
   - Build command : `npm run build`
   - Build output directory : `dist`
   - Node version (variable d'environnement) : `NODE_VERSION = 22` (dans Settings → Environment variables, si besoin)
4. Cliquez **Save and Deploy**. Cloudflare build et déploie automatiquement à chaque `git push` sur la branche principale.

## 2. Domaine : luxcleanmali.com

1. Achetez `luxcleanmali.com` sur Namecheap (déjà le domaine utilisé partout dans le code et le référencement).
2. Dans Cloudflare Pages → **votre projet** → **Custom domains** → **Set up a custom domain** → entrez `luxcleanmali.com`.
3. Cloudflare vous donne des **nameservers** à renseigner chez Namecheap (Domain List → Manage → Nameservers → Custom DNS).
4. Propagation : quelques minutes à 24h. SSL automatique et gratuit.
5. Bonus gratuit : **Email Routing** dans Cloudflare (Email → Email Routing) pour recevoir les emails `contact@luxcleanmali.com` directement dans votre Gmail, sans payer d'hébergement email.

## 3. À confirmer avant mise en ligne

- Vérifiez le numéro Moov Money (`PAYMENT_METHODS` dans `src/data/mockData.ts`) — il contient encore un numéro placeholder (`+223 99 00 00 00`). Remplacez-le par votre vrai numéro Moov Money avant le lancement.

## 4. Mises à jour futures

Chaque modification de code + `git push` redéploie automatiquement en moins d'une minute. Pas de FTP, pas de serveur à gérer.
