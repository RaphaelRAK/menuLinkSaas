'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Connecté en tant que : {user?.email}</p>
      <Button variant="outline" onClick={handleSignOut}>
        Se déconnecter
      </Button>
    </div>
  )
}
