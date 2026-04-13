import Image from 'next/image'
import Link from 'next/link'
import {
  UtensilsCrossed, QrCode, Clock, ImageIcon, BarChart3,
  HeadphonesIcon, Check, ArrowRight, Smartphone, Globe, Zap,
} from 'lucide-react'

const FEATURES_DETAILED = [
  {
    icon: UtensilsCrossed,
    title: 'Menu en ligne complet',
    subtitle: 'Votre carte, toujours à jour',
    description: "Créez un menu structuré par catégories (Entrées, Plats, Desserts…), avec description, prix, photos et allergènes pour chaque plat. Ajoutez des variantes (taille S/M/L, suppléments). Vos clients voient exactement ce que vous proposez, à l'instant T.",
    items: [
      'Catégories et sous-catégories illimitées',
      'Prix, descriptions et photos par plat',
      'Gestion des allergènes (14 allergènes européens)',
      'Variantes et options (ex: sauce, cuisson)',
      'Plat du jour mis en avant',
    ],
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Menu restaurant sur mobile',
    reverse: false,
  },
  {
    icon: QrCode,
    title: 'QR code personnalisé',
    subtitle: 'De la table à votre page en 2 secondes',
    description: "Générez votre QR code MenuLink en un clic. Téléchargez un PDF prêt à imprimer avec 4 QR codes par page, dimensionnés pour vos tables. Plastifiez-les et posez-les : vos clients accèdent à votre menu instantanément, sans télécharger d'application.",
    items: [
      'PDF prêt à imprimer, 4 QR codes par page',
      'Compatible tous smartphones (iOS et Android)',
      'Aucune application à télécharger pour vos clients',
      'QR code également utilisable en vitrine ou sur vos cartes de visite',
    ],
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'QR code sur table de restaurant',
    reverse: true,
  },
  {
    icon: Clock,
    title: 'Horaires dynamiques',
    subtitle: 'Vos clients savent toujours quand venir',
    description: "Configurez vos horaires jour par jour, avec les services du midi et du soir. Un badge \"Ouvert\" ou \"Fermé\" s'affiche automatiquement en temps réel sur votre page. Modifiez vos horaires depuis votre téléphone en 30 secondes.",
    items: [
      'Horaires par jour de la semaine',
      'Services du midi et du soir (coupures)',
      'Badge ouvert/fermé automatique en temps réel',
      'Gestion des jours fériés et fermetures exceptionnelles',
    ],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Restaurant le soir',
    reverse: false,
  },
  {
    icon: ImageIcon,
    title: 'Photos haute définition',
    subtitle: 'Une présentation visuelle qui donne faim',
    description: 'Uploadez votre logo, votre photo de couverture et des photos pour chaque plat. Vos images sont optimisées automatiquement pour le mobile. Une page visuellement soignée augmente le temps passé et la conversion.',
    items: [
      'Logo rond sur la page restaurant',
      "Photo de couverture 16:9 pour l'impact visuel",
      'Photos par plat (format libre)',
      'Optimisation automatique pour mobile',
      'Chargement rapide même en 4G',
    ],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Plats en photo',
    reverse: true,
  },
  {
    icon: BarChart3,
    title: 'Statistiques & insights',
    subtitle: 'Comprenez votre audience',
    description: "Suivez les visites de votre page, les plats les plus consultés et les heures de pointe. Ces données vous permettent d'optimiser votre offre, vos horaires et votre menu en fonction des comportements réels de vos clients.",
    items: [
      'Nombre de visites quotidiennes et mensuelles',
      'Plats et catégories les plus consultés',
      'Heures de consultation (pic de demande)',
      'Taux de clics sur Google Reviews',
      'Disponible dès le plan Pro',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Statistiques sur écran',
    reverse: false,
  },
  {
    icon: HeadphonesIcon,
    title: 'Support dédié',
    subtitle: 'Jamais seul face à un problème',
    description: 'Notre équipe est disponible 7j/7 par chat et email. Nous vous accompagnons lors de la prise en main, répondons à vos questions en moins d\'une heure et résolvons tout blocage rapidement. Les clients Business bénéficient d\'un gestionnaire de compte dédié.',
    items: [
      'Chat en ligne 7j/7',
      'Email avec réponse < 1h',
      'Session d\'onboarding individuelle (Pro+)',
      'Documentation complète et tutoriels vidéo',
      'Gestionnaire dédié (Business)',
    ],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Équipe support',
    reverse: true,
  },
]

const EXTRAS = [
  { icon: Smartphone, title: 'Optimisé mobile', description: 'Chaque page MenuLink est pensée pour mobile first. Rapide, lisible, sans application.' },
  { icon: Globe, title: 'Lien partageable', description: 'menulink.app/votre-restaurant — à coller sur Instagram, Google My Business, WhatsApp.' },
  { icon: Zap, title: 'Mise à jour instantanée', description: 'Un changement depuis votre back-office est visible en temps réel sur la page client.' },
]

export default function FonctionnalitesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#faf9f6] py-24 px-6 border-b border-[#ede9e2]">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-4">Fonctionnalités</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black leading-tight mb-6">
            Tout ce qu'il faut pour
            <span className="text-[var(--brand)] block">briller en ligne</span>
          </h1>
          <p className="text-[#5a5a4e] text-xl max-w-xl mx-auto leading-relaxed">
            MenuLink réunit tout ce dont un restaurant a besoin pour sa présence digitale. Simple à configurer, puissant à l'usage.
          </p>
        </div>
      </section>

      {/* Feature sections */}
      {FEATURES_DETAILED.map((feature, i) => {
        const Icon = feature.icon
        return (
          <section
            key={feature.title}
            className={['py-20 px-6', i % 2 === 0 ? 'bg-white' : 'bg-[#f5f2ec]'].join(' ')}
          >
            <div className="max-w-5xl mx-auto">
              <div className={['flex flex-col md:flex-row items-center gap-12 md:gap-16', feature.reverse ? 'md:flex-row-reverse' : ''].join(' ')}>
                {/* Text */}
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 bg-[var(--brand-light)] rounded-full px-3 py-1.5 mb-5">
                    <Icon className="size-4 text-[var(--brand)]" />
                    <span className="text-xs font-semibold text-[var(--brand)]">{feature.subtitle}</span>
                  </div>
                  <h2 className="font-heading text-4xl font-black mb-4">{feature.title}</h2>
                  <p className="text-[#5a5a4e] leading-relaxed mb-7">{feature.description}</p>
                  <ul className="space-y-3">
                    {feature.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm">
                        <Check className="size-4 text-[var(--success)] mt-0.5 shrink-0" />
                        <span className="text-[#141412]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl">
                    <Image
                      src={feature.image}
                      alt={feature.imageAlt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Extra features grid */}
      <section className="py-20 px-6 bg-[#141412] text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-12">Et bien plus encore</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {EXTRAS.map(({ icon: Icon, title, description }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="size-10 rounded-xl bg-[var(--brand)]/20 flex items-center justify-center mb-4">
                  <Icon className="size-5 text-[var(--brand)]" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--brand-light)] text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-4xl font-black mb-4">Essayez toutes ces fonctionnalités</h2>
          <p className="text-[#5a5a4e] mb-8">30 jours d'accès complet au plan Pro. Sans carte bancaire.</p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-[1.02]"
          >
            Démarrer l'essai gratuit
            <ArrowRight className="size-4" />
          </Link>
          <p className="mt-4 text-sm text-[#9a9a8e]">Résiliation en 1 clic · Aucun engagement</p>
        </div>
      </section>
    </>
  )
}
