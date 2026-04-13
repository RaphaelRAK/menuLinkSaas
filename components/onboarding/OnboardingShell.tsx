'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ChevronLeft, ChevronRight, Rocket, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { updateRestaurant } from '@/lib/restaurant'

import { Step1Basics, type Step1Ref } from './steps/Step1Basics'
import { Step2Location, type Step2Ref } from './steps/Step2Location'
import { Step3Hours, type Step3Ref } from './steps/Step3Hours'
import { Step4Media, type Step4Ref } from './steps/Step4Media'
import { Step5Menu, type Step5Ref } from './steps/Step5Menu'

const STEPS = [
  { label: 'Infos de base' },
  { label: 'Contact' },
  { label: 'Horaires' },
  { label: 'Médias' },
  { label: 'Menu' },
]

export function OnboardingShell() {
  const router = useRouter()
  const { currentStep, setStep, saveToFirestore, restaurantId } = useOnboardingStore()
  const stepRef = React.useRef<{ validate: () => Promise<boolean> }>(null)
  const [isNavigating, setIsNavigating] = React.useState(false)

  const handleNext = async () => {
    if (isNavigating) return
    setIsNavigating(true)

    try {
      const isValid = await stepRef.current?.validate()
      if (!isValid) return

      if (currentStep < 5) {
        setStep(currentStep + 1)
        // Save in background — don't await, don't block navigation
        saveToFirestore().catch((err) => {
          console.error('[OnboardingShell] saveToFirestore failed:', err)
          toast.warning('Sauvegarde échouée — vos données sont conservées localement.')
        })
      } else {
        // Final step: try to save then publish
        try {
          await saveToFirestore()
          if (restaurantId) {
            await updateRestaurant(restaurantId, { isPublished: true })
          }
          toast.success('Votre restaurant est en ligne !')
          router.push('/dashboard')
        } catch {
          toast.error('Erreur lors de la publication. Réessayez.')
        }
      }
    } finally {
      setIsNavigating(false)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) setStep(currentStep - 1)
  }

  const handleStepClick = (step: number) => {
    if (step < currentStep) setStep(step)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <span className="font-heading font-bold text-xl text-[var(--brand)]">
            MenuLink
          </span>
          <span className="text-sm text-muted-foreground font-medium">
            Étape {currentStep}/{STEPS.length}
          </span>
        </div>

        {/* Step dots */}
        <div className="max-w-2xl mx-auto px-4 pb-4">
          <div className="flex items-center gap-2">
            {STEPS.map((step, i) => {
              const stepNum = i + 1
              const isCompleted = stepNum < currentStep
              const isActive = stepNum === currentStep
              const isClickable = stepNum < currentStep

              return (
                <React.Fragment key={stepNum}>
                  <button
                    onClick={() => handleStepClick(stepNum)}
                    disabled={!isClickable}
                    className={[
                      'flex items-center justify-center size-8 rounded-full text-sm font-semibold transition-colors shrink-0',
                      isCompleted
                        ? 'bg-[var(--success)] text-white cursor-pointer'
                        : isActive
                          ? 'bg-[var(--brand)] text-white'
                          : 'bg-muted text-muted-foreground cursor-not-allowed',
                    ].join(' ')}
                  >
                    {isCompleted ? <Check className="size-4" /> : stepNum}
                  </button>
                  <div className="flex flex-col min-w-0">
                    <span
                      className={[
                        'text-xs font-medium truncate',
                        isActive ? 'text-foreground' : 'text-muted-foreground',
                      ].join(' ')}
                    >
                      {step.label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className={[
                        'flex-1 h-px',
                        stepNum < currentStep ? 'bg-[var(--success)]' : 'bg-border',
                      ].join(' ')}
                    />
                  )}
                </React.Fragment>
              )
            })}
          </div>
        </div>
      </header>

      {/* Step content */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 py-8">
        {currentStep === 1 && <Step1Basics ref={stepRef as React.RefObject<Step1Ref>} />}
        {currentStep === 2 && <Step2Location ref={stepRef as React.RefObject<Step2Ref>} />}
        {currentStep === 3 && <Step3Hours ref={stepRef as React.RefObject<Step3Ref>} />}
        {currentStep === 4 && <Step4Media ref={stepRef as React.RefObject<Step4Ref>} />}
        {currentStep === 5 && <Step5Menu ref={stepRef as React.RefObject<Step5Ref>} />}
      </main>

      {/* Navigation footer */}
      <footer className="bg-white border-t border-border sticky bottom-0">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1 || isNavigating}
          >
            <ChevronLeft className="size-4" />
            Précédent
          </Button>

          <Button
            onClick={handleNext}
            disabled={isNavigating}
            className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white border-transparent"
          >
            {isNavigating ? (
              <span className="flex items-center gap-2">
                <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Validation…
              </span>
            ) : currentStep === 5 ? (
              <span className="flex items-center gap-2">
                <Rocket className="size-4" />
                Publier mon restaurant
              </span>
            ) : (
              <span className="flex items-center gap-2">
                Continuer
                <ChevronRight className="size-4" />
              </span>
            )}
          </Button>
        </div>
      </footer>
    </div>
  )
}
