'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowRight, Smartphone, Star, Printer, RefreshCw, QrCode, Eye, MessageSquare, UtensilsCrossed } from 'lucide-react'

const PHONE_SCREEN_IMAGE =
  'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85'

// ── Phone mockup ──────────────────────────────────────────────────────────────
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[248px] select-none">
      {/* Outer frame */}
      <div className="relative bg-[#1c1c1e] rounded-[46px] p-[11px] shadow-[0_40px_80px_rgba(0,0,0,0.4)] ring-1 ring-white/10">
        {/* Dynamic island */}
        <div className="absolute top-[15px] left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-20" />
        {/* Screen */}
        <div className="rounded-[36px] overflow-hidden h-[500px] relative isolate">
          <Image
            src={PHONE_SCREEN_IMAGE}
            alt=""
            fill
            className="object-cover scale-105"
            sizes="248px"
          />
          <div
            className="absolute inset-0 z-[1] bg-gradient-to-b from-black/55 via-black/20 to-transparent pointer-events-none"
            aria-hidden
          />
          <div className="relative z-10 flex flex-col h-full min-h-0">
            <div className="h-9 flex items-center justify-between px-5 pt-1 shrink-0">
              <span className="text-[10px] font-bold text-white drop-shadow-sm">9:41</span>
              <span className="text-[9px] text-white/75 font-medium drop-shadow-sm">navo.app</span>
              <div className="flex items-center gap-1">
                <div className="flex gap-[2px] items-end">
                  {[3, 4, 5, 5].map((barHeight, signalIndex) => (
                    <div
                      key={signalIndex}
                      className="w-[3px] rounded-sm bg-white/90"
                      style={{ height: barHeight * 2 }}
                    />
                  ))}
                </div>
                <div className="w-5 h-2.5 rounded-sm border border-white/50 relative ml-1">
                  <div
                    className="absolute inset-[2px] right-[2px] bg-white/90 rounded-[1px]"
                    style={{ width: '70%' }}
                  />
                  <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-1.5 bg-white/50 rounded-r-sm" />
                </div>
              </div>
            </div>

            <div className="px-3 pt-1 pb-2 shrink-0 relative">
              <div className="absolute top-1 left-3 size-7 rounded-full bg-black/35 backdrop-blur-sm flex items-center justify-center z-10">
                <ArrowRight className="size-3.5 text-white rotate-180" />
              </div>
              <div className="flex gap-2.5 items-start pl-10 pr-1">
                <div className="size-11 rounded-xl bg-white/95 shadow-lg border border-white/80 flex items-center justify-center shrink-0 backdrop-blur-sm">
                  <UtensilsCrossed className="size-5 text-[var(--brand)]" aria-hidden />
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-bold text-[11px] text-white drop-shadow-md">Le Bistrot Créole</p>
                      <p className="text-[9px] text-white/85 mt-0.5 drop-shadow">Cuisine Française · Paris 11e</p>
                    </div>
                    <div className="flex items-center gap-0.5 rounded-full px-2 py-0.5 bg-white/90 backdrop-blur-sm shadow-sm border border-white/50 shrink-0">
                      <Star className="size-2.5 fill-[var(--brand)] text-[var(--brand)]" />
                      <span className="text-[9px] font-bold text-[#141412]">4.8</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="size-1.5 rounded-full bg-[var(--success)] shadow-sm" />
                    <span className="text-[9px] text-white/90 drop-shadow">Ouvert · Ferme à 22h30</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col min-h-0 rounded-t-[22px] bg-white/94 backdrop-blur-md shadow-[0_-16px_48px_rgba(0,0,0,0.18)] border-t border-white/40 relative">

              {/* Menu tabs */}
              <div className="flex gap-1.5 px-3 mb-2 overflow-hidden pt-3">
                {['Entrées', 'Plats', 'Desserts', 'Boissons'].map((tab, tabIndex) => (
                  <span
                    key={tab}
                    className={[
                      'text-[9px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium shrink-0',
                      tabIndex === 1 ? 'bg-[var(--brand)] text-white' : 'bg-[#f5f2ec] text-[#6b6b5e]',
                    ].join(' ')}
                  >
                    {tab}
                  </span>
                ))}
              </div>

              {/* Menu items */}
              <div className="px-3 space-y-0 overflow-hidden pb-14">
                {[
                  { name: 'Magret de canard', price: '24€', desc: 'Sauce fruits rouges, purée' },
                  { name: 'Filet de bœuf', price: '32€', desc: 'Pommes grenailles, jus de veau' },
                  { name: 'Risotto truffe', price: '22€', desc: 'Parmesan, huile de truffe' },
                ].map((item, itemIndex) => (
                  <div
                    key={item.name}
                    className={[
                      'flex justify-between items-start py-2.5',
                      itemIndex < 2 ? 'border-b border-[#f0ece5]' : '',
                    ].join(' ')}
                  >
                    <div className="flex-1 pr-2">
                      <p className="text-[10px] font-semibold text-[#141412]">{item.name}</p>
                      <p className="text-[8px] text-[#9a9a8e] mt-0.5">{item.desc}</p>
                    </div>
                    <span className="text-[10px] font-black text-[var(--brand)] shrink-0">{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Google review CTA */}
              <div className="absolute bottom-4 left-3 right-3 z-10">
                <div className="bg-[#4285F4] rounded-xl px-3 py-2 flex items-center gap-2 shadow-lg shadow-black/20">
                  <div className="size-5 bg-white rounded-sm flex items-center justify-center shrink-0">
                    <span className="text-[8px] font-black text-[#4285F4]">G</span>
                  </div>
                  <span className="text-[9px] font-semibold text-white">Laisser un avis Google</span>
                </div>
              </div>
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
      <div className="mb-3 flex justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="rounded-lg">
          <rect width="120" height="120" fill="white" />
          <rect x="10" y="10" width="30" height="30" rx="3" fill="#141412" />
          <rect x="16" y="16" width="18" height="18" rx="1.5" fill="white" />
          <rect x="20" y="20" width="10" height="10" rx="1" fill="#141412" />
          <rect x="80" y="10" width="30" height="30" rx="3" fill="#141412" />
          <rect x="86" y="16" width="18" height="18" rx="1.5" fill="white" />
          <rect x="90" y="20" width="10" height="10" rx="1" fill="#141412" />
          <rect x="10" y="80" width="30" height="30" rx="3" fill="#141412" />
          <rect x="16" y="86" width="18" height="18" rx="1.5" fill="white" />
          <rect x="20" y="90" width="10" height="10" rx="1" fill="#141412" />
          {[50,54,58,62,66,70,74,78].map((x) =>
            [10,14,18,22,26,30].map((y) => (
              (Math.sin(x * 0.7 + y * 0.3) > 0) && <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#141412" />
            ))
          )}
          {[10,14,18,22,26,30,34,38,42,46,50,54,58,62,66,70,74,78,82,86,90,94,98,102].map((x) =>
            [50,54,58,62,66,70,74,78,82,86,90,94,98,102].map((y) => (
              (Math.sin(x * 0.3) * Math.cos(y * 0.2) > 0) && <rect key={`${x}-${y}`} x={x} y={y} width="4" height="4" fill="#141412" />
            ))
          )}
          <rect x="50" y="50" width="20" height="20" rx="3" fill="white" stroke="#141412" strokeWidth="1" />
          <rect x="54" y="54" width="12" height="12" rx="1.5" fill="var(--brand)" />
        </svg>
      </div>
      <div className="text-center">
        <p className="text-[10px] font-bold text-[#141412]">Le Bistrot Créole</p>
        <p className="text-[9px] text-[#9a9a8e]">navo.app/bistrot-creole</p>
      </div>
    </div>
  )
}

// ── Step card for the two-col section ─────────────────────────────────────────
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

const JOURNEY = [
  {
    n: '01', time: '10 min', label: 'Page créée',
    desc: 'Formulaire guidé, aucune compétence requise',
    icon: Smartphone, side: 'resto' as const,
  },
  {
    n: '02', time: '2 min', label: 'QR imprimé',
    desc: 'PDF prêt à plastifier et poser en salle',
    icon: Printer, side: 'resto' as const,
  },
  {
    n: '03', time: '30 sec', label: 'Mis à jour',
    desc: 'Prix, plat du jour, horaires — instantané',
    icon: RefreshCw, side: 'resto' as const,
  },
  {
    n: '04', time: '2 sec', label: 'Client scanne',
    desc: 'Sans application, fonctionne sur tous les téléphones',
    icon: QrCode, side: 'client' as const,
  },
  {
    n: '05', time: 'Après visite', label: 'Avis Google',
    desc: 'Lien direct depuis la page, plus de friction',
    icon: MessageSquare, side: 'client' as const,
  },
]

function useJourneySectionVisible() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isJourneyVisible, setJourneyVisible] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    const sectionElement = sectionRef.current
    if (!sectionElement) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setJourneyVisible(true)
      },
      { threshold: 0.08, rootMargin: '0px 0px -6% 0px' }
    )
    observer.observe(sectionElement)
    return () => observer.disconnect()
  }, [])

  return { sectionRef, isJourneyVisible }
}

function JourneyFidelisationSection() {
  const { sectionRef, isJourneyVisible } = useJourneySectionVisible()

  return (
    <section
      ref={sectionRef}
      data-journey-visible={isJourneyVisible}
      className="relative bg-[#0f0e0c] py-24 px-6 overflow-hidden"
    >
      {/* Fonds animés discrets */}
      <div
        className="pointer-events-none absolute -top-24 -left-32 size-[420px] rounded-full bg-[var(--brand)]/12 blur-[100px] motion-safe:animate-[journeyOrb_14s_ease-in-out_infinite]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-24 size-[380px] rounded-full bg-[var(--success)]/10 blur-[90px] motion-safe:animate-[journeyOrb_18s_ease-in-out_infinite_reverse]"
        aria-hidden
      />

      <style>{`
        @keyframes journeyOrb {
          0%, 100% { opacity: 0.55; transform: translate(0, 0) scale(1); }
          50% { opacity: 0.9; transform: translate(12px, -18px) scale(1.06); }
        }
        @keyframes navoSlideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes navoGrowLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes navoGrowVertical {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        @keyframes navoFade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes navoFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes navoShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes navoStatIn {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        [data-journey-visible="false"] .journey-heading {
          opacity: 0;
          transform: translateY(20px);
        }
        [data-journey-visible="true"] .journey-heading {
          animation: navoFade 0.75s cubic-bezier(0.4,0,0.2,1) both;
        }
        [data-journey-visible="false"] .journey-step {
          opacity: 0;
          transform: translateY(28px);
        }
        [data-journey-visible="true"] .journey-step {
          animation: navoSlideUp 0.62s cubic-bezier(0.4,0,0.2,1) calc(var(--journey-step-delay, 0s) + 0.05s) both;
        }
        [data-journey-visible="true"] .journey-step-icon {
          animation: navoFloat 4.5s ease-in-out calc(var(--journey-step-delay, 0s) + 0.4s) infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .journey-step, .journey-heading, .journey-stat { animation: none !important; opacity: 1 !important; transform: none !important; }
          .journey-step-icon { animation: none !important; }
        }
        [data-journey-visible="false"] .journey-line-track {
          transform: scaleX(0);
        }
        [data-journey-visible="true"] .journey-line-track {
          animation: navoGrowLine 1.35s cubic-bezier(0.4,0,0.2,1) 0.2s both;
        }
        [data-journey-visible="false"] .journey-line-vertical {
          transform: scaleY(0);
        }
        [data-journey-visible="true"] .journey-line-vertical {
          animation: navoGrowVertical 1.15s cubic-bezier(0.4,0,0.2,1) 0.25s both;
        }
        [data-journey-visible="false"] .journey-stat {
          opacity: 0;
          transform: translateY(14px);
        }
        [data-journey-visible="true"] .journey-stat {
          animation: navoStatIn 0.55s cubic-bezier(0.4,0,0.2,1) calc(0.85s + var(--journey-stat-delay, 0s)) both;
        }
      `}</style>

      <div className="max-w-5xl mx-auto relative z-10">

        <div className="text-center mb-16 journey-heading">
          <p className="text-[var(--brand)] font-semibold text-sm tracking-widest uppercase mb-4">Le parcours complet</p>
          <h2 className="font-heading text-4xl md:text-5xl font-black text-white mb-4">
            De la création à la fidélisation
          </h2>
          <p className="text-white/50 max-w-md mx-auto leading-relaxed text-sm">
            En moins de 15 minutes, votre restaurant est visible, professionnel et interactif.
          </p>
        </div>

        <div className="hidden md:flex items-center mb-10 max-w-4xl mx-auto gap-0 journey-heading">
          <div className="flex-[3] flex items-center gap-3">
            <span className="text-[11px] font-black tracking-widest uppercase text-[var(--brand)] whitespace-nowrap">
              Restaurateur
            </span>
            <div className="flex-1 h-px bg-[var(--brand)]/25" />
          </div>
          <div className="w-px h-5 bg-white/10 mx-6 shrink-0" />
          <div className="flex-[2] flex items-center gap-3">
            <div className="flex-1 h-px bg-[var(--success)]/25" />
            <span className="text-[11px] font-black tracking-widest uppercase text-[var(--success)] whitespace-nowrap">
              Client
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[8%] right-[8%] h-[2px] overflow-hidden z-0 origin-left rounded-full journey-line-track">
            <div className="h-full w-full bg-gradient-to-r from-[var(--brand)]/55 via-white/35 to-[var(--success)]/55 bg-[length:200%_100%] motion-safe:animate-[navoShimmer_5s_linear_infinite]" />
          </div>

          {/* Ligne verticale mobile */}
          <div
            className="journey-line-vertical md:hidden absolute left-[calc(1.5rem+28px)] top-3 bottom-3 w-px bg-gradient-to-b from-[var(--brand)]/40 via-white/15 to-[var(--success)]/40 rounded-full origin-top"
            aria-hidden
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-3">
            {JOURNEY.map((step, stepIndex) => {
              const Icon = step.icon
              const isResto = step.side === 'resto'
              const stepDelay = 0.12 + stepIndex * 0.11
              return (
                <div
                  key={step.label}
                  className="journey-step flex flex-row md:flex-col items-start md:items-center text-left md:text-center relative z-10 group gap-4 md:gap-0 pl-0 md:pl-0"
                  style={{ '--journey-step-delay': `${stepDelay}s` } as CSSProperties}
                >
                  <div
                    className={`md:hidden shrink-0 size-14 rounded-2xl flex items-center justify-center journey-step-icon ${
                      isResto
                        ? 'bg-[var(--brand)]/12 border border-[var(--brand)]/25'
                        : 'bg-[var(--success)]/12 border border-[var(--success)]/25'
                    }`}
                  >
                    <Icon className={`size-6 ${isResto ? 'text-[var(--brand)]' : 'text-[var(--success)]'}`} />
                  </div>

                  <div
                    className={`hidden md:block absolute top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 size-2.5 rounded-full z-20 ring-2 ring-[#0f0e0c] motion-safe:animate-pulse ${
                      isResto ? 'bg-[var(--brand)]' : 'bg-[var(--success)]'
                    }`}
                  />

                  <div
                    className={`journey-step-icon size-16 rounded-2xl hidden md:flex items-center justify-center mb-4 transition-all duration-300
                      group-hover:scale-110 group-hover:-translate-y-1 ${
                      isResto
                        ? 'bg-[var(--brand)]/12 border border-[var(--brand)]/25 group-hover:bg-[var(--brand)]/20'
                        : 'bg-[var(--success)]/12 border border-[var(--success)]/25 group-hover:bg-[var(--success)]/20'
                    }`}
                  >
                    <Icon className={`size-6 ${isResto ? 'text-[var(--brand)]' : 'text-[var(--success)]'}`} />
                  </div>

                  <div className="flex-1 min-w-0 md:contents">
                    <span className="text-[10px] font-black tracking-widest text-white/20 mb-1 md:block hidden">{step.n}</span>
                    <span className={`text-[11px] font-black px-3 py-1 rounded-full mb-3 inline-block md:mx-auto ${
                      isResto
                        ? 'bg-[var(--brand)]/15 text-[var(--brand)]'
                        : 'bg-[var(--success)]/15 text-[var(--success)]'
                    }`}>
                      {step.time}
                    </span>
                    <p className="text-sm font-bold text-white mb-1.5 leading-tight">{step.label}</p>
                    <p className="text-[11px] text-white/40 leading-relaxed max-w-[130px] md:mx-auto">{step.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/8 pt-12">
          {[
            { value: '< 15 min', label: 'De zéro à en ligne', statDelay: '0s' },
            { value: 'Temps réel', label: 'Mises à jour instantanées', statDelay: '0.08s' },
            { value: '0 app', label: 'Requise pour vos clients', statDelay: '0.16s' },
          ].map(({ value, label, statDelay }) => (
            <div
              key={label}
              className="journey-stat text-center py-5 rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm transition-all duration-300 hover:bg-white/[0.07] hover:border-white/15"
              style={{ '--journey-stat-delay': statDelay } as CSSProperties}
            >
              <p className="font-heading text-2xl font-black text-white mb-1">{value}</p>
              <p className="text-xs text-white/40">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

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
              Côté restaurateur
            </div>
            <div className="space-y-0">
              <Step
                number="01" timing="10 minutes" title="Il crée sa page"
                description="Il remplit un formulaire simple : nom, cuisine, horaires, photos, menu avec les prix. Guidé étape par étape, aucune compétence technique requise."
                icon={<Smartphone className="size-5 text-[var(--brand)]" />}
                accent="bg-[var(--brand-light)] text-[var(--brand)]"
              />
              <Step
                number="02" timing="2 minutes" title="Il imprime son QR code"
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
            <div className="mt-10 pt-8 border-t border-[var(--brand)]/10">
              <QRCodeMockup />
              <p className="text-center text-xs text-[#9a9a8e] mt-3">PDF prêt à imprimer · 4 QR codes par page</p>
            </div>
          </div>

          {/* Client final */}
          <div className="bg-[#141412] rounded-3xl p-8 md:p-10 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-8">
              Côté client final
            </div>
            <div className="space-y-0">
              <Step
                number="01" timing="2 secondes" title="Il scanne le QR code"
                description="Assis à table, il sort son téléphone et scanne. Pas d'application à télécharger, ça marche instantanément sur tous les téléphones."
                icon={<QrCode className="size-5 text-white" />}
                accent="bg-white/10 text-white"
              />
              <Step
                number="02" timing="Immédiat" title="Il voit la carte complète"
                description="Menu par catégories, prix, photos des plats. Toujours lisible sur mobile, toujours à jour. Zéro chargement."
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
                  <p className="text-sm leading-relaxed text-white/60">
                    Un lien direct vers Google Reviews depuis la page. Plus c&apos;est facile, plus les clients reviennent et en parlent.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-8 border-t border-white/10">
              <div className="transform scale-90 origin-top">
                <PhoneMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      <JourneyFidelisationSection />

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
