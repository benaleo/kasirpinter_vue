<template>
  <div class="grid gap-2">
    <p class="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50 data-[error=true]:text-destructive-foreground">{{ label }}</p>
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button
            variant="outline"
            role="combobox"
            :aria-expanded="open"
            class="w-full justify-between"
            :class="{ 'text-muted-foreground': !modelValue }"
        >
          {{ displayValue }}
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[--radix-popover-trigger-width] p-0">
        <Command :filter-function="customFilter">
          <CommandInput
              :placeholder="searchPlaceholder || placeholder"
              class="h-9"
          />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup>
              <CommandItem
                  v-for="item in validData"
                  :key="item.value"
                  :value="item"
                  @select="handleSelect(item)"
              >
                {{ item.label }}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import {computed, ref, toValue, watch} from 'vue'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import type { SelectOption } from "@/types/SelectOption.ts"

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  searchPlaceholder: {
    type: String,
    default: '',
  },
  data: {
    type: Array as () => SelectOption[],
    default: () => [],
    validator: (value: SelectOption[]) => {
      if (!Array.isArray(value)) return false
      return value.every((item) =>
          item &&
          typeof item === 'object' &&
          'value' in item &&
          'label' in item &&
          typeof item.label === 'string'
      )
    },
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const internalValue = ref(props.modelValue)

// Sync external modelValue changes
watch(() => props.modelValue, (newVal) => {
  internalValue.value = newVal
})

const validData = computed(() => {
  const data = toValue(props.data)
  if (!Array.isArray(data)) return []
  return data.filter(item =>
      item &&
      typeof item === 'object' &&
      'value' in item &&
      'label' in item
  )
})

const displayValue = computed(() => {
  if (!internalValue.value) return props.placeholder
  const selected = validData.value.find((item) =>
      String(item.value) === String(internalValue.value)  // Compare as strings
  )
  return selected?.label || props.placeholder
})

const customFilter = (search: string, item: SelectOption) => {
  return item.label.toLowerCase().includes(search.toLowerCase()) ||
  (item.value && item.value.toString().toLowerCase().includes(search.toLowerCase()))
      ? 1
      : 0
}

const handleSelect = (item: SelectOption) => {
  internalValue.value = item.value
  emit('update:modelValue', item.value)
  open.value = false
}

console.log("validData", validData)
console.log("displayValue", displayValue)
</script>