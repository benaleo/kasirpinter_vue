import {useSupabaseFetch} from '@/hook/useSupabaseFetch.ts'
import type {CompanyCreateUpdateType, CompanyType,} from '@/types/CompanyType.ts'
import {supabase} from '@/lib/supabaseClient.ts'

interface FetchAllResponse {
    listData: CompanyType[]
    isLoading: boolean
    error: any
}

interface FetchIdResponse {
    detailData: CompanyType | null
    isLoading: boolean
    error: any
}

// For functions that don't use hooks (can be used outside React components)
async function fetchAllDirect(isParent?: boolean): Promise<CompanyType[]> {
    const {data, error} = await supabase
        .from('companies')
        .select('*, sub:companies(id, name)')
        .filter("is_parent", 'eq', isParent ? isParent : true)
        .order('created_at', {ascending: false})
        .limit(10)

    if (error) throw error
    return data || []
}

async function fetchIdDirect(id: string): Promise<CompanyType | null> {
    const {data, error} = await supabase
        .from('companies')
        .select('*, sub:companies(id, name)')
        .eq('id', id)
        .single()

    if (error) throw error
    return data
}

async function save(data: CompanyCreateUpdateType): Promise<CompanyType> {
    const {data: insertData, error} = await supabase
        .from('companies')
        .insert(data)
        .select()
        .single()

    if (error) throw error
    return insertData
}

async function update(
    id: string,
    data: CompanyCreateUpdateType,
): Promise<CompanyType> {
    const {data: updateData, error} = await supabase
        .from('companies')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error
    return updateData
}

async function remove(id: string): Promise<void> {
    const {error} = await supabase.from('companies').delete().eq('id', id)

    if (error) throw error
}

// Hook version for use in React components
export function useCompany() {
    function fetchAll(isParent?: boolean): FetchAllResponse {
        const filter = isParent === undefined ? [] : [{column: 'is_parent', operator: 'eq', value: isParent}]

        const {data, isLoading, error} = useSupabaseFetch<CompanyType>({
            table: 'companies',
            order: {column: 'created_at', options: {ascending: false}},
            filter,
            limit: 10,
            select: '*, sub:companies(id, name)',
        })

        return <FetchAllResponse>{
            listData: data ? data : [],
            isLoading: isLoading.value,
            error,
        }
    }

    function fetchId(id: string): FetchIdResponse {
        const {data, isLoading, error} = useSupabaseFetch<CompanyType>({
            table: 'companies',
            filter: [{column: 'id', operator: 'eq', value: id}],
            limit: 1,
            select: '*, sub:companies(id, name)',
            single: true,
        })

        return {
            detailData: data.value ? (data.value as CompanyType) : null,
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
