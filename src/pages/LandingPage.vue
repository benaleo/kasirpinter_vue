<script setup>
import { ref } from 'vue';

const feature = ref();
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-style">
    <div class="flex flex-col items-center">
      <h1 class="text-white">Hallo</h1>
      <h3 class="text-white">Selamat datang di Sistem Back Office Kasir Pinter</h3>
    </div>
  </div>
</template>

<style lang="css" scoped>
.bg-style {
  background-image: url('../assets/default/left_side_login.png');
  background-size: cover;
}
</style>