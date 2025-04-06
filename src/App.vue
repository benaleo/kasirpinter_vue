<script setup>
import { useAuth } from './services/AuthService'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNetworkStatus } from './composables/useNetworkStatus'
import Sidebar from './components/elements/globals/Sidebar.vue'
import SidebarProvider from './components/ui/sidebar/SidebarProvider.vue'
import { Toaster } from './components/ui/sonner'
import SidebarTrigger from './components/ui/sidebar/SidebarTrigger.vue'
import NetworkStatusDialog from './components/elements/globals/NetworkStatusDialog.vue'

const { isOnline, checkNetworkStatus } = useNetworkStatus()
const auth = useAuth()
const route = useRoute()
let isCms = ref(false)

// Update isCms when route changes
isCms = window.location.pathname.startsWith('/v1/')
console.log('isCms:', isCms)

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
      <div :class="isCms ? 'px-12' : 'px-0'">
        <router-view v-if="auth.isInitialized"/>
      </div>
      <NetworkStatusDialog
        :isOnline="isOnline"
        @retry="checkNetworkStatus"
        v-if="!isOnline && isCms"
      />
    </main>
  </SidebarProvider>
</template>
