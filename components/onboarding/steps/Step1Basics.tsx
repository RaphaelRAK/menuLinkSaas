'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOnboardingStore } from '@/stores/onboardingStore'
import { generateSlug } from '@/lib/restaurant'
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select'

const CUISINE_OPTIONS: { value: string; label: string }[] = [
  { value: 'french',        label: 'Française' },
  { value: 'italian',       label: 'Italienne' },
  { value: 'japanese',      label: 'Japonaise' },
  { value: 'chinese',       label: 'Chinoise' },
  { value: 'indian',        label: 'Indienne' },
  { value: 'mexican',       label: 'Mexicaine' },
  { value: 'american',      label: 'Américaine' },
  { value: 'mediterranean', label: 'Méditerranéenne' },
  { value: 'thai',          label: 'Thaïlandaise' },
  { value: 'other',         label: 'Autre' },
]

const schema = z.object({
  name: z.string().min(2, 'Minimum 2 caractères').max(80, 'Maximum 80 caractères'),
  cuisineType: z.enum(
    ['french', 'italian', 'japanese', 'chinese', 'indian', 'mexican', 'american', 'mediterranean', 'thai', 'other'],
    { invalid_type_error: 'Sélectionnez un type de cuisine' }
  ),
  description: z
    .string()
    .min(20, 'Minimum 20 caractères')
    .max(300, 'Maximum 300 caractères'),
})

type FormValues = z.infer<typeof schema>

export type Step1Ref = { validate: () => Promise<boolean> }

export const Step1Basics = React.forwardRef<Step1Ref>((_, ref) => {
  const { formData, updateFormData } = useOnboardingStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: (formData.name as string) ?? '',
      cuisineType: (formData.cuisineType as FormValues['cuisineType']) ?? undefined,
      description: (formData.description as string) ?? '',
    },
  })

  const watchName = form.watch('name')
  const slug = generateSlug(watchName || '')

  React.useImperativeHandle(ref, () => ({
    validate: async () => {
      const valid = await form.trigger()
      if (valid) {
        const values = form.getValues()
        updateFormData({ ...values, slug })
      }
      return valid
    },
  }))

  const descLength = form.watch('description')?.length ?? 0

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold">Présentez votre restaurant</h2>
        <p className="text-muted-foreground mt-1">Ces informations apparaîtront sur votre page MenuLink.</p>
      </div>

      <Form {...form}>
        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du restaurant *</FormLabel>
                <FormControl>
                  <Input placeholder="Ex : Le Bistrot Parisien" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="cuisineType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de cuisine *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CUISINE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Décrivez votre restaurant en quelques mots…"
                    className="resize-none"
                    rows={4}
                    maxLength={300}
                    {...field}
                  />
                </FormControl>
                <div className="flex justify-between items-center">
                  <FormMessage />
                  <span className={[
                    'text-xs ml-auto',
                    descLength > 280 ? 'text-destructive' : 'text-muted-foreground',
                  ].join(' ')}>
                    {descLength}/300
                  </span>
                </div>
              </FormItem>
            )}
          />

          {/* Slug preview */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Votre URL MenuLink</label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2">
              <span className="text-muted-foreground text-sm">menulink.app/</span>
              <span className="text-sm font-medium text-foreground">
                {slug || <span className="text-muted-foreground italic">votre-restaurant</span>}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Générée automatiquement depuis le nom.</p>
          </div>
        </form>
      </Form>
    </div>
  )
})

Step1Basics.displayName = 'Step1Basics'
