import {useSupabaseFetch} from '@/hook/useSupabaseFetch.ts'
import type {SelectOption} from "@/types/SelectOption.ts";

interface FetchAllResponse {
    listData: SelectOption[]
    isLoading: boolean
    error: any
}


export function useSelect() {
    function selectCompany(isParent?: boolean): FetchAllResponse {
        const filter = isParent === undefined ? [] : [{column: 'is_parent', operator: 'eq', value: isParent}]

        const {data, isLoading, error} = useSupabaseFetch({
            table: 'companies',
            order: {column: 'name', options: {ascending: true}},
            filter,
            limit: 10,
            select: 'label:name, value:id',
        })

        return <FetchAllResponse>{
            listData: data ? data : [],
            isLoading: isLoading.value,
            error,
        }
    }


    return {
        selectCompany,
    }
}