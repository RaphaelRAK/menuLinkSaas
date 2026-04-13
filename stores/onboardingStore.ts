'use client'

import { create } from 'zustand'
import { createRestaurant, updateRestaurant, getLatestDraftRestaurantForOwner } from '@/lib/restaurant'
import { getFirebaseAuth } from '@/lib/firebase'
import { onAuthStateChanged, type User } from 'firebase/auth'
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
  loadFromFirestore: () => Promise<boolean>
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

  loadFromFirestore: async () => {
    set({ isLoading: true, error: null })
    try {
      const auth = getFirebaseAuth()
      const currentUser: User | null =
        auth.currentUser ??
        (await new Promise<User | null>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            resolve(user)
          })
        }))

      if (!currentUser) return false
      const draft = await getLatestDraftRestaurantForOwner(currentUser.uid)
      if (!draft) return false

      set((state) => ({
        restaurantId: draft.id,
        formData: {
          ...state.formData,
          ...draft.data,
          // garde une structure minimale toujours définie
          hours: (draft.data as Partial<Restaurant>).hours ?? state.formData.hours,
          menu: (draft.data as Partial<Restaurant>).menu ?? state.formData.menu,
          address: (draft.data as Partial<Restaurant>).address ?? state.formData.address,
        },
      }))
      return true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur de chargement'
      set({ error: message })
      return false
    } finally {
      set({ isLoading: false })
    }
  },

  saveToFirestore: async () => {
    set({ isLoading: true, error: null })
    try {
      const { formData, restaurantId } = get()
      console.log('[Firestore] saveToFirestore appelé', { restaurantId, formData })

      const auth = getFirebaseAuth()
      const currentUser: User | null =
        auth.currentUser ??
        (await new Promise<User | null>((resolve) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            resolve(user)
          })
        }))

      if (!currentUser) {
        throw new Error('Vous devez être connecté pour sauvegarder.')
      }

      const ownerId = currentUser.uid
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
