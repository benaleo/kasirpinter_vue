<script setup lang="ts">
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,} from '@/components/ui/dialog'
import {ref} from "vue";

const {action, isDelete, className: _} = defineProps<{
  action: () => void
  isDelete: boolean
  className?: string
}>()

const isOpen = ref(false) // Tambahkan state untuk mengontrol dialog

let title = ref('')
let buttonName = ref('')
let bodyText = ref('')

if (isDelete) {
  title.value = 'Hapus'
  buttonName.value = 'Hapus'
  bodyText.value = 'Apakah anda yakin ingin menghapus data ini ?'
}

const handleAction = () => {
  action() // Jalankan aksi yang diberikan
  isOpen.value = false // Tutup dialog setelah aksi selesai
}
</script>

<template>
  <Dialog :open="isOpen" @update:open="(val:any) => isOpen = val">
    <DialogTrigger
        class="pl-2 text-sm hover:bg-red-600 hover:text-white w-full hover:rounded-md text-left py-1"
        :class="className"
        @click="isOpen = true"
    >
      {{ buttonName }}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ title }}</DialogTitle>
        <DialogDescription>
          {{ bodyText }}
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <button
            class="border-1 rounded-lg px-4 py-2 hover:bg-red-600 hover:text-white"
            @click="handleAction"
        >
          Ya, {{ buttonName }}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>