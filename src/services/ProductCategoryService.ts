import { useSupabaseFetch } from '@/hook/useSupabaseFetch.ts'
import type {
  ProductCategoryCreateUpdateType,
  ProductCategoryType,
} from '@/types/ProductCategoryType.ts'
import { supabase } from '@/lib/supabaseClient.ts'

interface FetchAllResponse {
  listData: ProductCategoryType[]
  isLoading: boolean
  error: any
}

interface FetchIdResponse {
  detailData: ProductCategoryType | null
  isLoading: boolean
  error: any
}

// For functions that don't use hooks (can be used outside React components)
async function fetchAllDirect(): Promise<ProductCategoryType[]> {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*, company:companies(name)')
    .order('created_at', { ascending: false })
    .limit(10)

  if (error) throw error
  return data || []
}

async function fetchIdDirect(id: string): Promise<ProductCategoryType | null> {
  const { data, error } = await supabase
    .from('product_categories')
    .select('*, company:companies(name)')
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

async function save(data: ProductCategoryCreateUpdateType): Promise<ProductCategoryType> {
  const { data: insertData, error } = await supabase
    .from('product_categories')
    .insert(data)
    .select()
    .single()

  if (error) throw error
  return insertData
}

async function update(
  id: string,
  data: ProductCategoryCreateUpdateType,
): Promise<ProductCategoryType> {
  const { data: updateData, error } = await supabase
    .from('product_categories')
    .update(data)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return updateData
}

async function remove(id: string): Promise<void> {
  const { error } = await supabase.from('product_categories').delete().eq('id', id)

  if (error) throw error
}

// Hook version for use in React components
export function useProductCategory() {
  function fetchAll(): FetchAllResponse {
    const { data, isLoading, error } = useSupabaseFetch<ProductCategoryType>({
      table: 'product_categories',
      order: { column: 'created_at', options: { ascending: false } },
      limit: 10,
      select: '*, company:companies(name)',
    })

    return <FetchAllResponse>{
      listData: data ? data : [],
      isLoading: isLoading.value,
      error,
    }
  }

  function fetchId(id: string): FetchIdResponse {
    const { data, isLoading, error } = useSupabaseFetch<ProductCategoryType>({
      table: 'product_categories',
      filter: [{ column: 'id', operator: 'eq', value: id }],
      limit: 1,
      select: '*, company:companies(name)',
      single: true,
    })

    return {
      detailData: data.value ? (data.value as ProductCategoryType) : null,
      isLoading: isLoading.value,
      error,
    }
  }

  return {
    fetchAll,
    fetchId,
    save,
    update,
    delete: remove,
    // Direct versions for use outside components
    fetchAllDirect,
    fetchIdDirect,
  }
}
