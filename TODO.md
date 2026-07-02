# TODO

## Textes à modifier

### Section "Conçus pour des environnements variés" (`src/components/sections/use-cases.tsx`)

- [x] Remplacer **"Centres commerciaux"** par **"Usine"** (titre + description + icône Factory) — *image `Dominos_3.png` à recréer, voir plus bas*

### Bandeau sous le hero (`src/components/sections/trust-bar.tsx`)

- [x] **Supprimer** la bannière actuelle "Autorisé en France / Décret 2024-1063 / Bourse French Tech / Lauréat / Moove Lab × Via ID / Accélérateur mobilité / Paris La Défense / Zone de déploiement / Léonard de Vinci"
- [x] **Remplacer** par un bandeau de **logos d'entreprises qui nous font confiance** — marquee pleine largeur défilant, fades latéraux, pause au hover, fade-in au scroll
- [x] Logos ajoutés aux partenaires déjà présents (Center Parcs, ChronoDrive, Aéroport Nice, Belambra, Carrefour) :
  - [x] **Paris La Défense** (`paris_la_defense_logo.png` — Wikimedia, qualité moyenne 192×262, remplacer par meilleure version si possible)
  - [x] **L'Oréal** (`loreal_logo.svg` — Wikimedia)
  - [x] **Moove Lab** (`moove_lab_logo.jpeg` — existant)
  - [x] **Stellantis** (`stellantis_logo.svg` — Wikimedia)
- [x] Même marquee appliqué à la section "Ils nous font confiance" dans `social-proof.tsx` (contraint à `hive-container`)

---

## Notes

- Les photos à recréer sont actuellement dans `public/images/carroussel_hero_section/` avec les anciens robots
- Conserver les mêmes noms de fichiers pour éviter de toucher au code, OU renommer et mettre à jour les `src` dans le code
- Formats recommandés : WebP/AVIF pour perf (fallback JPG si besoin), ratio paysage 4/3 ou 16/9 pour les cards

---

# 2026-04-25 — Refonte flow réservation (Stripe + Supabase)

## Contexte

Ancien flow : `signup/signin Supabase Auth` → `paiement Stripe` → update reservation.
Problème : personne ne créait de compte, donc personne ne payait.

Nouveau flow validé :
`landing` → `clic « Payer 1€ »` → `Stripe Checkout collecte email/nom/téléphone/adresse` → `webhook Stripe` → `INSERT reservations` (profil créé à partir des `customer_details` Stripe).

## ✅ Fait dans cette session

- [x] Refactor `src/app/api/checkout/route.ts` : suppression auth, ajout `billing_address_collection: "required"`, `phone_number_collection: { enabled: true }`, `customer_creation: "always"`
- [x] Refactor `src/app/api/webhooks/stripe/route.ts` : `upsert` (au lieu d'`update`) avec `customer_details` (email, name, phone, address) + `stripe_customer_id`, `stripe_payment_intent_id`, `amount_cents`, `paid_at`
- [x] Refactor `src/components/reservation/reservation-page.tsx` : bouton « Payer 1€ » direct, plus d'étape compte
- [x] `src/app/reservation/success/page.tsx` : server component qui lit `session_id` URL et récupère l'email via `stripe.checkout.sessions.retrieve` pour personnaliser le message
- [x] `src/app/(reservation-flow)/layout.tsx` : passthrough (plus d'`AuthProvider`)
- [x] Suppression : `src/components/auth/`, `src/components/reservation/auth-step.tsx`, `payment-step.tsx`, `src/app/api/auth/{signin,signup,signout,callback}/`, `src/lib/supabase/server.ts`
- [x] Création migration SQL `supabase/migrations/0001_guest_reservations.sql` — nouvelle table `reservations` (sans `user_id`, avec `email`, `name`, `phone`, `address jsonb`, `stripe_customer_id`, `stripe_checkout_session_id` UNIQUE, `stripe_payment_intent_id`, `amount_cents`, `status`, `paid_at`) + RLS + RPC `get_reservation_count` SECURITY DEFINER + `alter publication supabase_realtime add table`
- [x] Configuration MCP Supabase dans `.mcp.json` (à authentifier côté client : `claude /mcp` → supabase → Authenticate)
- [x] Vérifications : `tsc --noEmit` ✅ 0 erreur, `eslint` ✅ 0 erreur sur fichiers touchés (warnings pré-existants non liés sur `simulator.tsx` et `sticky-cta.tsx`)

## 🚧 À faire (prochaine session avec MCP Supabase)

### 1. Authentifier le MCP Supabase
- [x] MCP supabase connecté (session 2026-04-26)
- [x] Outils `apply_migration`, `execute_sql`, `list_tables` opérationnels

### 2. Appliquer la migration en BDD
- [x] Anciennes tables `reservations` + `profiles` DROP (données de test uniquement, clés Stripe en mode test)
- [x] Migration `0001_guest_reservations.sql` appliquée → table `reservations` (guest checkout) + RLS + RPC `get_reservation_count` + publication `supabase_realtime`
- [x] Trigger orphelin `auth.users → handle_new_user` supprimé (résidu de l'ancien système Auth)
- [x] Vérifié : `get_reservation_count()` → 0, table dans `supabase_realtime`, advisors sécurité clean (sauf `auth_leaked_password_protection` non pertinent — Auth pas utilisé)

### 3. Test end-to-end local
- [x] `stripe listen --forward-to localhost:3000/api/webhooks/stripe` → whsec_ dans `.env.local`
- [x] `NEXT_PUBLIC_APP_URL=http://localhost:3000` (en local) pour redirection success/cancel
- [x] Paiement test carte `4242 4242 4242 4242` → ligne insérée en BDD avec tous les champs (`email`, `name`, `phone`, `address jsonb`, `stripe_customer_id`, `stripe_payment_intent_id`, `amount_cents=100`, `status=paid`, `paid_at`)
- [x] Compteur live sidebar s'incrémente correctement
- [x] Page `/reservation/success` affiche le bon email

### 4. 📧 Envoi d'email automatique après paiement
- [x] Provider choisi : **Resend** (free tier 3000/mois)
- [x] Domaine d'envoi : `hiverobotics.fr` (DKIM/SPF/MX déjà configurés sur Squarespace, vérifié dans Resend)
- [x] Templates React Email : `src/emails/reservation-confirmation.tsx` (client) + `src/emails/internal-lead-notification.tsx` (équipe)
- [x] Helper `src/lib/email.ts` (Resend wrapper, parallèle, gestion erreurs non-bloquante)
- [x] Wiring dans `src/app/api/webhooks/stripe/route.ts` après upsert
- [x] Idempotence : colonne `confirmation_email_sent_at` (migration `0002_confirmation_email_sent_at.sql`) — n'envoie que si NULL, stamp après envoi réussi
- [x] Dépendances : `npm i resend @react-email/components @react-email/render`
- [x] Test E2E : email client reçu sur `leclercqted@gmail.com` ✅, email interne reçu sur `teddy.leclercq@hiverobotics.fr` ✅ (Thomas à confirmer)

### 5. Bug fixes UI inclus dans cette session
- [x] Logo navbar (`src/components/navbar.tsx`) : `href="#"` → `href="/"` (revenait sur `/#` au lieu de la home)
- [x] Header `/reservation` (`src/components/reservation/reservation-page.tsx`) : « Hive Robotics » devient un Link vers `/` ; bouton Retour `/v3` → `/` (route inexistante)
- [x] Page `/reservation/success` : bouton Retour `/v3` → `/`, accents francophones rétablis
- [x] `src/app/api/checkout/route.ts` : cancel_url `/v3?checkout=cancelled` → `/?checkout=cancelled`

### 6. Git workflow & PR
- [x] PR #19 mergée dans `main` (au lieu de `develop` initialement visé — corrigé après coup)
- [x] `develop` synchronisé sur `main` (fast-forward) — les 2 branches sont à `57d1839`
- [x] Branches locales nettoyées (`feature/infra-backend`, `feature/refacto-design`, `feature/refacto-robots-section` supprimées)
- [x] `.env.example` poussé pour documenter les variables d'env requises

---

## 🚀 Mise en prod sur hiverobotics.fr — Session 2026-04-26

### A. DNS (Squarespace)
- [x] Vercel → Settings → Domains → ajouté `hiverobotics.fr` au projet `hive-landing-marketplace`
- [x] Squarespace DNS : `A @ → 46.101.78.38` remplacé par `A @ → 76.76.21.21` (Vercel)
- [x] Squarespace DNS : `CNAME www → sites.framer.app` remplacé par `CNAME www → cname.vercel-dns.com`
- [x] Records Resend (`TXT resend._domainkey`, `MX send`, `TXT send`) et Google Workspace (MX) préservés
- [x] Records des sous-domaines internes (`api`, `dev.api`, `auth`, `operator`, `ros`, etc.) préservés
- [x] DNS propagé (Google + Cloudflare resolvers résolvent vers `76.76.21.21`)
- [x] SSL Vercel auto-généré, HTTPS opérationnel sur `https://hiverobotics.fr`

### B. Variables d'environnement Vercel (Production)
- [x] `RESEND_API_KEY` = `re_WbKND1rz_...` (clé Resend dev, OK pour le mode test Stripe — à remplacer par une clé Live le moment venu si besoin)
- [x] `RESEND_FROM_EMAIL` = `Hive Robotics <noreply@hiverobotics.fr>`
- [x] `INTERNAL_NOTIFICATION_EMAILS` = `teddy.leclercq@hiverobotics.fr,thomas.raynal@hiverobotics.fr`
- [x] `NEXT_PUBLIC_APP_URL` = `https://hiverobotics.fr`
- [x] `STRIPE_WEBHOOK_SECRET` = `whsec_wCFDTtl8...` (secret de l'endpoint Stripe Test pointant sur hiverobotics.fr — différent du secret CLI dans `.env.local`)
- [x] Toutes les autres vars Stripe/Supabase/Mapbox étaient déjà configurées (Apr 3)

### C. Webhook Stripe (Test mode)
- [x] Endpoint `https://hiverobotics.fr/api/webhooks/stripe` configuré (event `checkout.session.completed`)
- [x] Signing secret récupéré depuis Stripe → posé dans `STRIPE_WEBHOOK_SECRET` Vercel

### D. Smoke test E2E en prod
- [x] Paiement test carte `4242` à 19:36 UTC → ligne insérée en BDD avec tous les champs ✅
- [x] `confirmation_email_sent_at` stampé 50 ms après upsert ✅
- [x] Email client reçu sur `leclercqted@gmail.com` ✅
- [x] Email interne reçu sur `teddy.leclercq@hiverobotics.fr` ✅
- [x] Réservations orphelines (sans email) supprimées en BDD

---

## ✅ Bascule Stripe Live — terminée le 2026-04-27

### 1. Stripe Live
- [x] Bascule Test mode → Live mode dans le dashboard
- [x] Produit `Réservation Robot Hive` créé en Live → Price `price_1TQq60PGi7sr7HXGN9MwZ6Un` (Product `prod_UPfQfqy29oD94a`)
- [x] Clés API Live récupérées (`sk_live_…` + `pk_live_…`)
- [x] Webhook Live créé sur `https://hiverobotics.fr/api/webhooks/stripe` (event `checkout.session.completed`) → `whsec_…` Live (différent du Test)

### 2. Vercel — env vars Production mises à jour
- [x] `STRIPE_SECRET_KEY` = `sk_live_…`
- [x] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_…`
- [x] `STRIPE_PRICE_ID` = `price_1TQq60PGi7sr7HXGN9MwZ6Un`
- [x] `STRIPE_WEBHOOK_SECRET` = `whsec_…` Live
- [x] `RESEND_FROM_EMAIL` corrigé (avait été par erreur écrasé par la valeur de `RESEND_API_KEY`)

### 3. Smoke test final
- [x] Paiement réel 1 € avec vraie carte → ligne en BDD avec session `cs_live_…` ✅
- [x] Email client reçu ✅, email interne reçu ✅
- [x] BDD nettoyée des 2 entrées de test
- [x] Refund des 2 € via Stripe (en cours)

### 4. Bug rencontré pendant la bascule (résolu)
- Premier test Live : webhook 200 OK mais `confirmation_email_sent_at: NULL` → emails non envoyés
- Cause identifiée via logs Vercel + Resend : `RESEND_FROM_EMAIL` sur Vercel contenait par erreur la valeur de `RESEND_API_KEY` (`re_WbKND1rz_…`)
- Resend rejetait avec 422 « Invalid `from` field »
- Fix : remettre la bonne valeur `Hive Robotics <teddy.leclercq@hiverobotics.fr>` → redeploy → second test OK

### 4. Branding & SEO
- [x] Favicon : `src/app/icon.png` (depuis `public/logo.png`) — remplace l'ancien triangle Vercel
- [x] OG image temporaire : `src/app/opengraph-image.jpeg` (Chronodrive 1600×893)
- [x] `metadataBase` + `twitter.card: summary_large_image` ajoutés dans `src/app/layout.tsx`
- [ ] **Créer une vraie OG image 1200×630** (Canva / Figma) — marketing card avec logo Hive + tagline « Pré-vente robots autonomes — Réservez 1 € » → remplacer `src/app/opengraph-image.jpeg`
- [ ] Tester le rendu OG sur [opengraph.xyz](https://www.opengraph.xyz/) ou [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) après deploy

### 5. Nettoyage / optionnel
- [ ] Décider du sort du dossier `src/app/(reservation-flow)/` — garder le route group ou déplacer la page sous `src/app/reservation/`
- [ ] Désactiver l'ancien webhook Stripe Test pointant sur `hive-landing-marketplace.vercel.app` si encore actif (pour éviter double-fire)
- [ ] Décider si tu rediriges les anciens domaines `*.vercel.app` vers `hiverobotics.fr` ou si tu les laisses
- [ ] Optionnel : export CSV des leads pour l'équipe commerciale
- [ ] Optionnel : dashboard interne pour suivre les leads
- [ ] Réfléchir à la dédup par email (Option A multi-réservations OK / Option B 1 réservation max par email — voir conversation 2026-04-26)

---

# 2026-04-27 — Améliorations landing + bascule prod

## ✅ Fait dans cette session

### Sovereignty section
- [x] Image Hive Robotics dans la section « Chinois, américain, ou français ? » remplacée par `hive-ville.jpeg` (au lieu de `hive-compact.jpeg`)
- [x] Drapeaux emoji 🇫🇷🇪🇪🇺🇸🇨🇳 remplacés par badges code pays (FR/EE/US/CN) — pill blanche pour FR/EE/US, pill noire pour CN (effet visuel : isole le concurrent chinois)

### Compteur live de réservations
- [x] Hook `src/hooks/use-reservations-count.ts` créé (factorise fetch + realtime subscription Supabase)
- [x] `final-cta.tsx` : suppression des valeurs hardcodées 523/4620/147 et de la progress bar — affiche désormais le vrai nombre de personnes
- [x] `reservation-sidebar.tsx` : skeleton animé pendant le chargement (au lieu de masquer le bloc)
- [x] Socle public de **15 réservations** ajouté dans `src/app/api/reservations/count/route.ts` pour éviter l'effet « personne n'a réservé » au démarrage. Affichage = `15 + count réel`

### Email client — nouveau template
- [x] `src/emails/reservation-confirmation.tsx` complètement refondu avec le design fourni : hero image + overlay « 500 premiers », recap card, timeline 4 étapes, bloc privilèges Founder, closing image
- [x] Prénom dynamique (split de `customer_details.name` sur l'espace)
- [x] Date dynamique (`paidAt` passée depuis le webhook)
- [x] Connecteurs verticaux entre étapes timeline supprimés (demande utilisateur)
- [x] Subject : « Votre place est réservée — Hive Robotics »
- [x] Images servies depuis l'URL publique fixe `https://hiverobotics.fr/images/robot_new_gen/` (Chronodrive en hero, Hive-sortie_camion en closing)

### Bascule prod Stripe Live
Voir section « Bascule Stripe Live » plus haut dans ce fichier (incluant le bug `RESEND_FROM_EMAIL` rencontré et résolu).

## 🟥 Reste à faire

### A. Sync develop → main
- [ ] Merger les 5+ commits de `develop` dans `main` (PR ou fast-forward direct) pour que `hiverobotics.fr` reflète bien les dernières modifs
  - Vérifier dans Vercel quel commit / branche tourne actuellement sur la prod (le redeploy manuel d'aujourd'hui peut avoir basculé sur develop)

### B. Branding email (itération plus tard)
- [ ] L'overlay « Vous êtes l'un des 500 premiers » apparaît **sous** l'image dans Gmail (et non superposée). Acceptable pour l'instant. Pour 100% de fiabilité du superposé, baker l'overlay dans l'image (PNG avec texte déjà dessus)

### C. Cleanup post-bascule
- [ ] Désactiver l'ancien webhook Stripe **Test** qui pointait sur `hive-landing-marketplace.vercel.app` si encore actif (pour éviter qu'il fasse du bruit dans les logs)
- [ ] Cocher **Sensitive** sur `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY` sur Vercel (warnings « Needs Attention »)
- [ ] Supprimer les anciennes feature branches GitHub si pas encore fait

### D. Suite produit
- [ ] OG image 1200×630 (toujours à créer dans Canva/Figma)
- [ ] Décision dédup email : autoriser plusieurs réservations par email ou pas
- [ ] Dashboard interne / export CSV pour l'équipe commerciale

