'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, ArrowRight } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Fonctionnalités', href: '/fonctionnalites' },
  { label: 'Comment ça marche', href: '/comment-ca-marche' },
  { label: 'Tarifs', href: '/tarifs' },
]

function MarketingNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#ede9e2]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-heading font-black text-xl text-[var(--brand)]">
          Navo
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={[
                'text-sm font-medium transition-colors hover:text-[var(--brand)]',
                pathname === href ? 'text-[var(--brand)]' : 'text-[#4a4a3e]',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/auth/login" className="text-sm font-medium text-[#4a4a3e] hover:text-[var(--brand)] transition-colors">
            Connexion
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-1.5 text-sm font-semibold bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white px-4 py-2 rounded-full transition-colors"
          >
            Essayer gratuitement
            <ArrowRight className="size-3.5" />
          </Link>
        </div>

        <button className="md:hidden text-[#141412]" onClick={() => setOpen(v => !v)}>
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-[#ede9e2] px-6 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={href} href={href} className="text-sm font-medium py-2 text-[#141412]" onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <Link href="/auth/login" className="text-sm font-medium py-2 text-[#4a4a3e]" onClick={() => setOpen(false)}>Connexion</Link>
          <Link href="/auth/signup" className="text-sm font-semibold bg-[var(--brand)] text-white text-center px-4 py-3 rounded-xl mt-1" onClick={() => setOpen(false)}>
            Essayer gratuitement
          </Link>
        </div>
      )}
    </header>
  )
}

function MarketingFooter() {
  return (
    <footer className="bg-[#0f0e0c] text-white/60 py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
          <div className="max-w-xs">
            <span className="font-heading font-black text-xl text-[var(--brand)] block mb-3">Navo</span>
            <p className="text-sm leading-relaxed">
              La plateforme qui connecte les restaurateurs à leurs futurs clients.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold text-white mb-3">Produit</p>
              <ul className="space-y-2">
                <li><Link href="/fonctionnalites" className="hover:text-white transition-colors">Fonctionnalités</Link></li>
                <li><Link href="/comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</Link></li>
                <li><Link href="/tarifs" className="hover:text-white transition-colors">Tarifs</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Compte</p>
              <ul className="space-y-2">
                <li><Link href="/auth/login" className="hover:text-white transition-colors">Connexion</Link></li>
                <li><Link href="/auth/signup" className="hover:text-white transition-colors">Créer un compte</Link></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-white mb-3">Légal</p>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">CGU</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Confidentialité</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mentions légales</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <p>© {new Date().getFullYear()} Navo. Tous droits réservés.</p>
          <p>Hébergé en Europe · Données chiffrées · RGPD</p>
        </div>
      </div>
    </footer>
  )
}

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6]">
      <MarketingNav />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  )
}
