import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="min-h-screen grid lg:grid-cols-2">
        {/* Left: brand / slogan (hidden on mobile like shadcn example) */}
        <div className="hidden lg:flex relative overflow-hidden bg-[#141412] text-white">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background:
                'radial-gradient(1200px 420px at 20% 20%, rgba(216,90,48,0.25), transparent 60%), radial-gradient(900px 520px at 75% 70%, rgba(50,205,50,0.12), transparent 55%)',
            }}
            aria-hidden
          />
          <div className="relative z-10 flex flex-col justify-between w-full p-14">
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="font-heading font-black text-5xl tracking-tight text-[var(--brand)]">Navo</span>
              </Link>
              <p className="mt-6 text-white/80 text-xl max-w-md leading-relaxed">
                Créez votre page restaurant en quelques minutes. Mettez à jour votre carte en temps réel. Obtenez plus d&apos;avis.
              </p>
            </div>
            <div className="text-white/60 text-sm max-w-md">
              <p className="font-semibold text-white/80">Simple, rapide, pensé pour les restaurateurs.</p>
              <p className="mt-2">
                Vos données sont protégées et hébergées en Europe.
              </p>
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="flex flex-col justify-center px-4 py-10 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <Link href="/" className="font-heading font-black text-3xl text-[var(--brand)]">
                Navo
              </Link>
              <p className="mt-2 text-sm text-muted-foreground">
                Connectez-vous pour gérer votre page et vos QR codes.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-border p-8">
              {children}
            </div>
            <p className="mt-6 text-xs text-muted-foreground text-center lg:hidden">
              Vos données sont protégées et hébergées en Europe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
