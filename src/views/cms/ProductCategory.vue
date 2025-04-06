<script setup lang="ts">
import { productCategoryColumns } from '@/components/elements/datatable/product-category/product-category-column.ts'
import DataTable from '@/components/elements/datatable/DataTable.vue'
import HeadDataTable from '@/components/elements/datatable/HeadDataTable.vue'
import { useProductCategory } from '@/services/ProductCategoryService.ts'

// Use the hook directly - it already handles reactive data
const { listData, error } = useProductCategory().fetchAll()

// No need for onMounted or separate data ref since useSupabaseFetch is reactive
</script>

<template>
  <HeadDataTable title="Kategori Produk" isCreated />
  <div class="container py-10 mx-auto">
    <!-- Show error message if any -->
    <div v-if="error" class="text-red-500 p-4">Error loading data: {{ error.message }}</div>

    <!-- Show data when loaded -->
    <DataTable v-else :columns="productCategoryColumns" :data="listData || []" />
  </div>
</template>
