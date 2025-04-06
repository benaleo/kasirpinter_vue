import { h } from 'vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import ProductCategoryDropdown
  from '@/components/elements/datatable/product-category/ProductCategoryDropdown.vue'

export type ProductCategoryType = {
  id: string,
  name: string
}

export const productCategoryColumns: ColumnDef<ProductCategoryType>[] = [
  {
    accessorKey: 'id',
    cell(props) {
      return props.getValue()
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Nama', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('name')),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return h('div', { class: 'relative' }, h(ProductCategoryDropdown, {
        payment,
        onExpand: row.toggleExpanded,
      }))
    },
  },
]
