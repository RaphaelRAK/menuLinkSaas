'use client'

import * as React from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'
import { collection, query, where, getDocs, limit } from 'firebase/firestore'
import { useAuth } from '@/contexts/AuthContext'
import { getFirebaseAuthError } from '@/lib/auth'
import { getFirestoreDb } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  email:    z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

type FormValues = z.infer<typeof schema>

async function hasPublishedRestaurant(uid: string): Promise<boolean> {
  try {
    const db = getFirestoreDb()
    const q = query(
      collection(db, 'restaurants'),
      where('ownerId', '==', uid),
      where('isPublished', '==', true),
      limit(1)
    )
    const snap = await getDocs(q)
    return !snap.empty
  } catch {
    return false
  }
}

function isSafeRedirect(path: string | null): path is string {
  return (
    typeof path === 'string' &&
    path.startsWith('/') &&
    !path.startsWith('//') &&
    !path.includes('\\')
  )
}

// Composant interne qui utilise useSearchParams — doit être dans un Suspense
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn } = useAuth()
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true)
    try {
      const user = await signIn(values.email, values.password)

      const redirectParam = searchParams.get('redirect')
      if (isSafeRedirect(redirectParam)) {
        router.push(redirectParam)
        return
      }

      const published = await hasPublishedRestaurant(user.uid)
      router.push(published ? '/dashboard' : '/onboarding')
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? ''
      toast.error(getFirebaseAuthError(code))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6 text-center">
        <h1 className="font-heading text-2xl font-bold">Connexion</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Accédez à votre espace restaurateur.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@monrestaurant.fr"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && <p className="text-destructive text-sm">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Mot de passe</Label>
            <Link
              href="/auth/reset-password"
              className="text-xs text-muted-foreground hover:text-[var(--brand)] transition-colors"
            >
              Mot de passe oublié ?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Votre mot de passe"
              autoComplete="current-password"
              className="pr-10"
              {...register('password')}
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? 'Masquer' : 'Afficher'}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.password && <p className="text-destructive text-sm">{errors.password.message}</p>}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white border-transparent mt-2"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Connexion…
            </span>
          ) : (
            'Se connecter'
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Pas encore de compte ?{' '}
        <Link href="/auth/signup" className="text-[var(--brand)] hover:underline font-medium">
          Créer un compte gratuitement
        </Link>
      </p>
    </>
  )
}

export default function LoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginForm />
    </React.Suspense>
  )
}
