<template>
  <div class="w-full h-screen grid grid-cols-2" v-if="!auth.isLoggedIn()">
    <div class="bg-style h-screen flex-center flex-col px-4 md:px-12 text-center gap-4">
      <img src="../assets/default/logo_white.svg" alt="logo-white" class="w-[50%]" />
      <p class="text-white">Atur dan kembangkan bisnismu bersama kami sekarang !</p>
    </div>
    <div class="flex-center flex-col px-4 md:px-12 text-center gap-4">
      <h1 class="">Hallo</h1>
      <p class="text-2xl">Selamat Datang di Sistem Back Office Kasir Pinter</p>
      <FormLogin />
    </div>
  </div>
  <div v-else>
    <p class="text-4xl">You are logged in. Redirecting...</p>
  </div>
</template>

<script setup>
import FormLogin from '@/components/elements/FormLogin.vue'
import { useAuth } from '@/services/AuthService'

const auth = useAuth()
</script>
