# Parcours utilisateur — MenuLink Back-office

## Vue d'ensemble

```
/ (Landing)
    ↓
/auth/signup  ou  /auth/login
    ↓
/onboarding  (première connexion, restaurant non créé)
    ↓
/dashboard   (restaurant publié)
```

---

## 1. Landing page — `/`

**Objectif :** convaincre le restaurateur d'ouvrir un compte.

**Contenu :**
- Headline + sous-titre (proposition de valeur)
- Visuel / screenshot de l'interface
- CTA principal → "Créer mon restaurant gratuitement" → `/auth/signup`
- Lien secondaire → "J'ai déjà un compte" → `/auth/login`

**Règle de redirection :**
- Si déjà connecté + restaurant existant → `/dashboard`
- Si déjà connecté + pas de restaurant → `/onboarding`

---

## 2. Authentification — `/auth/signup` et `/auth/login`

**Signup :**
- Champs : email, mot de passe, confirmation
- Création du compte Firebase Auth
- Après succès → `/onboarding`

**Login :**
- Champs : email, mot de passe
- Lien "Mot de passe oublié" → `/auth/reset-password`
- Après succès :
  - Restaurant non publié (onboarding incomplet) → `/onboarding`
  - Restaurant publié → `/dashboard`

**Design :** layout centré, logo MenuLink en haut, pas de navbar.

---

## 3. Onboarding — `/onboarding`

**Accès :** uniquement si connecté + restaurant non encore publié.
**Redirection si non connecté :** → `/auth/login`
**Redirection si restaurant déjà publié :** → `/dashboard`

Flow en 5 étapes (déjà implémenté) :
1. Infos de base (nom, cuisine, description)
2. Localisation & contact
3. Horaires
4. Médias (logo + couverture)
5. Menu (catégories + plats)

---

## 4. Dashboard — `/dashboard`

**Accès :** uniquement si connecté + restaurant publié.
**Redirection si non connecté :** → `/auth/login`
**Redirection si onboarding incomplet :** → `/onboarding`

Fonctionnalités (à venir) :
- Vue d'ensemble du restaurant
- Gestion du menu
- Statistiques
- Paramètres

---

## Logique de redirection centralisée

Un middleware Next.js (`middleware.ts`) gère tout :

```
requête entrante
    │
    ├─ route publique (/,  /auth/*) → laisser passer
    │
    ├─ pas de session Firebase → redirect /auth/login
    │
    └─ session active
           ├─ restaurant publié   → /dashboard  (sauf si déjà sur /dashboard)
           └─ pas de restaurant   → /onboarding (sauf si déjà sur /onboarding)
```

---

## Fichiers à créer

```
app/
  page.tsx                      ← Landing page
  auth/
    layout.tsx                  ← Layout auth (centré, sans navbar)
    signup/page.tsx             ← Formulaire inscription
    login/page.tsx              ← Formulaire connexion
    reset-password/page.tsx     ← Réinitialisation mot de passe
  onboarding/                   ← Déjà créé ✓
  dashboard/
    page.tsx                    ← À créer

middleware.ts                   ← Redirections automatiques
lib/
  auth.ts                       ← Helpers Firebase Auth (signup, login, logout)
```

---

## Ce qui change dans l'onboarding

- `ownerId` sera le vrai `auth.currentUser.uid` (plus `'anonymous'`)
- Les règles Firestore peuvent être sécurisées :
  `allow write: if request.auth.uid == resource.data.ownerId`
