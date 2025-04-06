<script setup lang="ts">
import { useAuth } from '@/services/AuthService'
import type { UserType } from '@/types/UserType'
import { ref, watch } from 'vue'

const auth = useAuth()
const isReady = ref(false)
const user = ref<UserType | null>(null)

// Map Supabase user to our UserType
const mapUser = (supabaseUser: any): UserType | null => {
  if (!supabaseUser) return null
  return {
    id: supabaseUser.id,
    email: supabaseUser.email,
    name: supabaseUser.user_metadata?.name || supabaseUser.email,
    last_sign_in_at: supabaseUser.last_sign_in_at,
  }
}

// Watch both initialization and user changes
watch(
  () => auth.isInitialized,
  (initialized) => {
    if (initialized) {
      isReady.value = true
      user.value = mapUser(auth.user.value)
      console.log('Supabase user initialized:', auth.user.value)
    }
  },
  { immediate: true },
)

// Also watch for user changes after initialization
watch(
  () => auth.user.value,
  (newUser) => {
    if (auth.isInitialized) {
      user.value = mapUser(newUser)
    }
  },
)
</script>

<template>
  <div v-if="isReady && user">
    <p class="text-4xl">Dashboard is Loggedin {{ auth.isLoggedIn() }}</p>
    <div class="mt-4 space-y-2">
      <p>Welcome {{ user.name }}</p>
      <p>Email: {{ user.email }}</p>
      <p>Last login: {{ new Date(user.last_sign_in_at).toLocaleString() }}</p>
    </div>
  </div>

  <div v-else-if="isReady">
    <p>Please log in to access the dashboard</p>
  </div>

  <div v-else>Loading authentication status...</div>
</template>
