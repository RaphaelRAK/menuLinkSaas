# MenuLink — Brief Claude Code
## Interface d'onboarding restaurateur

---

## Stack technique

- **Framework** : Next.js App Router (TypeScript)
- **UI** : shadcn/ui + Tailwind CSS v4
- **Base de données** : Firebase Firestore
- **Auth** : Firebase Auth (email/password)
- **Storage** : Firebase Storage (images)
- **État global** : Zustand
- **Forms** : React Hook Form + Zod
- **Notifications** : sonner (toast)

---

## Ce que tu dois créer

Un flow d'onboarding multi-étapes pour qu'un restaurateur puisse enregistrer son restaurant sur MenuLink. C'est la première chose qu'il voit après la création de son compte.

---

## Architecture des fichiers à créer

```
app/
  onboarding/
    page.tsx                  ← shell de l'onboarding (gère l'étape courante)
    layout.tsx                ← layout minimal sans navbar

components/
  onboarding/
    OnboardingShell.tsx       ← stepper + progress bar + boutons nav
    steps/
      Step1Basics.tsx         ← infos de base
      Step2Location.tsx       ← adresse & contact
      Step3Hours.tsx          ← horaires d'ouverture
      Step4Media.tsx          ← logo + photo de couverture
      Step5Menu.tsx           ← catégories + plats

lib/
  firebase.ts                 ← init Firebase (utilise les env vars)
  restaurant.ts               ← fonctions Firestore CRUD

stores/
  onboardingStore.ts          ← Zustand store pour tout le state du flow

types/
  restaurant.ts               ← types TypeScript complets
```

---

## Types TypeScript (types/restaurant.ts)

```typescript
export type CuisineType =
  | 'french' | 'italian' | 'japanese' | 'chinese' | 'indian'
  | 'mexican' | 'american' | 'mediterranean' | 'thai' | 'other'

export type DayOfWeek =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday'

export interface TimeSlot {
  open: string   // "12:00"
  close: string  // "14:30"
}

export interface DaySchedule {
  isOpen: boolean
  slots: TimeSlot[]  // permet les coupures (midi + soir)
}

export interface MenuItemOption {
  name: string
  price: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  allergens: string[]
  isAvailable: boolean
  options?: MenuItemOption[]  // ex: taille S/M/L
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export interface Restaurant {
  id: string
  ownerId: string
  name: string
  slug: string          // généré depuis le nom, unique
  description: string
  cuisineType: CuisineType
  phone: string
  email: string
  website?: string
  address: {
    street: string
    city: string
    zipCode: string
    country: string
  }
  hours: Record<DayOfWeek, DaySchedule>
  logoUrl?: string
  coverUrl?: string
  menu: MenuCategory[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
```

---

## Zustand Store (stores/onboardingStore.ts)

```typescript
// Le store doit contenir :
// - currentStep: number (1 à 5)
// - formData: Partial<Restaurant>
// - isLoading: boolean
// - actions: setStep, updateFormData, saveToFirestore, reset
```

---

## Étape 1 — Infos de base (Step1Basics.tsx)

**Champs :**
- `name` — Nom du restaurant (text, required)
- `cuisineType` — Type de cuisine (Select shadcn avec les options de CuisineType en français)
- `description` — Description courte (Textarea, max 300 caractères, compteur visible)
- `slug` — Auto-généré depuis le nom en live (slugify), affiché en lecture seule avec preview : `menulink.app/[slug]`

**Validation Zod :**
- name : min 2, max 80
- description : min 20, max 300
- cuisineType : enum

---

## Étape 2 — Localisation & Contact (Step2Location.tsx)

**Champs :**
- `address.street` (text, required)
- `address.city` (text, required)
- `address.zipCode` (text, required)
- `address.country` (text, default "France")
- `phone` (text, required, format E.164 ou local)
- `email` (email, required)
- `website` (url, optionnel)

**UX :** Les champs adresse sont groupés dans une Card shadcn, contact dans une autre.

---

## Étape 3 — Horaires (Step3Hours.tsx)

**UX :**
- Liste des 7 jours (lundi → dimanche)
- Chaque jour a un Switch shadcn "Ouvert / Fermé"
- Si ouvert : afficher 1 créneau par défaut (12:00–14:30)
- Bouton "+ Ajouter une coupure" pour ajouter un 2ème créneau (ex: 19:00–22:30)
- Croix pour supprimer un créneau
- Bouton "Copier vers tous les jours" en haut pour dupliquer le lundi sur les autres jours
- Affichage compact : chaque jour sur une ligne

**Données par défaut :**
```
Lundi–Vendredi : ouvert, 12:00–14:30 et 19:00–22:30
Samedi : ouvert, 12:00–22:30
Dimanche : fermé
```

---

## Étape 4 — Médias (Step4Media.tsx)

**Deux zones d'upload :**

1. **Logo** — carré, 1:1, preview ronde, max 2MB
2. **Photo de couverture** — 16:9, max 5MB

**Comportement :**
- Drag & drop + click to upload
- Preview immédiate dès sélection (FileReader)
- Upload vers Firebase Storage dans `/restaurants/{restaurantId}/logo` et `/cover`
- Loading spinner pendant l'upload
- Bouton "Supprimer" si image déjà uploadée

**Contraintes techniques :**
- Accepter uniquement image/jpeg, image/png, image/webp
- Afficher une erreur si taille dépassée

---

## Étape 5 — Menu (Step5Menu.tsx)

C'est l'étape la plus complexe.

**Structure :**
- Le menu est une liste de `MenuCategory`, chaque catégorie contenant des `MenuItem`
- Catégories par défaut à créer au montage si menu vide : "Entrées", "Plats", "Desserts", "Boissons"

**UX Catégories :**
- Onglets horizontaux (shadcn Tabs) — une tab par catégorie
- Bouton "+ Catégorie" à droite des onglets → Dialog shadcn pour saisir le nom
- Chaque tab a une croix pour supprimer la catégorie (avec confirmation Alert Dialog)
- Drag & drop entre catégories : pas nécessaire dans le MVP

**UX Plats (dans chaque catégorie) :**
- Liste des plats sous forme de cards compactes
- Chaque card affiche : nom, prix, description courte, badge "Indisponible" si isAvailable=false
- Bouton "+ Ajouter un plat" → ouvre un Sheet (panel latéral shadcn) avec le formulaire complet

**Formulaire plat (dans le Sheet) :**
- `name` (text, required)
- `description` (textarea, max 200 chars)
- `price` (number, min 0, step 0.01, affiché avec €)
- `isAvailable` (Switch, default true)
- `allergens` (multi-select ou checkboxes) avec ces options :
  `Gluten, Crustacés, Œufs, Poisson, Arachides, Soja, Lait, Fruits à coque, Céleri, Moutarde, Sésame, Sulfites, Lupin, Mollusques`
- `options` — section optionnelle "Variantes" : liste de paires (nom + prix), bouton "+ Ajouter une variante"

**Pas d'upload image par plat dans le MVP.**

---

## OnboardingShell.tsx — La coque

**Structure visuelle :**
```
┌─────────────────────────────────┐
│  Logo MenuLink         Étape 3/5│
├─────────────────────────────────┤
│  [●]──[●]──[○]──[○]──[○]       │ ← Progress steps cliquables si déjà visités
│  Basique Contact Horaires...    │
├─────────────────────────────────┤
│                                 │
│     <StepComponent />           │
│                                 │
├─────────────────────────────────┤
│  [← Précédent]    [Continuer →] │
└─────────────────────────────────┘
```

**Comportement :**
- Le bouton "Continuer" déclenche la validation Zod de l'étape courante avant d'avancer
- Si erreur de validation : focus sur le premier champ en erreur
- Étape 5 : le bouton final s'appelle "Publier mon restaurant" avec une icône rocket
- Après publication : redirection vers `/dashboard` avec un toast succès

---

## Firebase (lib/firebase.ts + lib/restaurant.ts)

```typescript
// firebase.ts — init standard avec variables d'env
// NEXT_PUBLIC_FIREBASE_API_KEY
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
// NEXT_PUBLIC_FIREBASE_PROJECT_ID
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
// NEXT_PUBLIC_FIREBASE_APP_ID

// restaurant.ts — fonctions à créer :
// createRestaurant(data: Partial<Restaurant>): Promise<string>  → retourne l'ID
// updateRestaurant(id: string, data: Partial<Restaurant>): Promise<void>
// uploadRestaurantImage(restaurantId: string, file: File, type: 'logo' | 'cover'): Promise<string>
// generateSlug(name: string): string  → slugify + vérif unicité Firestore
```

---

## Design System

**Couleurs (variables CSS à définir dans globals.css) :**
```css
--brand: #D85A30;        /* orange-brique — CTA principal */
--brand-light: #FAECE7;  /* fond léger brand */
--success: #1D9E75;      /* vert confirmation */
```

**Composants shadcn à installer :**
```
npx shadcn@latest add button input textarea select switch tabs
                       dialog alert-dialog sheet progress
                       card badge separator form label toast
```

**Conventions UI :**
- Font display : Bricolage Grotesque (Google Fonts)
- Font body : DM Sans (Google Fonts)
- Radius global : 12px (--radius dans tailwind.config)
- Bouton primaire : bg `--brand`, hover bg `#993C1D`
- Steps actifs : cercle `--brand`
- Steps complétés : cercle `--success` avec checkmark

---

## Comportement de sauvegarde

- À chaque étape validée : `updateRestaurant()` en Firestore (pas juste à la fin)
- L'utilisateur peut fermer et revenir — le state est rechargé depuis Firestore
- Le restaurant est créé en Firestore à l'étape 1 avec `isPublished: false`
- `isPublished: true` seulement au clic "Publier" à l'étape 5

---

## Ce que tu NE dois PAS faire

- Pas de SSR pour cet onboarding (tout est client-side avec `'use client'`)
- Pas d'upload vidéo
- Pas de carte Google Maps (juste les champs texte)
- Pas d'import depuis Google Maps ou Trustpilot
- Pas de système de paiement Stripe dans cet écran

---

## Commandes de setup

```bash
npx create-next-app@latest menulink --typescript --tailwind --app
cd menulink
npx shadcn@latest init
npx shadcn@latest add button input textarea select switch tabs dialog alert-dialog sheet progress card badge separator form label
npm install firebase zustand react-hook-form zod sonner slugify
```

---

## Résultat attendu

Un flow d'onboarding complet, fonctionnel, connecté à Firebase, qui permet à un restaurateur de :
1. Saisir les infos de son restaurant
2. Renseigner son adresse et ses contacts
3. Configurer ses horaires jour par jour
4. Uploader son logo et sa photo de couverture
5. Créer son menu avec catégories et plats
6. Publier son restaurant sur MenuLink