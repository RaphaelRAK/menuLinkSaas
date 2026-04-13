'use client'

import Link from 'next/link'
import { ArrowRight, Clock, Smartphone, Star, Printer, RefreshCw, QrCode, Eye, MessageSquare } from 'lucide-react'

// ── Phone mockup showing the client-facing MenuLink page ─────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[248px] select-none">
      {/* Outer frame */}
      <div className="relative bg-[#1c1c1e] rounded-[46px] p-[11px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
        {/* Dynamic island */}
        <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20" />
        {/* Screen */}
        <div className="bg-white rounded-[36px] overflow-hidden h-[500px] relative">
          {/* Status bar */}
          <div className="h-9 bg-[#faf9f6] flex items-center justify-between px-5 pt-1">
            <span className="text-[10px] font-bold text-[#141412]">9:41</span>
            <span className="text-[9px] text-[#141412]/50 font-medium">menulink.app</span>
            <div className="flex items-center gap-1">
              <div className="flex gap-[2px] items-end">
                {[3, 4, 5, 5].map((h, i) => (
                  <div key={i} className={`w-[3px] rounded-sm bg-[#141412]`} style={{ height: h * 2 }} />
                ))}
              </div>
              <div className="w-5 h-2.5 rounded-sm border border-[#141412]/40 relative ml-1">
                <div className="absolute inset-[2px] right-[2px] bg-[#141412] rounded-[1px]" style={{ width: '70%' }} />
                <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-[#141412]/40 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* Cover photo */}
          <div className="h-28 bg-gradient-to-br from-[#8B2500] to-[var(--brand)] relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(255,255,255,0.3) 0%, transparent 60%)' }}
            />
            {/* Back button */}
            <div className="absolute top-2 left-3 size-7 rounded-full bg-black/30 flex items-center justify-center">
              <ArrowRight className="size-3.5 text-white rotate-180" />
            </div>
            {/* Logo */}
            <div className="absolute -bottom-5 left-4 size-11 rounded-xl bg-white shadow-lg border-2 border-white flex items-center justify-center text-lg">
              🍽️
            </div>
          </div>

          {/* Restaurant info */}
          <div className="pt-7 px-3 pb-2">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-bold text-[11px] text-[#141412]">Le Bistrot Créole</p>
                <p className="text-[9px] text-[#6b6b5e] mt-0.5">Cuisine Française · Paris 11e</p>
              </div>
              <div className="flex items-center gap-0.5 bg-[#FFF8F5] rounded-full px-2 py-0.5">
                <Star className="size-2.5 fill-[var(--brand)] text-[var(--brand)]" />
                <span className="text-[9px] font-bold text-[var(--brand)]">4.8</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <div className="size-1.5 rounded-full bg-[var(--success)]" />
              <span className="text-[9px] text-[#6b6b5e]">Ouvert · Ferme à 22h30</span>
            </div>
          </div>

          {/* Menu tabs */}
          <div className="flex gap-1.5 px-3 mb-2 overflow-hidden">
            {['Entrées', 'Plats', 'Desserts', 'Boissons'].map((tab, i) => (
              <span
                key={tab}
                className={[
                  'text-[9px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium shrink-0',
                  i === 1
                    ? 'bg-[var(--brand)] text-white'
                    : 'bg-[#f5f2ec] text-[#6b6b5e]',
                ].join(' ')}
              >
                {tab}
              </span>
            ))}
          </div>

          {/* Menu items */}
          <div className="px-3 space-y-0 overflow-hidden">
            {[
              { name: 'Magret de canard', price: '24€', desc: 'Sauce fruits rouges, purée' },
              { name: 'Filet de bœuf', price: '32€', desc: 'Pommes grenailles, jus de veau' },
              { name: 'Risotto truffe', price: '22€', desc: 'Parmesan, huile de truffe' },
            ].map((item, i) => (
              <div key={item.name} className={['flex justify-between items-start py-2.5', i < 2 ? 'border-b border-[#f0ece5]' : ''].join(' ')}>
                <div className="flex-1 pr-2">
                  <p className="text-[10px] font-semibold text-[#141412]">{item.name}</p>
                  <p className="text-[8px] text-[#9a9a8e] mt-0.5">{item.desc}</p>
                </div>
                <span className="text-[10px] font-black text-[var(--brand)] shrink-0">{item.price}</span>
              </div>
            ))}
          </div>

          {/* Google review CTA */}
          <div className="absolute bottom-4 left-3 right-3">
            <div className="bg-[#4285F4] rounded-xl px-3 py-2 flex items-center gap-2">
              <div className="size-5 bg-white rounded-sm flex items-center justify-center shrink-0">
                <span className="text-[8px] font-black text-[#4285F4]">G</span>
              </div>
              <span className="text-[9px] font-semibold text-white">Laisser un avis Google</span>
            </div>
          </div>
        </div>
      </div>
      {/* Side buttons */}
      <div className="absolute right-[-2px] top-[110px] w-[3px] h-14 bg-[#2c2c2e] rounded-l-md" />
      <div className="absolute left-[-2px] top-[90px] w-[3px] h-9 bg-[#2c2c2e] rounded-r-md" />
      <div className="absolute left-[-2px] top-[138px] w-[3px] h-12 bg-[#2c2c2e] rounded-r-md" />
      <div className="absolute left-[-2px] top-[162px] w-[3px] h-12 bg-[#2c2c2e] rounded-r-md" />
    </div>
  )
}

// ── QR Code SVG mockup ────────────────────────────────────────────────────────
function QRCodeMockup() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-xl border border-[#ede9e2] w-[200px] mx-auto">
      {/* Simulated QR code with SVG */}
      <div className="mb-3 flex justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="rounded-lg">
          <rect width="120" height="120" fill="white" />
          {/* QR code simulation - finder patterns + data modules */}
          {/* Top-left finder */}
          <rect x="10" y="10" width="30" height="30" rx="3" fill="#141412" />
          <rect x="16" y="16" width="18" height="18" rx="1.5" fill="white" />
          <rect x="20" y="20" width="10" height="10" rx="1" fill="#141412" />
          {/* Top-right finder */}
          <rect x="80" y="10" width="30" height="30" rx="3" fill="#141412" />
          <rect x="86" y="16" width="18" height="18" rx="1.5" fill="white" />
          <rect x="90" y="20" width="10" height="10" rx="1" fill="#141412" />
          {/* Bottom-left finder */}
          <rect x="10" y="80" width="30" height="30" rx="3" fill="#141412" />
          <rect x="16" y="86" width="18" height="18" rx="1.5" fill="white" />
          <rect x="20" y="90" width="10" height="10" rx="1" fill="#141412" />
          {/* Data modules (simplified pattern) */}
          {[50,54,58,62,66,70,74,78].map((x) =>
            [10,14,18,22,26,30].map((y) => (
              Math.random() > 0.5 && <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#141412" />
            ))
          )}
          {[10,14,18,22,26,30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102].map((x) =>
            [50,54,58,62,66,70,74,78,82,86,90,94,98,102].map((y) => (
              (Math.sin(x * 0.3) * Math.cos(y * 0.2) > 0) && <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#141412" />
            ))
          )}
          {/* Center logo */}
          <rect x="50" y="50" width="20" height="20" rx="3" fill="white" stroke="#141412" strokeWidth="1" />
          <rect x="54" y="54" width="12" height="12" rx="1.5" fill="var(--brand)" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[10px] font-bold text-[#141412]">Le Bistrot Créole</p>
        <p className="text-[9px] text-[#9a9a8e]">menulink.app/bistrot-creole</p>
      </div>
    </div>
  )
}

// ── Step card ─────────────────────────────────────────────────────────────────
interface StepProps {
  number: string
  timing: string
  title: string
  description: string
  icon: React.ReactNode
  accent: string
}

function Step({ number, timing, title, description, icon, accent }: StepProps) {
  return (
    <div className="relative flex gap-5 group">
      <div className="flex flex-col items-center">
        <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 ${accent} transition-transform group-hover:scale-105`}>
          {icon}
        </div>
        <div className="w-px flex-1 mt-3 bg-current opacity-10" />
      </div>
      <div className="pb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs font-black tracking-widest uppercase opacity-40">{number}</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${accent} opacity-90`}>{timing}</span>
        </div>
        <h3 className="font-heading text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm leading-relaxed text-[#5a5a4e]">{description}</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default function CommentCaMarchePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#141412] text-white py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-4">Comment ça marche</p>
          <h1 className="font-heading text-5xl md:text-6xl font-black leading-tight mb-6">
            Deux parcours,
            <span className="text-[var(--brand)]"> une seule solution</span>
          </h1>
          <p className="text-white/70 text-xl max-w-xl mx-auto leading-relaxed">
            Le restaurateur crée sa page une fois.
            <br />Ses clients en profitent pour toujours.
          </p>
        </div>
      </section>

      {/* Phone showcase */}
      <section className="bg-[#1a1a18] py-16 px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="text-center md:text-right max-w-xs">
            <p className="font-heading text-2xl font-bold text-white mb-3">Ce que voit votre client</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Une page rapide, lisible sur mobile, sans aucune application à télécharger.
              Toujours à jour, en temps réel.
            </p>
          </div>
          <PhoneMockup />
          <div className="text-center md:text-left max-w-xs">
            <p className="font-heading text-2xl font-bold text-white mb-3">Ce que vous contrôlez</p>
            <p className="text-white/60 text-sm leading-relaxed">
              Changez un prix, ajoutez un plat du jour, mettez à jour vos horaires.
              Instantané, depuis votre téléphone.
            </p>
          </div>
        </div>
      </section>

      {/* Two paths */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">

          {/* Restaurateur */}
          <div className="bg-[#FFF8F4] rounded-3xl p-8 md:p-10 border border-[var(--brand)]/20">
            <div className="inline-flex items-center gap-2 bg-[var(--brand)] text-white text-xs font-bold px-3 py-1.5 rounded-full mb-8">
              <span>🍳</span> Côté restaurateur
            </div>

            <div className="space-y-0">
              <Step
                number="01"
                timing="10 minutes"
                title="Il crée sa page"
                description="Il remplit un formulaire simple : nom, cuisine, horaires, photos, menu avec les prix. Guidé étape par étape, aucune compétence technique requise."
                icon={<Smartphone className="size-5 text-[var(--brand)]" />}
                accent="bg-[var(--brand-light)] text-[var(--brand)]"
              />
              <Step
                number="02"
                timing="2 minutes"
                title="Il imprime son QR code"
                description="PDF prêt à imprimer avec 4 QR codes par page. Il les plastifie et les pose sur ses tables. Simple, propre, professionnel."
                icon={<Printer className="size-5 text-[var(--brand)]" />}
                accent="bg-[var(--brand-light)] text-[var(--brand)]"
              />
              <div className="relative flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="size-12 rounded-2xl flex items-center justify-center shrink-0 bg-[var(--brand-light)] text-[var(--brand)] transition-transform group-hover:scale-105">
                    <RefreshCw className="size-5" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black tracking-widest uppercase opacity-40">03</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--brand-light)] text-[var(--brand)] opacity-90">30 secondes</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Il met à jour quand il veut</h3>
                  <p className="text-sm leading-relaxed text-[#5a5a4e]">Changer un prix, ajouter un plat du jour, annoncer une soirée. Mis à jour instantanément sur la page.</p>
                </div>
              </div>
            </div>

            {/* QR mockup */}
            <div className="mt-10 pt-8 border-t border-[var(--brand)]/10">
              <QRCodeMockup />
              <p className="text-center text-xs text-[#9a9a8e] mt-3">PDF prêt à imprimer · 4 QR codes par page</p>
            </div>
          </div>

          {/* Client final */}
          <div className="bg-[#141412] rounded-3xl p-8 md:p-10 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-8">
              <span>📱</span> Côté client final
            </div>

            <div className="space-y-0">
              <Step
                number="01"
                timing="2 secondes"
                title="Il scanne le QR code"
                description="Assis à table, il sort son téléphone et scanne. Pas d'application à télécharger, ça marche instantanément sur tous les téléphones."
                icon={<QrCode className="size-5 text-white" />}
                accent="bg-white/10 text-white"
              />
              <Step
                number="02"
                timing="Immédiat"
                title="Il voit la carte complète"
                description="Menu par catégories, prix, photos des plats, avis Google. Toujours lisible sur mobile, toujours à jour. Zéro chargement."
                icon={<Eye className="size-5 text-white" />}
                accent="bg-white/10 text-white"
              />
              <div className="relative flex gap-5 group">
                <div className="flex flex-col items-center">
                  <div className="size-12 rounded-2xl flex items-center justify-center shrink-0 bg-white/10 transition-transform group-hover:scale-105">
                    <MessageSquare className="size-5 text-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-black tracking-widest uppercase opacity-40">03</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-white opacity-90">Après la visite</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold mb-2">Il laisse un avis Google</h3>
                  <p className="text-sm leading-relaxed text-white/60">Un lien direct vers Google Reviews depuis la page. Plus c'est facile, plus les clients reviennent et en parlent.</p>
                </div>
              </div>
            </div>

            {/* Phone mockup */}
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="transform scale-90 origin-top">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline visual — the full journey */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-black mb-4">De la création à la fidélisation</h2>
          <p className="text-muted-foreground mb-12 max-w-lg mx-auto">En moins de 15 minutes, votre restaurant est visible, professionnel et interactif.</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {[
              { time: '10 min', label: 'Page créée', color: 'bg-[var(--brand)]' },
              { time: '2 min', label: 'QR imprimé', color: 'bg-[var(--brand)]' },
              { time: '∞', label: 'Mis à jour', color: 'bg-[var(--brand)]' },
              { time: '2 sec', label: 'Client scanne', color: 'bg-[#4285F4]' },
              { time: '★★★★★', label: 'Avis Google', color: 'bg-[var(--success)]' },
            ].map(({ time, label, color }, i, arr) => (
              <div key={label} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`${color} text-white rounded-2xl px-4 py-3 text-center min-w-[80px]`}>
                    <p className="font-black text-sm">{time}</p>
                    <p className="text-xs text-white/80 mt-0.5">{label}</p>
                  </div>
                </div>
                {i < arr.length - 1 && (
                  <div className="hidden md:block w-8 h-px bg-[#ede9e2] mx-1" />
                )}
                {i < arr.length - 1 && (
                  <div className="md:hidden h-4 w-px bg-[#ede9e2] mx-auto my-1" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-[var(--brand-light)]">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="font-heading text-4xl font-black mb-4">Prêt à vous lancer ?</h2>
          <p className="text-[#5a5a4e] mb-8">Créez votre page en 10 minutes et posez vos QR codes dès demain.</p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-semibold px-8 py-4 rounded-full transition-all hover:scale-[1.02]"
          >
            Démarrer mon essai gratuit
            <ArrowRight className="size-4" />
          </Link>
          <p className="mt-4 text-sm text-[#9a9a8e]">30 jours gratuits · Sans engagement</p>
        </div>
      </section>
    </>
  )
}
