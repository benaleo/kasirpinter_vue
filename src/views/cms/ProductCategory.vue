<script setup lang="ts">
import { ref } from 'vue'
import {
  productCategoryColumns,
  type ProductCategoryType
} from '@/components/elements/datatable/product-category/product-category-column.ts'
import DataTable from '@/components/elements/datatable/DataTable.vue'
import { useSupabaseFetch } from '@/hook/useSupabaseFetch.ts'

// Use the hook directly - it already handles reactive data
const { data: listData, isLoading, error } = useSupabaseFetch<ProductCategoryType[]>({
  table: 'product_categories', // Use underscore instead of hyphen for table name
  order: { column: 'created_at', options: { ascending: false } },
  limit: 10
})

// No need for onMounted or separate data ref since useSupabaseFetch is reactive
</script>

<template>
  <div class="container py-10 mx-auto">
    <!-- Show loading state -->
    <div v-if="isLoading" class="text-center py-8">
      Loading...
    </div>

    <!-- Show error message if any -->
    <div v-else-if="error" class="text-red-500 p-4">
      Error loading data: {{ error.message }}
    </div>

    <!-- Show data when loaded -->
    <DataTable
      v-else
      :columns="productCategoryColumns"
      :data="listData || []"
    />
  </div>
</template>
