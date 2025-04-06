<script setup lang="ts">
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const props = defineProps<{
  label: string
  name: string
  placeholder: string
  type?: string
}>()
</script>

<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="w-full">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input :type="type ? type : 'text'" :placeholder="placeholder" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<style scoped lang="css"></style>
