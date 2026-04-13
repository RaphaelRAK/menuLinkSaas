'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  UtensilsCrossed, QrCode, Clock, ImageIcon, BarChart3, HeadphonesIcon,
  Check, ChevronDown, ArrowRight, Star, Menu, X,
} from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '+2 400', label: 'restaurants référencés' },
  { value: '4.9/5', label: 'satisfaction client' },
  { value: '30 jours', label: "d'essai offerts" },
]

const STEPS = [
  {
    number: '01',
    title: 'Créez votre compte',
    description: 'Inscrivez-vous en moins de 2 minutes. Aucune carte bancaire nécessaire pour démarrer votre essai.',
  },
  {
    number: '02',
    title: 'Configurez votre restaurant',
    description: 'Renseignez vos informations, horaires, menu complet et uploadez vos plus belles photos.',
  },
  {
    number: '03',
    title: 'Publiez et attirez des clients',
    description: 'Votre page est en ligne. Partagez votre lien MenuLink sur vos réseaux, en QR code sur vos tables.',
  },
]

const FEATURES = [
  { icon: UtensilsCrossed, title: 'Menu en ligne complet', description: 'Catégories, descriptions, allergènes, variantes de prix. Un menu toujours à jour, accessible en un clic.' },
  { icon: QrCode, title: 'QR Code personnalisé', description: 'Générez votre QR code MenuLink à imprimer sur vos tables, cartes de visite et supports physiques.' },
  { icon: Clock, title: 'Horaires dynamiques', description: 'Gérez vos heures jour par jour, service du midi et du soir, jours fériés. Vos clients savent toujours quand venir.' },
  { icon: ImageIcon, title: 'Photos haute définition', description: 'Logo, photo de couverture, galerie plats. Une présentation visuelle qui donne faim avant même d\'arriver.' },
  { icon: BarChart3, title: 'Statistiques & insights', description: 'Suivez les visites de votre page, les plats les plus consultés et optimisez votre offre.' },
  { icon: HeadphonesIcon, title: 'Support dédié', description: 'Une équipe disponible 7j/7 par chat et email. Nous sommes là pour vous accompagner à chaque étape.' },
]

const PLANS = [
  {
    name: 'Starter',
    price: '29',
    description: 'Pour démarrer et tester le potentiel de votre présence en ligne.',
    features: [
      '1 page restaurant',
      'Menu en ligne (illimité)',
      'Horaires et infos de contact',
      '5 photos maximum',
      'QR code standard',
      'Support par email',
    ],
    cta: "Commencer l'essai",
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '59',
    description: 'Le plan préféré des restaurateurs actifs qui veulent se démarquer.',
    features: [
      'Tout le plan Starter',
      'Photos illimitées',
      'Statistiques de visites',
      'QR code personnalisé',
      'Badge "Certifié MenuLink"',
      'Support prioritaire 7j/7',
    ],
    cta: "Commencer l'essai",
    highlighted: true,
    badge: 'Populaire',
  },
  {
    name: 'Business',
    price: '99',
    description: 'Pour les établissements multiples et les groupes de restauration.',
    features: [
      'Tout le plan Pro',
      "Jusqu'à 5 établissements",
      'Intégration systèmes de caisse',
      'Campagnes email clients',
      'Analytics avancés',
      'Gestionnaire de compte dédié',
    ],
    cta: "Commencer l'essai",
    highlighted: false,
  },
]

const TESTIMONIALS = [
  {
    quote: "MenuLink a transformé notre relation avec les clients. Notre page est devenue notre meilleure vitrine — mieux qu'Instagram pour convertir de nouveaux couverts.",
    name: 'Sophie Marchand',
    role: 'Propriétaire, Le Zinc Parisien',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    stars: 5,
  },
  {
    quote: "En moins d'une semaine on avait notre menu en ligne, notre QR code sur les tables et nos premières réservations via le lien MenuLink. ROI immédiat.",
    name: 'Karim Bensalem',
    role: 'Chef & fondateur, Brasserie Atlas',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
    stars: 5,
  },
  {
    quote: "Le support est exceptionnel. À chaque question, une réponse en moins d'une heure. Je recommande MenuLink à tous les restaurateurs que je connais.",
    name: 'Amélie Fontaine',
    role: 'Gérante, Les Saveurs du Marché',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
    stars: 5,
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
    answer: "Vos données sont hébergées en Europe (serveurs Firebase/Google Cloud EU) et chiffrées en transit et au repos. Nous ne revendons jamais vos données ni celles de vos clients.",
  },
  {
    question: "Proposez-vous un accompagnement à la prise en main ?",
    answer: "Oui. En plus de notre documentation complète, nos clients Pro et Business bénéficient d'une session d'onboarding individuelle avec un membre de notre équipe pour configurer leur page optimalement.",
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (all inline, self-contained)
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
          scrolled
            ? 'bg-white/90 backdrop-blur-md shadow-sm'
            : 'bg-transparent',
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
            {['Fonctionnalités', 'Tarifs'].map((label) => (
              <a
                key={label}
                href={`#${label.toLowerCase()}`}
                className={[
                  'text-sm font-medium transition-colors hover:text-[var(--brand)]',
                  scrolled ? 'text-[#141412]' : 'text-white/90',
                ].join(' ')}
              >
                {label}
              </a>
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
              Essayer 30 jours gratuits
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
            <a href="#fonctionnalités" className="text-sm font-medium py-2">Fonctionnalités</a>
            <a href="#tarifs" className="text-sm font-medium py-2">Tarifs</a>
            <Link href="/auth/login" className="text-sm font-medium py-2">Connexion</Link>
            <Link
              href="/auth/signup"
              className="text-sm font-semibold bg-[var(--brand)] text-white text-center px-4 py-3 rounded-xl"
            >
              Essayer 30 jours gratuits
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
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/90 mb-8">
              <span className="size-2 rounded-full bg-[var(--success)]" />
              +2 400 restaurants nous font confiance
            </div>

            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
              La vitrine digitale
              <span className="block text-[var(--brand)]">de votre restaurant</span>
            </h1>

            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-10 max-w-xl">
              Menu en ligne, QR code, horaires, photos. Tout ce qu'il faut pour convertir
              un internaute en client. Professionnel, rapide, rentable.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Démarrer mon essai gratuit
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-medium px-7 py-3.5 rounded-full transition-colors"
              >
                J'ai déjà un compte
              </Link>
            </div>

            <p className="mt-5 text-sm text-white/50">
              30 jours d'essai · Sans carte bancaire · Résiliation en 1 clic
            </p>
          </div>
        </div>
      </section>

      {/* ── Stats bar ───────────────────────────────────────────────────── */}
      <section className="bg-[var(--brand)] text-white py-10">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {STATS.map(({ value, label }) => (
              <div key={label}>
                <div className="font-heading text-4xl font-black mb-1">{value}</div>
                <div className="text-white/75 text-sm font-medium">{label}</div>
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
              <span className="block text-[var(--brand)]">en moins d'une heure</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (desktop only) */}
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
      <section id="fonctionnalités" className="py-24 px-6 bg-[#f5f2ec]">
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
      <section id="tarifs" className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">Tarifs</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight">
              Un investissement,
              <span className="block text-[var(--brand)]">des clients en retour</span>
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
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-[#141412] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-3">Ils nous font confiance</p>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight text-white">
              Ce que disent nos restaurateurs
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-white/20 transition-all duration-200"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="size-4 fill-[var(--brand)] text-[var(--brand)]" />
                  ))}
                </div>
                <blockquote className="text-white/85 text-sm leading-relaxed mb-6 italic">
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full overflow-hidden shrink-0 border-2 border-white/20">
                    <Image
                      src={t.photo}
                      alt={t.name}
                      width={40}
                      height={40}
                      className="size-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-white">{t.name}</div>
                    <div className="text-white/50 text-xs">{t.role}</div>
                  </div>
                </div>
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
        {/* Decorative background circles */}
        <div className="absolute -top-20 -left-20 size-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-24 -right-16 size-96 rounded-full bg-white/5" />

        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 className="font-heading text-4xl md:text-5xl font-black mb-5 leading-tight">
            Votre restaurant mérite
            <br />d'être trouvé.
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-lg mx-auto">
            Rejoignez +2 400 restaurateurs qui ont choisi MenuLink pour développer leur clientèle en ligne.
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-[var(--brand)] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98] text-base"
          >
            Démarrer mon essai gratuit de 30 jours
            <ArrowRight className="size-5" />
          </Link>
          <p className="mt-4 text-sm text-white/60">Sans engagement · Résiliation en 1 clic</p>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#0f0e0c] text-white/60 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 mb-10">
            <div className="max-w-xs">
              <span className="font-heading font-black text-xl text-[var(--brand)] block mb-3">MenuLink</span>
              <p className="text-sm leading-relaxed">
                La plateforme qui connecte les restaurateurs à leurs futurs clients. Simple, puissant, rentable.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold text-white mb-3">Produit</p>
                <ul className="space-y-2">
                  <li><a href="#fonctionnalités" className="hover:text-white transition-colors">Fonctionnalités</a></li>
                  <li><a href="#tarifs" className="hover:text-white transition-colors">Tarifs</a></li>
                  <li><Link href="/auth/signup" className="hover:text-white transition-colors">Essai gratuit</Link></li>
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
