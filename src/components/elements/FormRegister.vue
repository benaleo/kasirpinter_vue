<script setup lang="ts">
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'vue-sonner'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { supabase } from '@/lib/supabaseClient'
import { useAuth } from '@/services/AuthService'
import type { AuthResponse } from '@supabase/supabase-js'

const formSchema = toTypedSchema(z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  password: z.string().min(6),
}))

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const authService = useAuth();

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
  authService.register(values.email, values.password, values.name)
    .then(({ data, user }) => {
      console.log('User registered:', user)
      console.log('Auth data:', data)
      if (user == null) {
        toast.error('Terjadi kesalahan saat registrasi')
        return
      } else {
        toast.success('Selamat datang kembali')
        window.location.href = '/v1/dashboard'
      }

    })
    .catch((error : any) => {
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
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <input type="checkbox" name="ingat-saya" id="ingat-saya">
        <label for="ingat-saya" class="text-sm">Ingat Saya</label>
      </div>
      <a href="#" class="text-sm text-blue-600 hover:underline">Lupa Password</a>
    </div>
    <Button type="submit" class="w-full" variant="primary">
      Masuk
    </Button>
  </form>
  <a href="/login" class="text-sm text-blue-600 hover:underline">Sudah punya akun? Masuk</a>
</template>