<script setup lang="ts">
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useProductCategory } from '@/services/ProductCategoryService.ts'
import { ref } from 'vue'
import DialogConfirm from '@/components/elements/DialogConfirm.vue'
import { toast } from 'vue-sonner'

// Declare the props and emits
defineProps<{
  item: {
    id: string
  }
}>()

const emit = defineEmits(['expand']) // Add this line to declare the expand event

const router = useRouter()
const productCategoryService = useProductCategory()
const showDialog = ref(false)

function copy(id: string) {
  navigator.clipboard.writeText(id)
}

function edit(id: string) {
  router.push(`/v1/product-category/${id}/edit`)
}

function remove(id: string) {
  try {
    productCategoryService.delete(id)
  } catch (error: any) {
    toast.error(error.message)
  } finally {
    window.location.href = '/v1/product-category'
    toast.success('data berhasil dihapus')
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="w-8 h-8 p-0">
        <span class="sr-only">Open menu</span>
        <MoreHorizontal class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem @click="copy(item.id)">Copy payment ID</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem @click="edit(item.id)">Edit</DropdownMenuItem>
      <DialogConfirm :action="() => remove(item.id)" isDelete />
    </DropdownMenuContent>
  </DropdownMenu>
</template>
