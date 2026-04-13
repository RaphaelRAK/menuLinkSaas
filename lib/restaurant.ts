import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  limit,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage'
import slugify from 'slugify'
import { getFirestoreDb, getFirebaseStorage } from './firebase'
import type { Restaurant } from '@/types/restaurant'

export function generateSlug(name: string): string {
  return slugify(name, { lower: true, strict: true, trim: true })
}

export async function generateUniqueSlug(name: string): Promise<string> {
  const db = getFirestoreDb()
  const baseSlug = generateSlug(name)

  const q = query(collection(db, 'restaurants'), where('slug', '==', baseSlug))
  const snapshot = await getDocs(q)
  if (snapshot.empty) return baseSlug

  let counter = 1
  while (true) {
    const candidate = `${baseSlug}-${counter}`
    const q2 = query(collection(db, 'restaurants'), where('slug', '==', candidate))
    const snap2 = await getDocs(q2)
    if (snap2.empty) return candidate
    counter++
  }
}

export async function createRestaurant(data: Partial<Restaurant>): Promise<string> {
  const db = getFirestoreDb()
  const docRef = await addDoc(collection(db, 'restaurants'), {
    ...data,
    isPublished: false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  })
  return docRef.id
}

export async function updateRestaurant(id: string, data: Partial<Restaurant>): Promise<void> {
  const db = getFirestoreDb()
  await updateDoc(doc(db, 'restaurants', id), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function getLatestDraftRestaurantForOwner(ownerId: string): Promise<{ id: string; data: Partial<Restaurant> } | null> {
  const db = getFirestoreDb()
  const q = query(
    collection(db, 'restaurants'),
    where('ownerId', '==', ownerId),
    where('isPublished', '==', false),
    orderBy('updatedAt', 'desc'),
    limit(1)
  )
  const snap = await getDocs(q)
  const docSnap = snap.docs[0]
  if (!docSnap) return null
  return { id: docSnap.id, data: docSnap.data() as Partial<Restaurant> }
}

export async function uploadRestaurantImage(
  restaurantId: string,
  file: File,
  type: 'logo' | 'cover'
): Promise<string> {
  const storage = getFirebaseStorage()
  const path = `restaurants/${restaurantId}/${type}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}

export async function deleteRestaurantImage(
  restaurantId: string,
  type: 'logo' | 'cover'
): Promise<void> {
  const storage = getFirebaseStorage()
  const path = `restaurants/${restaurantId}/${type}`
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

export async function uploadMenuItemImage(params: {
  restaurantId: string
  itemId: string
  file: File
  index: number
}): Promise<string> {
  const storage = getFirebaseStorage()
  const safeIndex = Math.max(0, Math.min(2, params.index))
  const extension = params.file.type === 'image/png' ? 'png' : 'jpg'
  const path = `restaurants/${params.restaurantId}/menu/${params.itemId}/${safeIndex}.${extension}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, params.file)
  return getDownloadURL(storageRef)
}
