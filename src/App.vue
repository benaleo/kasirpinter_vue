<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import {supabase} from "../lib/supabaseClient.ts";
import LandingPage from './pages/LandingPage.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'

type RouteType = {
  [key: string]: any
}

const routes: RouteType = {
  '/': LandingPage,
  '/login': Login,
  '/register': Register
}

const currentPath = ref(window.location.hash)

window.addEventListener('hashchange', () => {
  currentPath.value = window.location.hash
})

const currentView = computed(() => {
  return routes[currentPath.value.slice(1) || '/'] || NotFound
})

type Todo = {
  id: string
  name: string
}
const todos = ref<Todo[]>([])

async function getTodos() {
  const { data } = await supabase.from('todos').select('*')
  todos.value = (data as Todo[]) || [];
}

onMounted(() => {
  getTodos()
})
</script>

<template>
  <LandingPage />
</template>

<style scoped></style>
