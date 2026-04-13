'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  UtensilsCrossed, QrCode, Clock, ImageIcon, BarChart3, HeadphonesIcon,
  Check, ChevronDown, ArrowRight, Menu, X, Smartphone, RefreshCw, MapPin,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const VALUE_PROPS = [
  { value: 'Mise en ligne rapide', label: 'De votre inscription à votre page publiée, en quelques minutes' },
  { value: 'Essai sans risque', label: '30 jours d\'accès complet, sans carte bancaire requise' },
  { value: 'Sans engagement', label: 'Résiliez à tout moment, sans frais ni préavis' },
]

const STEPS = [
  {
    number: '01',
    title: 'Créez votre compte',
    description: 'Inscrivez-vous en quelques minutes. Aucune carte bancaire nécessaire pour démarrer votre essai.',
  },
  {
    number: '02',
    title: 'Configurez votre restaurant',
    description: 'Renseignez vos informations, vos horaires, votre menu complet et ajoutez vos photos.',
  },
  {
    number: '03',
    title: 'Publiez et rendez-vous visible',
    description: 'Votre page est en ligne. Partagez votre lien MenuLink sur vos réseaux et affichez votre QR code en salle.',
  },
]

const FEATURES = [
  { icon: UtensilsCrossed, title: 'Menu en ligne complet', description: 'Catégories, descriptions, allergènes, variantes de prix. Un menu toujours à jour, accessible en un clic.' },
  { icon: QrCode, title: 'QR Code à imprimer', description: 'Générez votre QR code MenuLink et imprimez-le sur vos tables, cartes de visite et supports physiques.' },
  { icon: Clock, title: 'Horaires dynamiques', description: "Gérez vos horaires jour par jour, service du midi et du soir, jours fériés. Vos clients savent toujours quand venir." },
  { icon: ImageIcon, title: 'Photos haute définition', description: "Logo, photo de couverture, galerie de plats. Une présentation visuelle soignée, optimisée pour mobile." },
  { icon: BarChart3, title: 'Statistiques de visites', description: 'Suivez les visites de votre page et les plats les plus consultés pour affiner votre offre.' },
  { icon: HeadphonesIcon, title: 'Support réactif', description: 'Une équipe disponible par chat et email pour vous accompagner à chaque étape de la configuration.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '29',
    description: 'Pour créer votre première présence en ligne sans complexité.',
    features: [
      '1 page restaurant',
      'Menu en ligne (illimité)',
      'Horaires et infos de contact',
      '5 photos maximum',
      'QR code standard',
      'Support par email',
    ],
    cta: 'Commencer l\'essai gratuit',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '59',
    description: 'Pour une présence complète avec statistiques et outils avancés.',
    features: [
      'Tout le plan Starter',
      'Photos illimitées',
      'Statistiques de visites',
      'QR code personnalisé',
      'Badge MenuLink vérifié',
      'Support prioritaire',
    ],
    cta: 'Commencer l\'essai gratuit',
    highlighted: true,
    badge: 'Recommandé',
  },
  {
    name: 'Business',
    price: '99',
    description: 'Pour les groupes et les établissements multiples.',
    features: [
      'Tout le plan Pro',
      "Jusqu'à 5 établissements",
      'Intégration systèmes de caisse',
      'Campagnes email clients',
      'Analytics avancés',
      'Gestionnaire de compte dédié',
    ],
    cta: 'Commencer l\'essai gratuit',
    highlighted: false,
  },
]

const BENEFITS = [
  {
    icon: RefreshCw,
    title: 'Votre menu mis à jour en temps réel',
    description: 'Un prix qui change, un plat du jour à ajouter : modifiez depuis votre téléphone et la mise à jour est visible immédiatement sur votre page. Pas d\'agence, pas d\'attente.',
  },
  {
    icon: Smartphone,
    title: 'Une carte lisible sur tous les téléphones',
    description: 'Votre menu s\'affiche clairement sur mobile, sans téléchargement d\'application. Vos clients trouvent ce qu\'ils cherchent en quelques secondes.',
  },
  {
    icon: MapPin,
    title: 'Toutes vos infos centralisées en un lien',
    description: 'Menu, horaires, adresse, photos, accès Google — tout sur une seule page. Un lien à partager partout : Instagram, WhatsApp, Google My Business, cartes de visite.',
  },
]

const FAQ_ITEMS = [
  {
    question: "L'essai de 30 jours est-il vraiment gratuit ?",
    answer: "Oui, totalement. Vous accédez à toutes les fonctionnalités du plan Pro pendant 30 jours sans saisir votre carte bancaire. À la fin de l'essai, vous choisissez votre plan ou vous résiliez — sans engagement.",
  },
  {
    question: "Puis-je changer de plan ou résilier à tout moment ?",
    answer: "Absolument. Vous pouvez upgrader, downgrader ou résilier votre abonnement à tout moment depuis votre espace. La résiliation prend effet à la fin de la période en cours. Aucun frais de sortie.",
  },
  {
    question: "Comment mes clients accèdent-ils à ma page MenuLink ?",
    answer: "Votre page est accessible via un lien unique (menulink.app/votre-restaurant) et via le QR code que vous pouvez imprimer sur vos supports. Vos clients n'ont besoin d'aucune application.",
  },
  {
    question: "Mes données sont-elles sécurisées ?",
    answer: "Vos données sont hébergées en Europe et chiffrées en transit et au repos. Nous ne revendons jamais vos données ni celles de vos clients.",
  },
  {
    question: "Proposez-vous un accompagnement à la prise en main ?",
    answer: "Oui. Notre équipe est disponible par chat et email pour vous aider à configurer votre page. Les clients Pro et Business bénéficient d'une session d'onboarding individuelle.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border-b border-[#e8e4dc]">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-medium text-[#141412] group-hover:text-[var(--brand)] transition-colors">
          {question}
        </span>
        <ChevronDown
          className={[
            'size-5 text-muted-foreground shrink-0 transition-transform duration-200',
            open ? 'rotate-180' : '',
          ].join(' ')}
        />
      </button>
      {open && (
        <p className="pb-5 text-muted-foreground leading-relaxed text-sm pr-8">{answer}</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#141412]">

      {/* ── Nav ─────────────────────────────────────────────────────────── */}
      <header
        className={[
          'fixed top-0 inset-x-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className={[
            'font-heading font-black text-xl tracking-tight transition-colors',
            scrolled ? 'text-[var(--brand)]' : 'text-white',
          ].join(' ')}>
            MenuLink
          </span>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {[
              { label: 'Fonctionnalités', href: '/fonctionnalites' },
              { label: 'Comment ça marche', href: '/comment-ca-marche' },
              { label: 'Tarifs', href: '/tarifs' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={[
                  'text-sm font-medium transition-colors hover:text-[var(--brand)]',
                  scrolled ? 'text-[#141412]' : 'text-white/90',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/auth/login"
              className={[
                'text-sm font-medium transition-colors hover:text-[var(--brand)]',
                scrolled ? 'text-[#141412]' : 'text-white/90',
              ].join(' ')}
            >
              Connexion
            </Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white px-4 py-2 rounded-full transition-colors"
            >
              Essayer gratuitement
            </Link>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className={['md:hidden', scrolled ? 'text-[#141412]' : 'text-white'].join(' ')}
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {/* Mobile nav drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-6 py-4 flex flex-col gap-4">
            <Link href="/fonctionnalites" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Fonctionnalités</Link>
            <Link href="/comment-ca-marche" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Comment ça marche</Link>
            <Link href="/tarifs" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Tarifs</Link>
            <Link href="/auth/login" className="text-sm font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Connexion</Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold bg-[var(--brand)] text-white text-center px-4 py-3 rounded-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              Essayer gratuitement
            </Link>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section className="relative h-screen min-h-[640px] flex items-center">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1800&q=85"
          alt="Restaurant gastronomique"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-8">
              <span className="size-2 rounded-full bg-[var(--success)] animate-pulse" />
              Accès anticipé ouvert — essai gratuit 30 jours
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              La vitrine digitale
              <span className="block text-[var(--brand)]">de votre restaurant</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Menu en ligne, QR code, horaires, photos — tout ce qu'il faut pour que vos clients
              trouvent l'essentiel en quelques secondes, depuis leur téléphone.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Créer ma page gratuitement
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/comment-ca-marche"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium px-7 py-3.5 rounded-full transition-colors"
              >
                Voir comment ça marche
              </Link>
            </div>

            <p className="mt-5 text-sm text-white/50">
              30 jours d'essai · Sans carte bancaire · Résiliation en 1 clic
            </p>
          </div>
        </div>
      </section>

      {/* ── Value props bar ─────────────────────────────────────────────── */}
      <section className="bg-[var(--brand)] text-white py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {VALUE_PROPS.map(({ value, label }) => (
              <div key={value}>
                <div className="font-heading text-xl font-black mb-1">{value}</div>
                <div className="text-white/75 text-sm font-medium leading-snug">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">En 3 étapes</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">
              De zéro à en ligne
              <span className="block text-[var(--brand)]">en quelques minutes</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-[#e8e4dc] z-0" />
            {STEPS.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="size-20 rounded-2xl bg-[var(--brand-light)] border-2 border-[var(--brand)]/20 flex items-center justify-center mb-6">
                  <span className="font-heading text-3xl font-black text-[var(--brand)]">{step.number}</span>
                </div>
                <h3 className="font-heading text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#f5f2ec]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">Fonctionnalités</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">
              Tout pour briller en ligne
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-7 border border-[#e8e4dc] hover:border-[var(--brand)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group"
              >
                <div className="size-12 rounded-xl bg-[var(--brand-light)] flex items-center justify-center mb-5 group-hover:bg-[var(--brand)] transition-colors">
                  <Icon className="size-5 text-[var(--brand)] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/fonctionnalites"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline"
            >
              Voir toutes les fonctionnalités
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Visual break ────────────────────────────────────────────────── */}
      <section className="relative h-72 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80"
          alt="Salle de restaurant"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#141412]/70 flex items-center justify-center">
          <blockquote className="text-center max-w-2xl px-6">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white italic leading-snug">
              "Un restaurant invisible en ligne, c'est un restaurant qui laisse ses couverts vides."
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── Pricing ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">Tarifs</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">
              Un abonnement simple,
              <span className="block text-[var(--brand)]">sans surprise</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md mx-auto">
              30 jours d'essai gratuit sur tous les plans. Sans carte bancaire.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={[
                  'relative rounded-2xl p-8 flex flex-col border transition-all duration-200',
                  plan.highlighted
                    ? 'border-[var(--brand)] shadow-xl shadow-[var(--brand)]/10 bg-white scale-[1.02]'
                    : 'border-[#e8e4dc] bg-[#faf9f6] hover:border-[var(--brand)]/50',
                ].join(' ')}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[var(--brand)] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-heading text-xl font-bold mb-1">{plan.name}</h3>
                  <p className="text-muted-foreground text-sm mb-5">{plan.description}</p>
                  <div className="flex items-end gap-1">
                    <span className="font-heading text-5xl font-black text-[#141412]">{plan.price}€</span>
                    <span className="text-muted-foreground text-sm mb-2">/mois</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="size-4 text-[var(--success)] mt-0.5 shrink-0" />
                      <span className="text-[#141412]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/auth/signup"
                  className={[
                    'w-full text-center py-3 rounded-xl font-semibold text-sm transition-all',
                    plan.highlighted
                      ? 'bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white'
                      : 'bg-[#141412] hover:bg-[#333] text-white',
                  ].join(' ')}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/tarifs"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--brand)] hover:underline"
            >
              Comparer les plans en détail
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Benefits ────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#141412] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">Pour votre établissement</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-white">
              Ce que MenuLink
              <span className="block text-[var(--brand)]">vous apporte concrètement</span>
            </h2>
            <p className="text-white/60 mt-4 max-w-md mx-auto text-sm leading-relaxed">
              Pas de complexité technique, pas d'agence à gérer. Vous prenez en main votre présence en ligne directement.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {BENEFITS.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="size-12 rounded-xl bg-[var(--brand)]/15 flex items-center justify-center mb-5">
                  <Icon className="size-5 text-[var(--brand)]" />
                </div>
                <h3 className="font-heading font-bold text-lg mb-3 text-white">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#faf9f6]">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">FAQ</p>
            <h2 className="font-heading text-4xl font-black tracking-tight">Questions fréquentes</h2>
          </div>
          <div className="divide-y divide-[#e8e4dc]">
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section className="py-28 px-6 bg-[var(--brand)] text-white text-center relative overflow-hidden">
        <div className="absolute -top-20 -left-20 size-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -right-16 size-96 rounded-full bg-white/5" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-5 leading-tight">
            Votre carte en ligne,
            <br />dès aujourd'hui.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Créez votre page restaurant en quelques minutes. Sans agence, sans complexité technique, sans carte bancaire pour démarrer.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-[var(--brand)] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] text-base"
          >
            Créer ma page gratuitement
            <ArrowRight className="size-5" />
          </Link>
          <p className="mt-4 text-sm text-white/60">30 jours d'essai · Sans engagement · Résiliation en 1 clic</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0e0c] text-white/60 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <span className="font-heading font-black text-xl text-[var(--brand)] block mb-3">MenuLink</span>
              <p className="text-sm leading-relaxed">
                La plateforme qui simplifie la présence en ligne des restaurateurs.
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
            <p>© {new Date().getFullYear()} MenuLink. Tous droits réservés.</p>
            <p>Hébergé en Europe · Données chiffrées · RGPD</p>
          </div>
        </div>
      </footer>

    </div>
  )
}
