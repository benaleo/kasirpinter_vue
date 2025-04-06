<script setup lang="ts">
import * as z from 'zod'

import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabaseClient.ts'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { toast } from 'vue-sonner'
import { useAuth } from '@/services/AuthService.ts'
import FormText from '@/components/elements/form/FormText.vue'

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
)

const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const authService = useAuth()

const onSubmit = handleSubmit((values) => {
  console.log('Form submitted!', values)
  authService
    .login(values.email, values.password)
    .then(({ data }) => {
      console.log('User logged in:', data)
      if (data.user == null) {
        toast.error('Terjadi kesalahan saat login')
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
      <FormText name="email" label="Email" placeholder="Masukan email" />
      <FormText name="password" label="Password" placeholder="******"  type="password"/>
    </div>
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-2">
        <input type="checkbox" name="ingat-saya" id="ingat-saya" />
        <label for="ingat-saya" class="text-sm">Ingat Saya</label>
      </div>
      <a href="#" class="text-sm text-blue-600 hover:underline">Lupa Password</a>
    </div>
    <Button type="submit" class="w-full" variant="primary"> Masuk </Button>
  </form>
  <a href="/register" class="text-sm text-black hover:underline">Belum punya akun? Daftar</a>
</template>
