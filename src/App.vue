<script setup>
import { useAuth } from './services/AuthService'
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useNetworkStatus } from './composables/useNetworkStatus'

const { isOnline, checkNetworkStatus } = useNetworkStatus()
const auth = useAuth()
const route = useRoute()
const isCms = ref(false)

// Update isCms when route changes
watch(() => route.path, (newPath) => {
  isCms.value = newPath.startsWith('/v1/')
}, { immediate: true })

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
      <NetworkStatusDialog 
        :isOnline="isOnline" 
        @retry="checkNetworkStatus" 
        v-if="!isOnline && isCms" 
      />
    </main>
  </SidebarProvider>
</template>