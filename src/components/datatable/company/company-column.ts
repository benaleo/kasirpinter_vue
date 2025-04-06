import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ProductCategoryDropdown from '@/components/datatable/product-category/ProductCategoryDropdown.vue'
import type { CompanyType } from '@/types/CompanyType.ts'

export const companyColumns: ColumnDef<CompanyType>[] = [
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
    accessorKey: 'sub', // Akses nested property
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
    cell: ({ row }) => {
      const sub = row.original.sub
      const subNames = sub ? sub.map(s => s.name).join(', ') : 'N/A'
      return h('div', { class: 'lowercase' }, subNames)
    },
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
