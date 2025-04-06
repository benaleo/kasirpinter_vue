<script setup lang="ts">
import {Button} from '@/components/ui/button'
import {useRouter} from 'vue-router'

const {title} = defineProps<{
  title: string
  isCreated: boolean
  addLink?: string
}>()

const router = useRouter()

</script>

<template>
  <div class="flex justify-between items-center">
    <h3 class="">
      {{ title }}
    </h3>
    <Button v-if="isCreated" variant="add" class="" @click="router.push(addLink ? addLink : '/create')">Tambah
    </Button>
  </div>
</template>

<style scoped lang="css"></style>
