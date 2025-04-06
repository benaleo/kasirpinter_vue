<template>
  <div class="network-dialog" v-show="visible">
    <div class="dialog-content">
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="actions">
        <button v-if="!isOnline" @click="handleRetry">Retry Connection</button>
        <button @click="visible = false">Dismiss</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { toast } from 'vue-sonner'

const props = defineProps({
  isOnline: Boolean,
})

const emit = defineEmits(['retry'])

const visible = ref(false)
const title = ref('')
const message = ref('')

const handleRetry = () => {
  emit('retry')
}

watch(
  () => props.isOnline,
  (newStatus) => {
    if (!newStatus) {
      title.value = 'Connection Lost'
      message.value = 'You are currently offline. Some features may not be available.'
      visible.value = true
    } else {
      title.value = 'Connection Restored'
      message.value = 'Your internet connection has been restored.'
      visible.value = true
      toast.success('Your internet connection has been restored.')
      const timer = setTimeout(() => {
        visible.value = false
        clearTimeout(timer)
      }, 3000)
    }
  },
  { immediate: true },
)
</script>

<style scoped>
.network-dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  pointer-events: auto;
}

.dialog-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

h3 {
  margin: 0 0 12px 0;
  color: #333;
  font-size: 1.3rem;
}

p {
  margin: 0 0 20px 0;
  color: #666;
  line-height: 1.5;
}

.actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

button {
  padding: 10px 18px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

button:first-child {
  background: #4a6bdf;
  color: white;
}

button:first-child:hover {
  background: #3a56c0;
}

button:last-child {
  background: #f1f3f5;
  color: #333;
}

button:last-child:hover {
  background: #e1e3e5;
}
</style>
