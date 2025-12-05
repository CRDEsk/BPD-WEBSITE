# Bureau de Protection Digitale - Website

Site web institutionnel pour le Bureau de Protection Digitale (BPD).

## Installation

```bash
npm install
```

## Configuration

### Variables d'environnement

Créez un fichier `.env.local` avec :

```env
VITE_PDF_PASSWORD=your_password_here
```

**Pour Vercel** : Ajoutez `VITE_PDF_PASSWORD` dans les variables d'environnement du projet.

## Développement

```bash
npm run dev
```

Le site sera accessible sur `http://localhost:8081`

## Build

```bash
npm run build
```

## Déploiement sur Vercel

1. Connectez votre dépôt GitHub à Vercel
2. Ajoutez la variable d'environnement `VITE_PDF_PASSWORD` dans les paramètres du projet
3. Déployez !

Le fichier `vercel.json` est déjà configuré avec :
- Redirections SPA
- Headers de sécurité
- Cache pour les assets statiques

## Technologies

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- jsPDF (génération de PDF)

## Design

- Fond très clair (#FAFAFA)
- Accents rouge foncé (#4A1414)
- Gris anthracite (#2C2C2C)
- Style institutionnel et moderne

## Fonctionnalités

- ✅ Site bilingue (FR/EN)
- ✅ Génération de PDF avec logo et branding
- ✅ Documents protégés par mot de passe
- ✅ Formulaire de contact (Formspree)
- ✅ SEO optimisé (meta tags, sitemap, robots.txt)
- ✅ Error Boundary
- ✅ Code splitting pour les routes PDF
- ✅ Responsive design

