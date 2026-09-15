# 📸 Guide de Remplacement des Images avant Déploiement — LUXCLEAN MALI

Ce guide explique comment modifier ou remplacer n'importe quelle photo du site web avant de le déployer sur votre hébergement (Hostinger, Cloud Run, Vercel, VPS, etc.), **sans avoir de bouton upload visible par vos clients**.

---

## ⚡ Méthode 1 : Remplacement direct par fichier (Recommandé pour la production)

Toutes les images du site sont centralisées dans un seul fichier : **`src/config/siteImages.ts`**.

### Étape 1 : Déposez vos images dans le dossier `public/`
Glissez vos photos dans le dossier **`/public/`** du projet avec des noms simples, par exemple :
- `public/mon-nouveau-logo.jpg`
- `public/photo-hero.jpg`
- `public/canape-avant.jpg`
- `public/canape-apres.jpg`
- `public/tapis-nettoye.jpg`

> 💡 *Note : Tous les fichiers placés dans le dossier `/public/` sont directement accessibles à la racine de votre site (`/mon-image.jpg`).*

### Étape 2 : Indiquez le nom dans `src/config/siteImages.ts`
Ouvrez le fichier `src/config/siteImages.ts` et modifiez les chemins correspondants :

```ts
export const SITE_IMAGES = {
  // 1. Logo officiel
  brand: {
    logo: '/mon-nouveau-logo.jpg',
  },

  // 2. Photo d'accueil Hero
  hero: {
    main: '/photo-hero.jpg',
  },

  // 3. Galerie Avant / Après
  beforeAfter: {
    canape: {
      id: 'ba-1',
      title: 'Canapé d’angle en velours gris',
      before: '/canape-avant.jpg',
      after: '/canape-apres.jpg',
    },
    // ...
  },

  // 4. Cartes des Services
  services: {
    tapisMaison: '/tapis-nettoye.jpg',
    canapesSalons: '/canape-apres.jpg',
    // ...
  },
};
```

Enregistrez le fichier : **votre site prend instantanément en compte les nouvelles photos !**

---

## 🖥️ Méthode 2 : Prévisualisation Interactive Visuelle (Mode Administrateur Discret)

Pour tester visuellement vos photos depuis votre ordinateur sans toucher au code immédiatement :

1. **Comment ouvrir le panneau ?**
   - Appuyez sur **`Alt + M`** (ou `Cmd + M` sur Mac) sur votre clavier, **OU**
   - Cliquez sur le lien discret **`⚙️ Gestionnaire Médias`** situé tout en bas du site (à côté du copyright), **OU**
   - Ajoutez `?media=1` à l'URL dans votre navigateur.

2. **Ce que vous pouvez faire :**
   - Glisser-déposer n'importe quelle photo depuis votre ordinateur sur la section de votre choix (Logo, Hero, Canapés, Tapis, Mosquées, Bureaux, etc.).
   - Voir le résultat en direct sur le site sans recharger la page.
   - Cliquer sur **« Copier Code Config »** pour générer automatiquement le code à coller dans `src/config/siteImages.ts`.
   - Cliquer sur **« Rétablir Défaut »** si vous voulez revenir aux photos d'origine.

> 🔒 **Zéro bouton public :** Vos visiteurs normaux ne voient aucun bouton d'upload sur les sections du site. L'interface reste 100% épurée et élégante.

---

## 📐 Formats et dimensions recommandés

| Section | Emplacement | Format conseillé | Résolution recommandée |
|---|---|---|---|
| **Logo** | Barre de navigation, Hero & Footer | Carré (1:1) | 500x500 px ou 800x800 px |
| **Hero** | Grande photo d'action d'accueil | Paysage (16:9 ou 4:3) | 1200x800 px |
| **Avant / Après** | Canapés, Tapis, Mosquées, Bureaux | Paysage (4:3 ou 16:9) | 800x600 px ou 1200x800 px |
| **Services** | Tapis, Mosquées, Bureaux, Véhicules | Paysage (3:2) | 900x600 px |
| **TikTok** | Miniatures des vidéos virales | Portrait ou carré | 600x800 px |

---

## 🚀 Images déjà incluses et prêtes à l'emploi dans votre dossier `/public/`

- `/luxclean-logo.jpg` : Le logo officiel LuxClean Mali haute résolution.
- `/sofa-drill-scrub.jpg` : La photo de brossage mécanique rotatif en action.
- `/sofa-before-clean.jpg` : Photo réelle du canapé avant nettoyage.
- `/sofa-after-clean.jpg` : Photo réelle du canapé après nettoyage complet.
