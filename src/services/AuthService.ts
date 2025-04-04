import { ref } from 'vue'
import { supabase } from '../../lib/supabaseClient'
import type { User, AuthResponse } from '@supabase/supabase-js'

const user = ref<User | null>(null)

// Initialize user on mount
supabase.auth.getUser().then(({ data }) => {
  user.value = data.user
})

// Listen for auth state changes
supabase.auth.onAuthStateChange((_, session) => {
  user.value = session?.user || null
})

async function login(email: string, password: string) {
  const { data, error }: AuthResponse = await supabase.auth.signInWithPassword({
    email,
    password
  })
  if (error) throw error
  return data
}

async function loginWithSocialProvider(provider: 'google' | 'github') {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider
  })
  if (error) throw error
  return data
}

function isLoggedIn() {
  return !!user.value
}

async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

async function register(email: string, password: string) {
  const { data, error }: AuthResponse = await supabase.auth.signUp({
    email,
    password
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

async function maybeHandleEmailConfirmation() {
  const hash = window.location.hash
  if (hash && hash.includes('type=recovery')) {
    const { data, error } = await supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        return { event, session }
      }
    })
    if (error) throw error
    return data
  }
  return null
}

export function useAuth() {
  return {
    user,
    login,
    loginWithSocialProvider,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    maybeHandleEmailConfirmation,
  }
}
