<script setup>
import Sidebar from '@/components/elements/globals/Sidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router' // Add useRouter import
import NetworkStatusDialog from './components/NetworkStatusDialog.vue'
import { useNetworkStatus } from './composables/useNetworkStatus'
import { useAuth } from './services/AuthService'

const { isOnline, checkNetworkStatus } = useNetworkStatus()
const auth = useAuth()
const route = useRoute() // Renamed to route for clarity
const router = useRouter() // Added router instance
const isCms = ref(window.location.pathname.startsWith('/v1/'))

// Update isCms when route changes
watch(() => route.path, (newPath) => {
    isCms.value = newPath.startsWith('/v1/')
})

watch(() => auth.isInitialized.value, (initialized) => {
  if (!initialized) return
  
  // Redirect if trying to access protected routes while unauthenticated
  if (!auth.isLoggedIn()) {
    console.log("not login")
    router.push('/login') // Now using the correct router instance
    // or use router.replace('/login') if you prefer
  }
})

// Debugging
onMounted(() => {
    console.log('Initial network status:', isOnline.value)
})
</script>

<template>
    <SidebarProvider>
        <Sidebar v-if="isCms" />
        <main class="w-full">
            <Toaster :rich-colors="true" />
            <SidebarTrigger v-if="isCms" />
            <router-view v-if="auth.isInitialized"/>
            <NetworkStatusDialog :isOnline="isOnline" @retry="checkNetworkStatus" v-if="!isOnline && isCms" />
        </main>
    </SidebarProvider>
</template>