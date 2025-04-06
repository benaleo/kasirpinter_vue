import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import type { User, AuthResponse } from '@supabase/supabase-js'

const user = ref<User | null>(null)
const isLoading = ref(true)
const isInitialized = ref(false) // Add this flag

// Proper initialization function
async function initializeAuth() {
  try {
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser()
    if (error) throw error
    user.value = supabaseUser
  } catch (error) {
    user.value = null
  } finally {
    isLoading.value = false
    isInitialized.value = true
  }
}

// Initialize immediately
initializeAuth()

// Listen for auth changes
supabase.auth.onAuthStateChange((event, session) => {
  user.value = session?.user || null
})

// Initialize user on mount
supabase.auth
  .getUser()
  .then(({ data }) => {
    user.value = data.user
  })
  .finally(() => {
    isLoading.value = false // Mark loading as complete
  })

function isLoggedIn() {
  return !!user.value
}

async function login(email: string, password: string) {
  const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  if (error) throw error
  console.log('data login is : ' + data)
  return { data, error: null }
}

async function loginWithSocialProvider(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
  })
  if (error) throw error
  return data
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

async function register(email: string, password: string, name: string) {
  const { data, error }: AuthResponse = await supabase.auth.signUp({
    options: {
      data: { name },
    },
    email,
    password,
  })
  if (error) throw error
  return data
}

async function update(userData: { email?: string; password?: string; data?: object }) {
  const { data, error } = await supabase.auth.updateUser(userData)
  if (error) throw error
  return data
}

async function sendPasswordRestEmail(email: string) {
  const { error } = await supabase.auth.resetPasswordForEmail(email)
  if (error) throw error
}

// async function maybeHandleEmailConfirmation() {
//   const hash = window.location.hash
//   if (hash && hash.includes('type=recovery')) {
//     const { data, error } = await supabase.auth.onAuthStateChange((event, session) => {
//       if (event === 'PASSWORD_RECOVERY') {
//         return { event, session }
//       }
//     })
//     if (error) throw error
//     return data
//   }
//   return null
// }

function getUserData() {
  return supabase.auth.getUser().then(({ data }) => data.user)
}

export function useAuth() {
  return {
    user,
    login,
    loginWithSocialProvider,
    isLoading,
    isInitialized,
    isLoggedIn: () => !!user.value,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    // maybeHandleEmailConfirmation,
    getUserData,
  }
}
