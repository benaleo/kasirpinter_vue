<script setup lang="ts">
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useAuth } from '@/services/AuthService.ts'
import FormText from '@/components/elements/form/FormText.vue'

const formSchema = toTypedSchema(
  z
    .object({
      name: z.string().min(3).max(255),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: 'Password tidak sama',
      path: ['confirmPassword'],
    }),
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
      <FormText name="name" label="Nama" placeholder="Masukan nama" />
      <FormText name="email" label="Email" placeholder="Masukan email" />
      <FormText name="password" label="Password" placeholder="******" type="password" />
      <FormText
        name="confirmPassword"
        label="Konfirmasi Password"
        placeholder="******"
        type="password"
      />
    </div>
    <Button type="submit" class="w-full" variant="primary"> Daftar </Button>
  </form>
  <a href="/login" class="text-sm text-black hover:underline">Sudah punya akun? Masuk</a>
</template>
