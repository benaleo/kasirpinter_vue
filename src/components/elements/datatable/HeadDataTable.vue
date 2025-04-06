<script setup lang="ts">
import { Button } from '@/components/ui/button'

const { title } = defineProps<{
  title: string
  isCreated: boolean
}>()
</script>

<template>
  <div class="flex justify-between items-center">
    <h3 class="">
      {{ title }}
    </h3>
    <Button v-if="isCreated" variant="add" class="">Tambah</Button>
  </div>
</template>

<style scoped lang="css"></style>
