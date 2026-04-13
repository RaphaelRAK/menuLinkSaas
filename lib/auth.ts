import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  sendPasswordResetEmail,
  type User,
} from 'firebase/auth'
import { getFirebaseAuth } from './firebase'

// ── Cookie helpers ────────────────────────────────────────────────────────────
// Le cookie `ml_auth` est un signal UX pour le proxy (protection des routes).
// La sécurité réelle est assurée par Firebase Auth + les règles Firestore.

const COOKIE_NAME = 'ml_auth'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 jours

export function setAuthCookie(): void {
  if (typeof document === 'undefined') return
  const secure = location.protocol === 'https:' ? 'Secure;' : ''
  document.cookie = `${COOKIE_NAME}=1; Path=/; Max-Age=${COOKIE_MAX_AGE}; SameSite=Strict; ${secure}`
}

export function clearAuthCookie(): void {
  if (typeof document === 'undefined') return
  document.cookie = `${COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Strict`
}

// ── Firebase Auth helpers ─────────────────────────────────────────────────────

export async function signUpWithEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth()
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  setAuthCookie()
  return user
}

export async function signInWithEmail(email: string, password: string): Promise<User> {
  const auth = getFirebaseAuth()
  const { user } = await signInWithEmailAndPassword(auth, email, password)
  setAuthCookie()
  return user
}

export async function signInWithGoogle(): Promise<User> {
  const auth = getFirebaseAuth()
  const provider = new GoogleAuthProvider()
  const { user } = await signInWithPopup(auth, provider)
  setAuthCookie()
  return user
}

export async function signOutUser(): Promise<void> {
  const auth = getFirebaseAuth()
  await signOut(auth)
  clearAuthCookie()
}

export async function sendPasswordReset(email: string): Promise<void> {
  const auth = getFirebaseAuth()
  await sendPasswordResetEmail(auth, email)
}

// ── Traduction des codes d'erreur Firebase ────────────────────────────────────

export function getFirebaseAuthError(code: string): string {
  const messages: Record<string, string> = {
    'auth/email-already-in-use':    'Un compte existe déjà avec cet email.',
    'auth/invalid-email':           'Adresse email invalide.',
    'auth/weak-password':           'Mot de passe trop faible (8 caractères minimum).',
    'auth/user-not-found':          'Aucun compte trouvé avec cet email.',
    'auth/wrong-password':          'Mot de passe incorrect.',
    'auth/invalid-credential':      'Email ou mot de passe incorrect.',
    'auth/too-many-requests':       'Trop de tentatives. Réessayez dans quelques minutes.',
    'auth/network-request-failed':  'Erreur réseau. Vérifiez votre connexion.',
    'auth/user-disabled':           'Ce compte a été désactivé.',
  }
  return messages[code] ?? 'Une erreur inattendue est survenue.'
}
