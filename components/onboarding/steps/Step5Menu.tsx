'use client'

import * as React from 'react'
import Image from 'next/image'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Trash2, X, PencilLine, ImagePlus } from 'lucide-react'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import type { MenuCategory, MenuItem } from '@/types/restaurant'
import { uploadMenuItemImage } from '@/lib/restaurant'

const ALLERGENS = [
  'Gluten', 'Crustacés', 'Œufs', 'Poisson', 'Arachides',
  'Soja', 'Lait', 'Fruits à coque', 'Céleri', 'Moutarde',
  'Sésame', 'Sulfites', 'Lupin', 'Mollusques',
]

const DEFAULT_CATEGORIES = ['Entrées', 'Plats', 'Desserts', 'Boissons']

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

// ── Item form schema ──────────────────────────────────────────────────────────
const itemSchema = z.object({
  name:        z.string().min(1, 'Nom requis'),
  description: z.string().max(200, 'Maximum 200 caractères').optional().or(z.literal('')),
  price:       z.coerce.number().min(0, 'Prix invalide'),
  isAvailable: z.boolean(),
  allergens:   z.array(z.string()),
  options:     z.array(z.object({ name: z.string(), price: z.coerce.number().min(0) })),
})

type ItemFormValues = z.infer<typeof itemSchema>

// ── Item Sheet ────────────────────────────────────────────────────────────────
interface ItemSheetProps {
  open: boolean
  onClose: () => void
  onSave: (item: MenuItem) => void
  initial?: MenuItem
  categoryName: string
  ensureRestaurantId: () => Promise<string>
}

function toItemLabel(categoryName: string) {
  const normalized = categoryName.trim().toLowerCase()
  if (normalized.includes('dessert')) return 'dessert'
  if (normalized.includes('boisson')) return 'boisson'
  return 'plat'
}

function ItemSheet({ open, onClose, onSave, initial, categoryName, ensureRestaurantId }: ItemSheetProps) {
  const itemLabel = toItemLabel(categoryName)
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: initial
      ? { ...initial, options: initial.options ?? [], allergens: initial.allergens }
      : { name: '', description: '', price: 0, isAvailable: true, allergens: [], options: [] },
  })
  const [imageUrls, setImageUrls] = React.useState<string[]>([])
  const [isUploadingImage, setUploadingImage] = React.useState(false)

  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control: form.control,
    name: 'options',
  })

  React.useEffect(() => {
    if (open) {
      const initialImages =
        initial?.imageUrls?.slice(0, 3) ??
        (initial?.imageUrl ? [initial.imageUrl] : [])
      setImageUrls(initialImages)
      form.reset(
        initial
          ? { ...initial, options: initial.options ?? [], allergens: initial.allergens }
          : { name: '', description: '', price: 0, isAvailable: true, allergens: [], options: [] }
      )
    }
  }, [open, initial, form])

  const onSubmit = (values: ItemFormValues) => {
    onSave({
      id: initial?.id ?? generateId(),
      name: values.name,
      description: values.description ?? '',
      price: values.price,
      isAvailable: values.isAvailable,
      allergens: values.allergens,
      options: values.options.length > 0 ? values.options : undefined,
      imageUrls: imageUrls.length > 0 ? imageUrls : undefined,
      imageUrl: imageUrls.length > 0 ? imageUrls[0] : undefined,
    })
    onClose()
  }

  const watchedAllergens = form.watch('allergens')

  const toggleAllergen = (a: string) => {
    const current = form.getValues('allergens')
    if (current.includes(a)) {
      form.setValue('allergens', current.filter((x) => x !== a))
    } else {
      form.setValue('allergens', [...current, a])
    }
  }

  const descLength = form.watch('description')?.length ?? 0

  const handleAddImages = async (files: FileList | null) => {
    if (!files || files.length === 0) return
    if (imageUrls.length >= 3) return

    setUploadingImage(true)
    try {
      const restaurantId = await ensureRestaurantId()
      const itemId = initial?.id ?? form.getValues('name')?.trim() ? (initial?.id ?? generateId()) : (initial?.id ?? generateId())
      const remainingSlots = 3 - imageUrls.length
      const filesToUpload = Array.from(files).slice(0, remainingSlots)

      const newUrls: string[] = []
      for (const file of filesToUpload) {
        const index = imageUrls.length + newUrls.length
        const url = await uploadMenuItemImage({ restaurantId, itemId, file, index })
        newUrls.push(url)
      }
      setImageUrls((prev) => [...prev, ...newUrls].slice(0, 3))
    } finally {
      setUploadingImage(false)
    }
  }

  const removeImageAt = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Sheet open={open} onOpenChange={(o) => { if (!o) onClose() }}>
      <SheetContent className="w-full lg:max-w-3xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{initial ? `Modifier le ${itemLabel}` : `Nouveau ${itemLabel}`}</SheetTitle>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 mt-6 pb-8">
          {/* Images */}
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <Label>Photos (jusqu&apos;à 3)</Label>
              <label className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)] cursor-pointer">
                <ImagePlus className="size-4" />
                Ajouter
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className="sr-only"
                  onChange={(e) => handleAddImages(e.target.files)}
                  disabled={isUploadingImage || imageUrls.length >= 3}
                />
              </label>
            </div>
            {imageUrls.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                Ajoute 1 à 3 images pour rendre ce {itemLabel} plus appétissant.
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {imageUrls.map((url, idx) => (
                  <div key={url} className="relative aspect-square rounded-lg overflow-hidden border border-border bg-muted">
                    <Image src={url} alt="" fill className="object-cover" sizes="(max-width: 640px) 30vw, 120px" />
                    <button
                      type="button"
                      onClick={() => removeImageAt(idx)}
                      className="absolute top-1 right-1 size-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/75"
                      aria-label="Supprimer l'image"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
            {isUploadingImage && (
              <p className="text-xs text-muted-foreground">Téléversement en cours…</p>
            )}
          </div>

          <Separator />

          {/* Name */}
          <div className="space-y-1.5">
            <Label>Nom *</Label>
            <Input placeholder="Ex : Magret de canard" {...form.register('name')} />
            {form.formState.errors.name && (
              <p className="text-destructive text-sm">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea
              placeholder="Accompagnements, sauce, origine…"
              rows={3}
              maxLength={200}
              className="resize-none"
              {...form.register('description')}
            />
            <div className="flex justify-end">
              <span className={['text-xs', descLength > 180 ? 'text-destructive' : 'text-muted-foreground'].join(' ')}>
                {descLength}/200
              </span>
            </div>
          </div>

          {/* Price + availability */}
          <div className="flex items-end gap-4">
            <div className="flex-1 space-y-1.5">
              <Label>Prix (€) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  className="pr-8"
                  {...form.register('price')}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">€</span>
              </div>
              {form.formState.errors.price && (
                <p className="text-destructive text-sm">{form.formState.errors.price.message}</p>
              )}
            </div>
            <div className="flex items-center gap-2 pb-1.5">
              <Switch
                id="available"
                checked={form.watch('isAvailable')}
                onCheckedChange={(v) => form.setValue('isAvailable', v)}
              />
              <Label htmlFor="available" className="cursor-pointer">Disponible</Label>
            </div>
          </div>

          <Separator />

          {/* Allergens */}
          <div className="space-y-2">
            <Label>Allergènes</Label>
            <div className="flex flex-wrap gap-2">
              {ALLERGENS.map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => toggleAllergen(a)}
                  className={[
                    'px-2.5 py-1 rounded-full text-xs font-medium border transition-colors',
                    watchedAllergens.includes(a)
                      ? 'bg-[var(--brand)] border-[var(--brand)] text-white'
                      : 'bg-background border-border text-foreground hover:border-[var(--brand)]',
                  ].join(' ')}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Options/Variants */}
          <div className="space-y-2">
            <Label>Variantes (optionnel)</Label>
            {optionFields.map((field, i) => (
              <div key={field.id} className="flex items-center gap-2">
                <Input
                  placeholder="Ex : Grande taille"
                  className="flex-1"
                  {...form.register(`options.${i}.name`)}
                />
                <div className="relative w-28">
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    className="pr-6"
                    {...form.register(`options.${i}.price`)}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">€</span>
                </div>
                <button
                  type="button"
                  onClick={() => removeOption(i)}
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="size-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => appendOption({ name: '', price: 0 })}
              className="flex items-center gap-1 text-xs text-[var(--brand)] hover:text-[var(--brand-hover)]"
            >
              <Plus className="size-3.5" />
              Ajouter une variante
            </button>
          </div>

          <div className="pt-2">
            <Button type="submit" className="w-full bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white border-transparent">
              {initial ? 'Enregistrer les modifications' : `Ajouter le ${itemLabel}`}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export type Step5Ref = { validate: () => Promise<boolean> }

export const Step5Menu = React.forwardRef<Step5Ref>((_, ref) => {
  const { formData, updateFormData, restaurantId, saveToFirestore } = useOnboardingStore()

  const [categories, setCategories] = React.useState<MenuCategory[]>(() => {
    if (formData.menu && formData.menu.length > 0) return formData.menu
    return DEFAULT_CATEGORIES.map((name) => ({ id: generateId(), name, items: [] }))
  })

  const [activeTab, setActiveTab] = React.useState(() =>
    categories[0]?.id ?? ''
  )
  const [newCatName, setNewCatName] = React.useState('')
  const [showCatDialog, setShowCatDialog] = React.useState(false)
  const [deleteCatId, setDeleteCatId] = React.useState<string | null>(null)
  const [editingItem, setEditingItem] = React.useState<{ catId: string; catName: string; item?: MenuItem } | null>(null)

  React.useImperativeHandle(ref, () => ({
    validate: async () => {
      updateFormData({ menu: categories })
      return true
    },
  }))

  const addCategory = () => {
    if (!newCatName.trim()) return
    const cat: MenuCategory = { id: generateId(), name: newCatName.trim(), items: [] }
    setCategories((p) => [...p, cat])
    setActiveTab(cat.id)
    setNewCatName('')
    setShowCatDialog(false)
  }

  const deleteCategory = (id: string) => {
    setCategories((p) => {
      const next = p.filter((c) => c.id !== id)
      if (activeTab === id) setActiveTab(next[0]?.id ?? '')
      return next
    })
    setDeleteCatId(null)
  }

  const saveItem = (catId: string, item: MenuItem) => {
    setCategories((p) =>
      p.map((cat) => {
        if (cat.id !== catId) return cat
        const exists = cat.items.find((i) => i.id === item.id)
        return {
          ...cat,
          items: exists
            ? cat.items.map((i) => (i.id === item.id ? item : i))
            : [...cat.items, item],
        }
      })
    )
  }

  const deleteItem = (catId: string, itemId: string) => {
    setCategories((p) =>
      p.map((cat) =>
        cat.id !== catId
          ? cat
          : { ...cat, items: cat.items.filter((i) => i.id !== itemId) }
      )
    )
  }

  const ensureRestaurantId = async () => {
    // Les images sont stockées en Storage sous l'id du restaurant
    // → on force une sauvegarde si l'id n'existe pas encore
    if (restaurantId) return restaurantId
    updateFormData({ menu: categories })
    await saveToFirestore()
    const nextId = useOnboardingStore.getState().restaurantId
    if (!nextId) throw new Error('Impossible de créer le restaurant pour stocker les images.')
    return nextId
  }

  const activeCategoryName = React.useMemo(() => {
    const cat = categories.find((c) => c.id === activeTab)
    return cat?.name ?? 'Plats'
  }, [categories, activeTab])

  const addItemLabel = React.useMemo(() => {
    const normalized = activeCategoryName.trim().toLowerCase()
    if (normalized.includes('dessert')) return 'Ajouter un dessert'
    if (normalized.includes('boisson')) return 'Ajouter une boisson'
    return 'Ajouter un plat'
  }, [activeCategoryName])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold">Votre menu</h2>
        <p className="text-muted-foreground mt-1">Créez vos catégories et ajoutez vos plats.</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="mb-4">Aucune catégorie pour l&apos;instant.</p>
          <Button variant="outline" onClick={() => setShowCatDialog(true)}>
            <Plus className="size-4" />
            Ajouter une catégorie
          </Button>
        </div>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <TabsList className="h-auto gap-1 bg-transparent p-0">
              {categories.map((cat) => (
                <div key={cat.id} className="relative group">
                  <TabsTrigger
                    value={cat.id}
                    className="pr-7 data-[state=active]:bg-[var(--brand)] data-[state=active]:text-white"
                  >
                    {cat.name}
                    <span className="ml-1.5 text-xs opacity-70">({cat.items.length})</span>
                  </TabsTrigger>
                  {categories.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteCatId(cat.id) }}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 text-current transition-opacity"
                      aria-label={`Supprimer ${cat.name}`}
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </div>
              ))}
            </TabsList>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCatDialog(true)}
              className="shrink-0"
            >
              <Plus className="size-4" />
              Catégorie
            </Button>
          </div>

          {categories.map((cat) => (
            <TabsContent key={cat.id} value={cat.id} className="mt-4 space-y-3">
              {cat.items.length === 0 && (
                <p className="text-muted-foreground text-sm py-4 text-center">
                  Aucun plat dans cette catégorie.
                </p>
              )}

              {cat.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between rounded-2xl border border-border bg-white p-5 gap-4 shadow-[0_1px_0_rgba(0,0,0,0.02)]"
                >
                  <div className="size-14 rounded-xl overflow-hidden bg-muted border border-border shrink-0">
                    {item.imageUrls?.[0] || item.imageUrl ? (
                      <Image
                        src={(item.imageUrls?.[0] ?? item.imageUrl) as string}
                        alt=""
                        width={56}
                        height={56}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                        <ImagePlus className="size-5" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-base leading-tight">{item.name}</span>
                      {!item.isAvailable && (
                        <Badge variant="secondary" className="text-xs">Indisponible</Badge>
                      )}
                      {((item.imageUrls?.length ?? 0) > 1) && (
                        <Badge variant="outline" className="text-xs">
                          {(item.imageUrls?.length ?? 0)} photos
                        </Badge>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>
                    )}
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-[var(--brand-light)] text-[var(--brand)] px-3 py-1 text-sm font-black">
                        {item.price.toFixed(2)} €
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => setEditingItem({ catId: cat.id, catName: cat.name, item })}
                      className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                      aria-label="Modifier"
                    >
                      <PencilLine className="size-4" />
                    </button>
                    <button
                      onClick={() => deleteItem(cat.id, item.id)}
                      className="size-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
                      aria-label="Supprimer"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full border-dashed"
                onClick={() => setEditingItem({ catId: cat.id, catName: cat.name })}
              >
                <Plus className="size-4" />
                {addItemLabel}
              </Button>
            </TabsContent>
          ))}
        </Tabs>
      )}

      {/* Add category dialog */}
      <Dialog open={showCatDialog} onOpenChange={setShowCatDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nouvelle catégorie</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 py-2">
            <Label>Nom de la catégorie</Label>
            <Input
              placeholder="Ex : Plats du jour"
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCategory()}
              autoFocus
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCatDialog(false)}>Annuler</Button>
            <Button
              onClick={addCategory}
              disabled={!newCatName.trim()}
              className="bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white border-transparent"
            >
              Créer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete category confirmation */}
      <AlertDialog open={!!deleteCatId} onOpenChange={(o) => !o && setDeleteCatId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette catégorie ?</AlertDialogTitle>
            <AlertDialogDescription>
              Tous les plats de cette catégorie seront également supprimés. Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90 text-white"
              onClick={() => deleteCatId && deleteCategory(deleteCatId)}
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Item sheet */}
      {editingItem && (
        <ItemSheet
          open={!!editingItem}
          onClose={() => setEditingItem(null)}
          onSave={(item) => saveItem(editingItem.catId, item)}
          initial={editingItem.item}
          categoryName={editingItem.catName}
          ensureRestaurantId={ensureRestaurantId}
        />
      )}
    </div>
  )
})

Step5Menu.displayName = 'Step5Menu'
