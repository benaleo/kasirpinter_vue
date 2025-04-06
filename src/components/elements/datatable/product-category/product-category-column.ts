import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ProductCategoryDropdown from '@/components/elements/datatable/product-category/ProductCategoryDropdown.vue'
import type { ProductCategoryType } from '@/types/ProductCategoryType.ts'

export const productCategoryColumns: ColumnDef<ProductCategoryType>[] = [
  {
    accessorKey: 'id',
    cell: (props) => {
      return props.row.index + 1 // Use row index + 1 for id
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Nama', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name')),
  },
  {
    accessorKey: 'company.name', // Akses nested property
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: 'ghost',
          onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        },
        () => ['Company', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })],
      )
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.original.company?.name || 'N/A'),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const item = row.original

      return h(
        'div',
        { class: 'relative' },
        h(ProductCategoryDropdown, {
          item,
          onExpand: row.toggleExpanded,
        }),
      )
    },
  },
]
