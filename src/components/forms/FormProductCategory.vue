<script setup lang="ts">
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { toast } from 'vue-sonner';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';
import { useAuth } from '@/services/AuthService.ts';
import FormText from '@/components/elements/form/FormText.vue';
import { useProductCategory } from '@/services/ProductCategoryService.ts';
import type { ProductCategoryCreateUpdateType } from '@/types/ProductCategoryType.ts';
import { useSelect } from '@/services/SelectService.ts';
import FormSelect from '@/components/elements/form/FormSelect.vue';
import { ref, watch } from 'vue';
import type { SelectOption } from '@/types/SelectOption.ts';

const formSchema = toTypedSchema(
    z.object({
      name: z.string().min(3, 'Nama harus minimal 3 karakter').max(255),
      company_id: z.string().min(1, 'Perusahaan harus dipilih'),
    })
);

const { handleSubmit, setFieldValue, setValues, errors } = useForm({
  validationSchema: formSchema,
  initialValues: {
    name: '',
    company_id: '',
  },
});

const isCreateMore = ref(false)

const productCategoryService = useProductCategory();
const authService = useAuth();
const userId = authService.user.value?.id || '';

const listData = useSelect().selectCompany(false);


const onSubmit = handleSubmit(async (formValues) => {
  try {
    const data: ProductCategoryCreateUpdateType = {
      name: formValues.name,
      company_id: String(formValues.company_id),
      user_id: userId,
    };

    console.log('Submitting form with data:', data);

    await productCategoryService.save(data);
    toast.success('Kategori produk berhasil disimpan');
    if (isCreateMore.value){
      setValues({
        name: '',
        company_id: '',
      });
    } else {
      window.location.href = '/v1/product-category';
    }
  } catch (error: any) {
    console.error('Form submission error:', error);
    toast.error(error.message || 'Gagal menyimpan kategori produk');

  }
});
</script>

<template>
  <h2 class="mb-8">Tambah Kategori Produk</h2>
  <form @submit.prevent="onSubmit" class="w-full flex flex-col gap-4">
    <div class="flex flex-col gap-4">
      <FormText
          name="name"
          label="Nama Kategori"
          placeholder="Masukan nama kategori produk"
          :error="errors.name"
      />

      <FormSelect
          :data="listData.listData"
          name="company_id"
          label="Perusahaan"
          placeholder="Pilih perusahaan"
          :error="errors.company_id"
          @update:modelValue="(value: string) => setFieldValue('company_id', String(value))"
      />
      <div class="flex gap-2">
        <input type="checkbox" name="is-create-more" id="is-create-more" v-model="isCreateMore" />
        <label for="is-create-more" class="text-sm">Tambahkan lagi?</label>
      </div>
    </div>

    <div class="flex items-center justify-between">
      <Button type="button" @click="$router.push('/v1/product-category')" class="mt-4" variant="secondary">
        Kembali
      </Button>
      <Button type="submit" class="mt-4" variant="add">
        Simpan
      </Button>
    </div>
  </form>
</template>