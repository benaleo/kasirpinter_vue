<script setup lang="ts">
import DataTable from '@/components/datatable/DataTable.vue'
import HeadDataTable from '@/components/datatable/HeadDataTable.vue'
import { useCompany } from '@/services/CompanyService.ts'
import { companyColumns } from '@/components/datatable/company/company-column.ts'

// Use the hook directly - it already handles reactive data
const { listData, error } = useCompany().fetchAll(true)
const path = window.location.pathname
</script>

<template>
  <HeadDataTable title="Perusahaan" isCreated :addLink="`${path}/create`" />
  <div class="container py-10 mx-auto">
    <!-- Show error message if any -->
    <div v-if="error" class="text-red-500 p-4">Error loading data: {{ error.message }}</div>

    <!-- Show data when loaded -->
    <DataTable v-else :columns="companyColumns" :data="listData || []" />
  </div>
</template>
