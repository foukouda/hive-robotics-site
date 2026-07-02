# Audit UI/UX — Landing page Hive Robotics

**Date :** 2026-04-17
**Scope :** Landing page complète (Hero → Final CTA)
**Méthodologie :** ui-ux-pro-max skill (règles §1-§10) + inspection runtime via chrome-devtools MCP + code review
**Viewports testés :** 375 (mobile), 1280 (laptop), 1440 (desktop)

---

## Résumé exécutif

| Priorité | Nombre de violations | Blocage lancement ? |
|----------|----------------------|---------------------|
| 🔴 Critique | 5 | Oui (WCAG fails + touch targets) |
| 🟠 Haute | 6 | Non, mais polish pro attendu |
| 🟡 Moyenne | 4 | Non |
| 🟢 Mineure | 2 | Non |

**Verdict :** fondations solides (alt text 18/18, heading hierarchy propre, reduced-motion respecté, Next Image partout) mais 5 violations critiques doivent sauter avant un audit WCAG ou un passage devant investisseur.

---

## 🔴 CRITIQUE — à corriger avant lancement

### 1. Focus rings invisibles sur CTAs et liens
**Règles violées :** §1 `focus-states`, WCAG 2.4.7
**Évidence :** diagnostic runtime → `outline: 2.4px none` sur tous les `<a>` ciblés. `globals.css:108` applique `outline-ring/50` sur `*` mais sans `focus:outline-solid focus:outline-2`, le style reste `none`. Aucun `focus-visible:` custom sur les boutons du hero/navbar.
**Impact :** navigation clavier impossible à suivre, fail WCAG.
**Fix proposé :** règle globale `:focus-visible` dans `globals.css` avec `@apply outline-2 outline-offset-2 outline-[#00E85C]`.

### 2. Contraste du mot rotatif `#00E85C` sur blanc
**Règles violées :** §1 `color-contrast`, §6 `color-accessible-pairs`, WCAG 1.4.3
**Évidence :** ratio mesuré ≈ **1.8:1**. Norme large text = 3:1, normal = 4.5:1.
**Fichier :** `src/components/sections/v3/hero-v3.tsx:67`
**Fix proposé :** swap pour `#00C853` (hive-green token, ~2.4:1 — toujours limite) ou passer à `text-[#1B3D2C]` avec décoration `underline decoration-[#00E85C]` pour garder la touche verte sans porter le sens sur la couleur.

### 3. Carousel dots 6×6 px + flèches 32×32
**Règles violées :** §2 `touch-target-size`, `no-precision-required`, WCAG 2.5.5 (24×24 min)
**Évidence :** diagnostic runtime → 24 éléments interactifs sous 40×40. 8 dots à **6×6 px** sur robots-v3.
**Fichier :** `src/components/sections/v3/robots-v3.tsx` (flèches lignes 42/50, dots ~l.64)
**Fix proposé :** padding invisible `p-3` autour du dot visuel 6×6, flèches en `w-11 h-11`.

### 4. Burger menu mobile 36×36
**Règles violées :** §2 `touch-target-size`
**Fichier :** `src/components/navbar-v3.tsx:95` — `w-9 h-9` (36×36)
**Fix proposé :** passer à `w-11 h-11` (44×44).

### 5. Skip-link manquant
**Règles violées :** §1 `skip-links`
**Évidence :** aucun `<a href="#main">Aller au contenu</a>` en tête de body. Navigation clavier doit parcourir toute la navbar à chaque page.
**Fichier :** `src/app/layout.tsx`
**Fix proposé :** skip-link `sr-only focus:not-sr-only` qui devient visible au focus.

---

## 🟠 HAUTE — polish pro

### 6. Emoji 🌱 utilisé comme icône
**Règle violée :** §4 `no-emoji-icons`
**Fichier :** `src/components/sections/v3/simulator-v3.tsx:359`
**Fix proposé :** remplacer par `<Leaf className="w-4 h-4 text-[#1B3D2C]" />` (Lucide).

### 7. Contraste `#A0AEC0` (2.2:1) sur texte
**Règle violée :** §6 `color-accessible-pairs`, WCAG 1.4.3
**Évidence :** sources/citations ("Statista 2023, Capgemini"), `text-[#A0AEC0]` à 12px.
**Fix proposé :** passer à `#718096` (ratio ~5:1) pour toutes les légendes/footnotes — critique sur un produit financier.

### 8. Rotating word hero sans aria-live ni pause
**Règles violées :** §1 `reduced-motion`, `voiceover-sr`
**Évidence :** `hero-v3.tsx:27-32` — `setInterval` JS non coupé par `prefers-reduced-motion`. Pas d'`aria-live="polite"`.
**Fix proposé :** wrapper le span dans `<span aria-live="polite">` et stopper l'interval via `useReducedMotion()` de framer-motion.

### 9. Couleurs hardcodées partout
**Règle violée :** §6 `color-semantic`
**Évidence :** `text-[#1B3D2C]` / `bg-[#E8F5EC]` dupliqués dans 20+ composants. Les tokens existent déjà dans `globals.css` (`--color-hive-green-brand`) mais ne sont pas utilisés.
**Impact :** maintenance, dark mode impossible, rebrand coûteux.
**Fix proposé :** mapper via `theme.colors.brand.DEFAULT` → utiliser `bg-brand text-on-brand`.

### 10. "la" orphelin dans le h1
**Règle violée :** §6 `whitespace-balance`
**Évidence :** `hero-v3.tsx:57` — `<span className="block">Investissez dans la</span>` force un retour, "la" atterrit seul ligne 2 à 1440px.
**Fix proposé :** `text-balance` (Tailwind v4) ou restructurer en `"Investissez dans\nla livraison de\n{mot}"`.

### 11. Page très longue en mobile
**Règle violée :** §5 `content-priority`
**Évidence :** 20 183px de scroll mobile, 12 sections.
**Fix proposé :** condenser "Garanties" en accordéon sur mobile, CTA intermédiaire après Traction.

---

## 🟡 MOYENNE — qualité

### 12. Vidéo hero autoplay sans pause control
**Règles violées :** §1 `interruptible`, §3 `network-fallback`
**Fichier :** `hero-v3.tsx:135-145`
**Fix proposé :** bouton pause visible en coin bas-droit.

### 13. Header "Lancement dans 39 jours" sans état de fin
**Règles violées :** §8 `timeout-feedback`, `empty-states`
**Fix proposé :** fallback "Campagne ouverte — investissez maintenant" quand delta ≤ 0.

### 14. Simulateur slider sans input numérique fallback
**Règle violée :** §8 `touch-friendly-input`
**Fichier :** `simulator-v3.tsx:299`
**Fix proposé :** `<input type="number">` synchronisé bidirectionnellement avec le slider.

### 15. Trust signals en pied de hero trop discrets
**Évidence :** "Autorisé en France / Décret 2024-1063" dans une barre grise fade (`bg-[#F7F9FC]`).
**Fix proposé :** promouvoir les logos IMMÉDIATEMENT après le premier CTA, intensifier le poids visuel du décret.

---

## 🟢 MINEUR

### 16. Ombre / élévation inconsistante
**Évidence :** `robot-models.tsx:89` utilise `shadow-[0_0_40px_rgba(0,102,255,0.06)]` (bleu) alors que la marque est verte.
**Fix proposé :** échelle unifiée avec teinte vert foncé.

### 17. Scroll vers ancres passe sous la navbar fixe
**Fix proposé :** ajouter `scroll-mt-24` aux sections cibles.

---

## ✅ Points positifs (ne pas casser)

- 0 image sans alt (18/18)
- Heading hierarchy propre (pas de skip)
- `prefers-reduced-motion` respecté (`globals.css:157`)
- `cursor-pointer` partout sur les CTAs
- Next Image utilisé partout → WebP + lazy auto
- CTA sticky mobile (`hero-v3.tsx:150`)
- Aucun overflow horizontal détecté

---

## Plan d'exécution

1. Fix #1 — Focus rings globaux
2. Fix #2 — Contraste mot rotatif
3. Fix #3 — Touch targets carousel
4. Fix #4 — Burger 44×44
5. Fix #5 — Skip-link

Ensuite : #6 (emoji), #7 (contrast muted), #8 (aria-live hero), #10 (orphelin).
