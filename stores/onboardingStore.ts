'use client'

import { create } from 'zustand'
import { createRestaurant, updateRestaurant } from '@/lib/restaurant'
import { getFirebaseAuth } from '@/lib/firebase'
import type { Restaurant, DayOfWeek, DaySchedule } from '@/types/restaurant'

const defaultHours: Record<DayOfWeek, DaySchedule> = {
  monday:    { isOpen: true,  slots: [{ open: '12:00', close: '14:30' }, { open: '19:00', close: '22:30' }] },
  tuesday:   { isOpen: true,  slots: [{ open: '12:00', close: '14:30' }, { open: '19:00', close: '22:30' }] },
  wednesday: { isOpen: true,  slots: [{ open: '12:00', close: '14:30' }, { open: '19:00', close: '22:30' }] },
  thursday:  { isOpen: true,  slots: [{ open: '12:00', close: '14:30' }, { open: '19:00', close: '22:30' }] },
  friday:    { isOpen: true,  slots: [{ open: '12:00', close: '14:30' }, { open: '19:00', close: '22:30' }] },
  saturday:  { isOpen: true,  slots: [{ open: '12:00', close: '22:30' }] },
  sunday:    { isOpen: false, slots: [] },
}

interface OnboardingState {
  currentStep: number
  formData: Partial<Restaurant>
  restaurantId: string | null
  isLoading: boolean
  error: string | null
}

interface OnboardingActions {
  setStep: (step: number) => void
  updateFormData: (data: Partial<Restaurant>) => void
  saveToFirestore: () => Promise<void>
  setRestaurantId: (id: string) => void
  reset: () => void
}

const initialState: OnboardingState = {
  currentStep: 1,
  formData: {
    hours: defaultHours,
    menu: [],
    address: { street: '', city: '', zipCode: '', country: 'France' },
  },
  restaurantId: null,
  isLoading: false,
  error: null,
}

export const useOnboardingStore = create<OnboardingState & OnboardingActions>((set, get) => ({
  ...initialState,

  setStep: (step) => set({ currentStep: step }),

  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  setRestaurantId: (id) => set({ restaurantId: id }),

  saveToFirestore: async () => {
    set({ isLoading: true, error: null })
    try {
      const { formData, restaurantId } = get()
      console.log('[Firestore] saveToFirestore appelé', { restaurantId, formData })

      const auth = getFirebaseAuth()
      const ownerId = auth.currentUser?.uid ?? 'anonymous'
      console.log('[Firestore] ownerId:', ownerId)

      if (!restaurantId) {
        console.log('[Firestore] createRestaurant…')
        const id = await createRestaurant({ ...formData, ownerId })
        console.log('[Firestore] restaurant créé, id:', id)
        set({ restaurantId: id })
      } else {
        console.log('[Firestore] updateRestaurant…', restaurantId)
        await updateRestaurant(restaurantId, formData)
        console.log('[Firestore] restaurant mis à jour')
      }
    } catch (err) {
      console.error('[Firestore] ERREUR:', err)
      const message = err instanceof Error ? err.message : 'Erreur de sauvegarde'
      set({ error: message })
      throw err
    } finally {
      set({ isLoading: false })
    }
  },

  reset: () => set(initialState),
}))

export { defaultHours }
