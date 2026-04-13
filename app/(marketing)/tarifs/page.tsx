'use client'

import * as React from 'react'
import Link from 'next/link'
import { Check, X, ChevronDown, ArrowRight, Shield, Headphones, RefreshCw } from 'lucide-react'

const PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 29,
    yearlyPrice: 23,
    description: 'Pour démarrer votre présence en ligne.',
    color: 'bg-[#faf9f6] border-[#ede9e2]',
    ctaStyle: 'bg-[#141412] hover:bg-[#333] text-white',
    features: {
      'Page restaurant complète': true,
      'Menu en ligne (illimité)': true,
      'Horaires et contact': true,
      'Photos (5 max)': true,
      'QR code standard': true,
      'Lien Google Reviews': true,
      'Photos illimitées': false,
      'Statistiques de visites': false,
      'QR code personnalisé': false,
      'Badge Certifié Navo': false,
      "Jusqu'à 5 établissements": false,
      'Intégration caisse': false,
      'Campagnes email': false,
      'Analytics avancés': false,
      'Gestionnaire dédié': false,
    },
  },
  {
    name: 'Pro',
    monthlyPrice: 59,
    yearlyPrice: 47,
    description: 'Le plan préféré des restaurateurs actifs.',
    highlighted: true,
    badge: 'Populaire',
    color: 'bg-white border-[var(--brand)] shadow-2xl shadow-[var(--brand)]/10',
    ctaStyle: 'bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white',
    features: {
      'Page restaurant complète': true,
      'Menu en ligne (illimité)': true,
      'Horaires et contact': true,
      'Photos (5 max)': true,
      'QR code standard': true,
      'Lien Google Reviews': true,
      'Photos illimitées': true,
      'Statistiques de visites': true,
      'QR code personnalisé': true,
      'Badge Certifié Navo': true,
      "Jusqu'à 5 établissements": false,
      'Intégration caisse': false,
      'Campagnes email': false,
      'Analytics avancés': false,
      'Gestionnaire dédié': false,
    },
  },
  {
    name: 'Business',
    monthlyPrice: 99,
    yearlyPrice: 79,
    description: 'Pour les groupes et multi-établissements.',
    color: 'bg-[#faf9f6] border-[#ede9e2]',
    ctaStyle: 'bg-[#141412] hover:bg-[#333] text-white',
    features: {
      'Page restaurant complète': true,
      'Menu en ligne (illimité)': true,
      'Horaires et contact': true,
      'Photos (5 max)': true,
      'QR code standard': true,
      'Lien Google Reviews': true,
      'Photos illimitées': true,
      'Statistiques de visites': true,
      'QR code personnalisé': true,
      'Badge Certifié Navo': true,
      "Jusqu'à 5 établissements": true,
      'Intégration caisse': true,
      'Campagnes email': true,
      'Analytics avancés': true,
      'Gestionnaire dédié': true,
    },
  },
]

const ALL_FEATURES = [
  { label: 'Page restaurant complète', category: 'Essentiel' },
  { label: 'Menu en ligne (illimité)', category: 'Essentiel' },
  { label: 'Horaires et contact', category: 'Essentiel' },
  { label: 'Photos (5 max)', category: 'Essentiel' },
  { label: 'QR code standard', category: 'Essentiel' },
  { label: 'Lien Google Reviews', category: 'Essentiel' },
  { label: 'Photos illimitées', category: 'Pro' },
  { label: 'Statistiques de visites', category: 'Pro' },
  { label: 'QR code personnalisé', category: 'Pro' },
  { label: 'Badge Certifié Navo', category: 'Pro' },
  { label: "Jusqu'à 5 établissements", category: 'Business' },
  { label: 'Intégration caisse', category: 'Business' },
  { label: 'Campagnes email', category: 'Business' },
  { label: 'Analytics avancés', category: 'Business' },
  { label: 'Gestionnaire dédié', category: 'Business' },
]

const FAQ_ITEMS = [
  {
    question: 'L\'essai de 30 jours est-il vraiment gratuit ?',
    answer: 'Oui, totalement. Vous accédez à toutes les fonctionnalités du plan Pro pendant 30 jours sans saisir votre carte bancaire. À la fin de l\'essai, vous choisissez votre plan ou vous résiliez — sans aucun frais.',
  },
  {
    question: 'Les prix incluent-ils la TVA ?',
    answer: 'Non, les prix affichés sont HT (hors taxes). La TVA applicable sera ajoutée lors de la facturation selon votre situation (TVA française à 20% pour les entreprises françaises).',
  },
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui. Vous pouvez upgrader, downgrader ou résilier votre abonnement à tout moment depuis votre espace. Un upgrade est immédiatement effectif. Un downgrade prend effet à la fin de la période en cours.',
  },
  {
    question: 'Comment fonctionne la facturation annuelle ?',
    answer: 'En optant pour la facturation annuelle, vous payez 12 mois en une fois et bénéficiez de 2 mois offerts (économie de ~20%). Vous recevez une facture unique au moment du paiement.',
  },
  {
    question: 'Que se passe-t-il si je résilie ?',
    answer: 'Votre compte reste actif jusqu\'à la fin de la période payée. Après résiliation, votre page Navo est désactivée mais vos données sont conservées 30 jours — vous pouvez réactiver votre compte sans rien reconfigurer.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false)
  return (
    <div className="border-b border-[#ede9e2]">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      >
        <span className="font-medium text-[#141412] group-hover:text-[var(--brand)] transition-colors">{question}</span>
        <ChevronDown className={['size-5 text-muted-foreground shrink-0 transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')} />
      </button>
      {open && <p className="pb-5 text-muted-foreground leading-relaxed text-sm pr-8">{answer}</p>}
    </div>
  )
}

export default function TarifsPage() {
  const [yearly, setYearly] = React.useState(false)

  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 bg-[#faf9f6] border-b border-[#ede9e2] text-center">
        <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-4">Tarifs</p>
        <h1 className="font-heading text-5xl md:text-6xl font-black leading-tight mb-6">
          Un investissement,
          <span className="text-[var(--brand)] block">des clients en retour</span>
        </h1>
        <p className="text-[#5a5a4e] text-xl max-w-lg mx-auto mb-10">
          30 jours d'essai gratuit sur tous les plans. Sans carte bancaire. Sans engagement.
        </p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-4 bg-white border border-[#ede9e2] rounded-full px-2 py-2">
          <button
            onClick={() => setYearly(false)}
            className={['px-4 py-1.5 rounded-full text-sm font-semibold transition-all', !yearly ? 'bg-[#141412] text-white' : 'text-[#4a4a3e] hover:text-[#141412]'].join(' ')}
          >
            Mensuel
          </button>
          <button
            onClick={() => setYearly(true)}
            className={['px-4 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2', yearly ? 'bg-[#141412] text-white' : 'text-[#4a4a3e] hover:text-[#141412]'].join(' ')}
          >
            Annuel
            <span className={['text-xs px-2 py-0.5 rounded-full font-bold', yearly ? 'bg-[var(--success)] text-white' : 'bg-[var(--brand-light)] text-[var(--brand)]'].join(' ')}>
              −20%
            </span>
          </button>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-stretch">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={['relative rounded-2xl p-8 flex flex-col border transition-all duration-200', plan.color, plan.highlighted ? 'scale-[1.03]' : 'hover:border-[var(--brand)]/40'].join(' ')}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-[var(--brand)] text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">{plan.badge}</span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-heading text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-5">{plan.description}</p>
                <div className="flex items-end gap-1.5">
                  <span className="font-heading text-5xl font-black text-[#141412]">
                    {yearly ? plan.yearlyPrice : plan.monthlyPrice}€
                  </span>
                  <div className="mb-2">
                    <span className="text-muted-foreground text-sm block">/mois</span>
                    {yearly && (
                      <span className="text-xs text-[var(--success)] font-semibold">facturé annuellement</span>
                    )}
                  </div>
                </div>
                {yearly && (
                  <p className="text-xs text-muted-foreground mt-1">
                    soit {plan.yearlyPrice * 12}€/an
                    <span className="text-[var(--success)] font-semibold ml-1">
                      (économie de {(plan.monthlyPrice - plan.yearlyPrice) * 12}€)
                    </span>
                  </p>
                )}
              </div>

              <ul className="space-y-2.5 mb-8 flex-1">
                {Object.entries(plan.features).slice(0, 6).map(([feat, included]) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm">
                    {included
                      ? <Check className="size-4 text-[var(--success)] mt-0.5 shrink-0" />
                      : <X className="size-4 text-[#ccc] mt-0.5 shrink-0" />}
                    <span className={included ? 'text-[#141412]' : 'text-[#bbb]'}>{feat}</span>
                  </li>
                ))}
                {plan.name !== 'Starter' && (
                  <>
                    {Object.entries(plan.features).slice(6).filter(([, v]) => v).map(([feat]) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm">
                        <Check className="size-4 text-[var(--success)] mt-0.5 shrink-0" />
                        <span className="text-[#141412]">{feat}</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>

              <Link
                href="/auth/signup"
                className={['w-full text-center py-3 rounded-xl font-semibold text-sm transition-all', plan.ctaStyle].join(' ')}
              >
                Commencer l'essai gratuit
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Comparison table */}
      <section className="py-16 px-6 bg-[#f5f2ec]">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-10">Comparatif détaillé</h2>
          <div className="bg-white rounded-2xl overflow-hidden border border-[#ede9e2] shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#ede9e2]">
                  <th className="text-left px-6 py-4 font-semibold text-[#141412] w-1/2">Fonctionnalité</th>
                  {PLANS.map((p) => (
                    <th key={p.name} className={['px-4 py-4 font-bold text-center', p.highlighted ? 'text-[var(--brand)]' : 'text-[#141412]'].join(' ')}>
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ALL_FEATURES.map(({ label, category }, i) => (
                  <tr key={label} className={[i % 2 === 0 ? 'bg-white' : 'bg-[#faf9f6]', 'border-b border-[#f0ece5] last:border-0'].join(' ')}>
                    <td className="px-6 py-3.5 text-[#141412]">
                      {label}
                      {category !== 'Essentiel' && (
                        <span className={['ml-2 text-[10px] font-bold px-1.5 py-0.5 rounded', category === 'Pro' ? 'bg-[var(--brand-light)] text-[var(--brand)]' : 'bg-[#141412]/5 text-[#141412]'].join(' ')}>
                          {category}
                        </span>
                      )}
                    </td>
                    {PLANS.map((p) => (
                      <td key={p.name} className="px-4 py-3.5 text-center">
                        {p.features[label as keyof typeof p.features]
                          ? <Check className="size-5 text-[var(--success)] mx-auto" />
                          : <X className="size-4 text-[#ddd] mx-auto" />}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 text-center">
          {[
            { icon: Shield, title: '30 jours satisfait ou remboursé', desc: 'Si vous n\'êtes pas satisfait dans les 30 jours suivant votre premier paiement, nous vous remboursons intégralement.' },
            { icon: RefreshCw, title: 'Résiliation en 1 clic', desc: 'Pas de formulaire, pas de délai, pas de frais. Résiliez quand vous voulez depuis votre espace en quelques secondes.' },
            { icon: Headphones, title: 'Support réactif', desc: 'Une vraie équipe humaine, disponible par chat et email pour répondre à vos questions.' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-2xl bg-[#faf9f6] border border-[#ede9e2]">
              <div className="size-12 rounded-xl bg-[var(--brand-light)] flex items-center justify-center mx-auto mb-4">
                <Icon className="size-5 text-[var(--brand)]" />
              </div>
              <h3 className="font-heading font-bold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-6 bg-[#faf9f6]">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-3xl font-black text-center mb-10">Questions sur les tarifs</h2>
          <div>
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.question} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--brand)] text-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-4xl font-black mb-4">Commencez votre essai gratuit</h2>
          <p className="text-white/80 mb-8">30 jours d'accès complet au plan Pro. Aucune carte bancaire requise.</p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-white text-[var(--brand)] font-bold px-8 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-[1.02] text-base"
          >
            Démarrer gratuitement
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </section>
    </>
  )
}
