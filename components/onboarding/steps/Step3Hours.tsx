'use client'

import * as React from 'react'
import { Plus, X, Copy } from 'lucide-react'
import { useOnboardingStore, defaultHours } from '@/stores/onboardingStore'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { DayOfWeek, DaySchedule, TimeSlot } from '@/types/restaurant'

const DAY_LABELS: Record<DayOfWeek, string> = {
  monday:    'Lundi',
  tuesday:   'Mardi',
  wednesday: 'Mercredi',
  thursday:  'Jeudi',
  friday:    'Vendredi',
  saturday:  'Samedi',
  sunday:    'Dimanche',
}

const DAYS: DayOfWeek[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export type Step3Ref = { validate: () => Promise<boolean> }

export const Step3Hours = React.forwardRef<Step3Ref>((_, ref) => {
  const { formData, updateFormData } = useOnboardingStore()

  const [hours, setHours] = React.useState<Record<DayOfWeek, DaySchedule>>(
    formData.hours ?? defaultHours
  )

  React.useImperativeHandle(ref, () => ({
    validate: async () => {
      updateFormData({ hours })
      return true
    },
  }))

  const updateDay = (day: DayOfWeek, schedule: Partial<DaySchedule>) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], ...schedule },
    }))
  }

  const updateSlot = (day: DayOfWeek, index: number, slot: Partial<TimeSlot>) => {
    setHours((prev) => {
      const slots = [...prev[day].slots]
      slots[index] = { ...slots[index], ...slot }
      return { ...prev, [day]: { ...prev[day], slots } }
    })
  }

  const addSlot = (day: DayOfWeek) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { open: '19:00', close: '22:30' }],
      },
    }))
  }

  const removeSlot = (day: DayOfWeek, index: number) => {
    setHours((prev) => {
      const slots = prev[day].slots.filter((_, i) => i !== index)
      return { ...prev, [day]: { ...prev[day], slots } }
    })
  }

  const copyMondayToAll = () => {
    const monday = hours.monday
    setHours((prev) => {
      const next = { ...prev }
      DAYS.forEach((d) => {
        if (d !== 'monday') {
          next[d] = { ...monday, slots: monday.slots.map((s) => ({ ...s })) }
        }
      })
      return next
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="font-heading text-2xl font-bold">Horaires d'ouverture</h2>
          <p className="text-muted-foreground mt-1">Configurez vos jours et plages horaires.</p>
        </div>
        <Button variant="outline" size="sm" onClick={copyMondayToAll} className="shrink-0">
          <Copy className="size-4" />
          Copier lundi vers tous
        </Button>
      </div>

      <div className="space-y-3">
        {DAYS.map((day) => {
          const schedule = hours[day]
          return (
            <div key={day} className="rounded-xl border border-border bg-white p-4">
              <div className="flex items-center gap-4">
                <div className="w-24 shrink-0">
                  <span className="text-sm font-medium">{DAY_LABELS[day]}</span>
                </div>
                <Switch
                  checked={schedule.isOpen}
                  onCheckedChange={(checked) => {
                    updateDay(day, {
                      isOpen: checked,
                      slots: checked && schedule.slots.length === 0
                        ? [{ open: '12:00', close: '14:30' }]
                        : schedule.slots,
                    })
                  }}
                />
                <span className="text-sm text-muted-foreground">
                  {schedule.isOpen ? 'Ouvert' : 'Fermé'}
                </span>
              </div>

              {schedule.isOpen && (
                <div className="mt-3 space-y-2 pl-28">
                  {schedule.slots.map((slot, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        type="time"
                        value={slot.open}
                        onChange={(e) => updateSlot(day, i, { open: e.target.value })}
                        className="w-32"
                      />
                      <span className="text-muted-foreground text-sm">–</span>
                      <Input
                        type="time"
                        value={slot.close}
                        onChange={(e) => updateSlot(day, i, { close: e.target.value })}
                        className="w-32"
                      />
                      {schedule.slots.length > 1 && (
                        <button
                          onClick={() => removeSlot(day, i)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Supprimer ce créneau"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                    </div>
                  ))}

                  {schedule.slots.length < 3 && (
                    <button
                      onClick={() => addSlot(day)}
                      className="flex items-center gap-1 text-xs text-[var(--brand)] hover:text-[var(--brand-hover)] transition-colors"
                    >
                      <Plus className="size-3.5" />
                      Ajouter une coupure
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})

Step3Hours.displayName = 'Step3Hours'
