export type CuisineType =
  | 'french' | 'italian' | 'japanese' | 'chinese' | 'indian'
  | 'mexican' | 'american' | 'mediterranean' | 'thai' | 'other'

export type DayOfWeek =
  | 'monday' | 'tuesday' | 'wednesday' | 'thursday'
  | 'friday' | 'saturday' | 'sunday'

export interface TimeSlot {
  open: string   // "12:00"
  close: string  // "14:30"
}

export interface DaySchedule {
  isOpen: boolean
  slots: TimeSlot[]
}

export interface MenuItemOption {
  name: string
  price: number
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
  allergens: string[]
  isAvailable: boolean
  options?: MenuItemOption[]
}

export interface MenuCategory {
  id: string
  name: string
  items: MenuItem[]
}

export interface Restaurant {
  id: string
  ownerId: string
  name: string
  slug: string
  description: string
  cuisineType: CuisineType
  phone: string
  email: string
  website?: string
  address: {
    street: string
    city: string
    zipCode: string
    country: string
  }
  hours: Record<DayOfWeek, DaySchedule>
  logoUrl?: string
  coverUrl?: string
  menu: MenuCategory[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
