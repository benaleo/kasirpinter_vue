// hooks/useSupabaseFetch.ts
import { ref, watchEffect } from 'vue';
import { supabase } from '@/lib/supabaseClient.ts'

type FetchOptions = {
  table: string;
  columns?: string;
  filter?: {
    column: string;
    operator: string;
    value: any;
  }[];
  order?: {
    column: string;
    options?: { ascending?: boolean; nullsFirst?: boolean };
  };
  limit?: number;
  single?: boolean;
};

export function useSupabaseFetch<T>(options: FetchOptions) {
  const data = ref<T | null>(null);
  const error = ref<any>(null);
  const isLoading = ref(false);
  const count = ref<number | null>(null);

  const executeQuery = async () => {
    try {
      isLoading.value = true;
      error.value = null;

      let query = supabase
        .from(options.table)
        .select(options.columns || '*', options.filter ? { count: 'exact' } : undefined);

      // Apply filters if they exist
      if (options.filter) {
        options.filter.forEach(({ column, operator, value }) => {
          query = query.filter(column, operator, value);
        });
      }

      // Apply ordering if specified
      if (options.order) {
        query = query.order(options.order.column, options.order.options);
      }

      // Apply limit if specified
      if (options.limit) {
        query = query.limit(options.limit);
      }

      const { data: responseData, error: responseError, count: responseCount } = await query;

      if (responseError) {
        throw responseError;
      }

      data.value = options.single ? (responseData?.[0] as T) : (responseData as T);
      count.value = responseCount || null;
    } catch (err) {
      error.value = err;
      console.error('Supabase fetch error:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // Automatically execute the query when options change
  watchEffect(() => {
    executeQuery();
  });

  // Expose a refresh function in case manual refresh is needed
  const refresh = () => {
    executeQuery();
  };

  return { data, error, isLoading, count, refresh };
}
