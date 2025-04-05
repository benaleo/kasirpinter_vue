<script setup>
import { Toaster } from '@/components/ui/sonner'
import Sidebar from '@/components/elements/globals/Sidebar.vue'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import NetworkStatusDialog from './components/NetworkStatusDialog.vue'
import { useNetworkStatus } from './composables/useNetworkStatus'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from './services/AuthService'

const { isOnline, checkNetworkStatus } = useNetworkStatus()
const auth = useAuth()
const router = useRoute()
const isCms = ref(window.location.pathname.startsWith('/v1/'))

// Update isCms when route changes
watch(() => router.path, (newPath) => {
    isCms.value = newPath.startsWith('/v1/')
})

watch(() => auth.isInitialized.value, (initialized) => {
  if (!initialized) return
  
  // Redirect if trying to access protected routes while unauthenticated
  if (!auth.isLoggedIn() && router.currentRoute.value.meta.requiresAuth) {
    router.push('/login')
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