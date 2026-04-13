'use client'

import * as React from 'react'
import { Upload, X, ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { uploadRestaurantImage, deleteRestaurantImage } from '@/lib/restaurant'
import { Button } from '@/components/ui/button'

const ACCEPTED = ['image/jpeg', 'image/png', 'image/webp']

interface UploadZoneProps {
  label: string
  hint: string
  maxMb: number
  aspectClass: string
  previewClass: string
  value: string | undefined
  onUpload: (file: File) => Promise<void>
  onRemove: () => Promise<void>
  isLoading: boolean
}

function UploadZone({
  label, hint, maxMb, aspectClass, previewClass, value, onUpload, onRemove, isLoading,
}: UploadZoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = React.useState(false)
  const [localPreview, setLocalPreview] = React.useState<string | null>(null)

  const displaySrc = localPreview ?? value ?? null

  const handleFile = async (file: File) => {
    if (!ACCEPTED.includes(file.type)) {
      toast.error('Format non accepté. Utilisez JPG, PNG ou WebP.')
      return
    }
    if (file.size > maxMb * 1024 * 1024) {
      toast.error(`Image trop lourde. Maximum ${maxMb} Mo.`)
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => setLocalPreview(e.target?.result as string)
    reader.readAsDataURL(file)
    await onUpload(file)
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) await handleFile(file)
  }

  const handleRemove = async () => {
    setLocalPreview(null)
    await onRemove()
  }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <p className="text-xs text-muted-foreground">{hint}</p>

      {displaySrc ? (
        <div className="relative inline-block">
          <div className={['overflow-hidden bg-muted', aspectClass, previewClass].join(' ')}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={displaySrc} alt={label} className="size-full object-cover" />
          </div>
          <button
            onClick={handleRemove}
            disabled={isLoading}
            className="absolute -top-2 -right-2 size-6 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/90 transition-colors shadow"
            aria-label="Supprimer"
          >
            <X className="size-3.5" />
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          className={[
            'flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed cursor-pointer transition-colors',
            aspectClass,
            dragging
              ? 'border-[var(--brand)] bg-[var(--brand-light)]'
              : 'border-border bg-muted/50 hover:border-[var(--brand)] hover:bg-[var(--brand-light)]',
          ].join(' ')}
        >
          {isLoading ? (
            <span className="size-6 border-2 border-muted-foreground/30 border-t-[var(--brand)] rounded-full animate-spin" />
          ) : (
            <>
              <div className="size-10 rounded-full bg-muted flex items-center justify-center">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium flex items-center gap-1.5">
                  <Upload className="size-4" />
                  Déposer ou cliquer
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">JPG, PNG, WebP — max {maxMb} Mo</p>
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED.join(',')}
        className="sr-only"
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (file) await handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}

export type Step4Ref = { validate: () => Promise<boolean> }

export const Step4Media = React.forwardRef<Step4Ref>((_, ref) => {
  const { formData, restaurantId, updateFormData } = useOnboardingStore()
  const [loadingLogo, setLoadingLogo] = React.useState(false)
  const [loadingCover, setLoadingCover] = React.useState(false)

  React.useImperativeHandle(ref, () => ({
    validate: async () => true,
  }))

  const handleUpload = async (file: File, type: 'logo' | 'cover') => {
    if (!restaurantId) {
      toast.error('Sauvegardez d\'abord les étapes précédentes.')
      return
    }
    const setter = type === 'logo' ? setLoadingLogo : setLoadingCover
    setter(true)
    try {
      const url = await uploadRestaurantImage(restaurantId, file, type)
      updateFormData(type === 'logo' ? { logoUrl: url } : { coverUrl: url })
      toast.success(type === 'logo' ? 'Logo uploadé !' : 'Photo de couverture uploadée !')
    } catch {
      toast.error('Erreur lors de l\'upload.')
    } finally {
      setter(false)
    }
  }

  const handleRemove = async (type: 'logo' | 'cover') => {
    if (!restaurantId) return
    const setter = type === 'logo' ? setLoadingLogo : setLoadingCover
    setter(true)
    try {
      await deleteRestaurantImage(restaurantId, type)
      updateFormData(type === 'logo' ? { logoUrl: undefined } : { coverUrl: undefined })
    } catch {
      toast.error('Erreur lors de la suppression.')
    } finally {
      setter(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-heading text-2xl font-bold">Photos & logo</h2>
        <p className="text-muted-foreground mt-1">Donnez envie aux clients avec de belles images.</p>
      </div>

      <UploadZone
        label="Logo"
        hint="Format carré recommandé — affiché en rond sur votre page."
        maxMb={2}
        aspectClass="w-40 h-40"
        previewClass="rounded-full"
        value={formData.logoUrl}
        onUpload={(f) => handleUpload(f, 'logo')}
        onRemove={() => handleRemove('logo')}
        isLoading={loadingLogo}
      />

      <UploadZone
        label="Photo de couverture"
        hint="Format 16:9 — bannière principale de votre page restaurant."
        maxMb={5}
        aspectClass="w-full aspect-video max-w-lg"
        previewClass="rounded-xl"
        value={formData.coverUrl}
        onUpload={(f) => handleUpload(f, 'cover')}
        onRemove={() => handleRemove('cover')}
        isLoading={loadingCover}
      />
    </div>
  )
})

Step4Media.displayName = 'Step4Media'
