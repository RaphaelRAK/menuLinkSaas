'use client'

import * as React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { sendPasswordResetEmail } from 'firebase/auth'
import { getFirebaseAuth } from '@/lib/firebase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, CheckCircle } from 'lucide-react'

const schema = z.object({
  email: z.string().email('Adresse email invalide'),
})

type FormValues = z.infer<typeof schema>

export default function ResetPasswordPage() {
  const [sent, setSent] = React.useState(false)
  const [sentTo, setSentTo] = React.useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  const onSubmit = async (values: FormValues) => {
    try {
      const auth = getFirebaseAuth()
      await sendPasswordResetEmail(auth, values.email)
      setSentTo(values.email)
      setSent(true)
    } catch (err: unknown) {
      const code = (err as { code?: string })?.code ?? ''
      // Don't reveal whether the email exists — show generic success to prevent enumeration
      if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
        setSentTo(values.email)
        setSent(true)
        return
      }
      toast.error('Une erreur est survenue. Veuillez réessayer.')
    }
  }

  if (sent) {
    return (
      <>
        <div className="flex flex-col items-center text-center mb-6">
          <div className="size-14 rounded-full bg-[var(--brand-light)] flex items-center justify-center mb-4">
            <CheckCircle className="size-7 text-[var(--brand)]" />
          </div>
          <h1 className="font-heading text-2xl font-bold">Email envoyé</h1>
          <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
            Si un compte existe avec l'adresse <strong className="text-[#141412]">{sentTo}</strong>,
            vous recevrez un lien de réinitialisation dans quelques instants.
          </p>
        </div>

        <p className="text-xs text-muted-foreground text-center mb-6">
          Pensez à vérifier vos spams si vous ne trouvez pas l'email.
        </p>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline"
        >
          <ArrowLeft className="size-4" />
          Retour à la connexion
        </Link>
      </>
    )
  }

  return (
    <>
      <div className="mb-6">
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-[var(--brand)] transition-colors mb-4"
        >
          <ArrowLeft className="size-4" />
          Retour à la connexion
        </Link>
        <h1 className="font-heading text-2xl font-bold">Mot de passe oublié</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Entrez votre adresse email pour recevoir un lien de réinitialisation.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <div className="space-y-1.5">
          <Label htmlFor="email">Adresse email</Label>
          <Input
            id="email"
            type="email"
            placeholder="contact@monrestaurant.fr"
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-destructive text-sm">{errors.email.message}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white border-transparent mt-2"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Envoi en cours…
            </span>
          ) : (
            'Envoyer le lien de réinitialisation'
          )}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Vous vous souvenez de votre mot de passe ?{' '}
        <Link href="/auth/login" className="text-[var(--brand)] hover:underline font-medium">
          Se connecter
        </Link>
      </p>
    </>
  )
}
