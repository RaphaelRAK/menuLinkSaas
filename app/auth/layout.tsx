import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--brand-light)] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8 font-heading font-bold text-2xl text-[var(--brand)]">
        MenuLink
      </Link>
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-border p-8">
        {children}
      </div>
      <p className="mt-6 text-xs text-muted-foreground text-center">
        Vos données sont protégées et hébergées en Europe.
      </p>
    </div>
  )
}
