<template>
  <div class="w-full h-screen grid grid-cols-2">
    <div class="bg-style h-screen flex-center flex-col px-4 md:px-12 text-center gap-4">
      <img src="../assets/default/logo_white.svg" alt="logo-white" class="w-[50%]">
      <p class="text-white">Atur dan kembangkan bisnismu bersama kami sekarang !</p>
    </div>
    <div class="flex-center flex-col px-4 md:px-12 text-center gap-4">
      <h1 class="">Daftar</h1>
      <p class="text-2xl">Buat Akun Baru</p>
      <FormRegister/>
    </div>
  </div>
</template>

<script setup>
import FormRegister from '@/components/elements/FormRegister.vue';
import { ref } from 'vue';

const feature = ref();
</script>

<style lang="css" scoped>

</style>

