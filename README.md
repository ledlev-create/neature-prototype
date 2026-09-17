# Neature — Prototype interactif

Prototype HTML / CSS / JS sans framework.

## Objectif

Créer une maquette interactive codée et réutilisable, pensée comme un petit design system,
avant l'intégration finale dans WordPress avec le thème Uncode.

## Lancer le projet

Utiliser l'extension **Live Server** dans VS Code.

Le chargement des composants HTML utilise `fetch()`, il ne faut donc pas ouvrir
simplement `index.html` avec le protocole `file://`.

## Structure

- `index.html` : accueil
- `pages/` : autres pages
- `components/` : composants HTML réutilisables
- `css/design-system.css` : tokens et fondations
- `css/layout.css` : conteneurs et grilles
- `css/components/` : un fichier CSS par composant
- `css/themes/` : variantes de couleurs
- `js/components.js` : chargement des composants
- `docs/design-system.md` : documentation pour l'intégration WordPress / Uncode

## Tester une variante de couleurs

Dans `index.html`, remplacer :

`css/themes/default.css`

par :

`css/themes/variante-01.css`

ou :

`css/themes/variante-02.css`
