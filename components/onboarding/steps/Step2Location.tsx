'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useOnboardingStore } from '@/stores/onboardingStore'
import {
  Form, FormField, FormItem, FormLabel, FormControl, FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const schema = z.object({
  address: z.object({
    street:  z.string().min(1, 'Adresse requise'),
    city:    z.string().min(1, 'Ville requise'),
    zipCode: z.string().min(1, 'Code postal requis'),
    country: z.string().min(1, 'Pays requis'),
  }),
  phone:   z.string().min(1, 'Téléphone requis'),
  email:   z.string().email('Email invalide'),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

export type Step2Ref = { validate: () => Promise<boolean> }

export const Step2Location = React.forwardRef<Step2Ref>((_, ref) => {
  const { formData, updateFormData } = useOnboardingStore()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: {
        street:  formData.address?.street  ?? '',
        city:    formData.address?.city    ?? '',
        zipCode: formData.address?.zipCode ?? '',
        country: formData.address?.country ?? 'France',
      },
      phone:   formData.phone   ?? '',
      email:   formData.email   ?? '',
      website: formData.website ?? '',
    },
  })

  React.useImperativeHandle(ref, () => ({
    validate: async () => {
      const valid = await form.trigger()
      if (valid) updateFormData(form.getValues())
      return valid
    },
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading text-2xl font-bold">Localisation & contact</h2>
        <p className="text-muted-foreground mt-1">Où se trouve votre restaurant et comment vous joindre.</p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Adresse</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="address.street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rue *</FormLabel>
                    <FormControl>
                      <Input placeholder="12 rue de la Paix" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address.zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code postal *</FormLabel>
                      <FormControl>
                        <Input placeholder="75001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address.city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville *</FormLabel>
                      <FormControl>
                        <Input placeholder="Paris" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="address.country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pays *</FormLabel>
                    <FormControl>
                      <Input placeholder="France" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Téléphone *</FormLabel>
                    <FormControl>
                      <Input placeholder="+33 1 23 45 67 89" type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@monrestaurant.fr" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site web</FormLabel>
                    <FormControl>
                      <Input placeholder="https://monrestaurant.fr" type="url" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  )
})

Step2Location.displayName = 'Step2Location'
