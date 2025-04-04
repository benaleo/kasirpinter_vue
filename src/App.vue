<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {supabase} from "../lib/supabaseClient.ts";


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
  <ul>
    <li v-for="todo in todos" :key="todo.id">{{ todo.name }}</li>
  </ul>
  <div>Hello</div>
</template>

<style scoped></style>
