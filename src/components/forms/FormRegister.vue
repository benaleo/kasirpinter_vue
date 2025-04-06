<script setup lang="ts">
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useAuth } from '@/services/AuthService.ts'

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  })
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const authService = useAuth()

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
  authService
    .register(values.email, values.password, values.name)
    .then(({ user }) => {
      console.log('User registered:', user)
      if (user == null) {
        toast.error('Terjadi kesalahan saat registrasi')
        return
      } else {
        toast.success('Selamat datang kembali')
        window.location.href = '/v1/dashboard'
      }
    })
    .catch((error: any) => {
      toast.error(error.message)
    })
})
</script>

<template>
  <form @submit="onSubmit" class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-2">
      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="w-full">
          <FormLabel>Nama</FormLabel>
          <FormControl>
            <Input type="text" placeholder="Masukan nama" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="w-full">
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input type="email" placeholder="Masukan email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password">
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="******" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="confirmPassword">
        <FormItem>
          <FormLabel>Konfirmasi Password</FormLabel>
          <FormControl>
            <Input type="password" placeholder="******" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <Button type="submit" class="w-full" variant="primary"> Daftar </Button>
  </form>
  <a href="/login" class="text-sm text-blue-600 hover:underline">Sudah punya akun? Masuk</a>
</template>
