import { ref, onMounted, onUnmounted } from 'vue'

export function useNetworkStatus() {
  const isOnline = ref(navigator.onLine)
  let checkInterval : any = null

  // More reliable check that actually tests connectivity
  const performNetworkCheck = async () => {
    try {
      const response = await fetch('https://httpbin.org/get?cache=' + Date.now(), {
        method: 'HEAD',
        cache: 'no-store'
      })
      isOnline.value = response.ok
    } catch (error) {
      isOnline.value = false
    }
    return isOnline.value
  }

  const updateNetworkStatus = async () => {
    // Use both browser API and actual network check
    const browserStatus = navigator.onLine
    const actualStatus = browserStatus ? await performNetworkCheck() : false
    isOnline.value = actualStatus
  }

  onMounted(() => {
    // Initial check
    updateNetworkStatus()

    // Event listeners
    window.addEventListener('online', updateNetworkStatus)
    window.addEventListener('offline', updateNetworkStatus)

    // Periodic checks every 30 seconds
    checkInterval = setInterval(updateNetworkStatus, 30000)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateNetworkStatus)
    window.removeEventListener('offline', updateNetworkStatus)
    if (checkInterval) clearInterval(checkInterval)
  })

  return { 
    isOnline,
    checkNetworkStatus: updateNetworkStatus
  }
}