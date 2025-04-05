<script setup>
import Button from '@/components/ui/button/Button.vue';
import { ref } from 'vue';

const feature = ref();

const login = () => {
  window.location.href = '/login';
};

const register = () => {
  window.location.href = '/register';
};
</script>

<template>
  <div class="w-full h-screen flex justify-center items-center bg-style">
    <div class="flex flex-col items-center gap-4">
      <h1 class="text-white">Hallo</h1>
      <h3 class="text-white">Selamat datang di Sistem Back Office Kasir Pinter</h3>
      <div class="flex gap-2">
        <Button variant="add" @click="login">Masuk</Button>
        <Button variant="green" @click="register">Daftar</Button>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.bg-style {
  background-image: url('../assets/default/left_side_login.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>