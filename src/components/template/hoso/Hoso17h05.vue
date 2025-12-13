<template>
  <Form 
  ref="form"
  @submit="onFormSubmit" 
  :initial-values="initialFormValues" 
  :validation-schema="validationSchema" 
  :key="formKey"
    v-slot="{ errors, meta }" class="sery-result-entry-container">
    <table>
      <tbody>
       <!-- START post A4 -->
        <tr>
            <td class="labelcell">
              <div class="label">
                <label>A </label>
              </div>
            </td>
            <td >
            <Field :name="`resultNumber.${0}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                :readonly="getNumberReadOnly(0)"
                v-bind="field" :maxlength="getNumberLength(0)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 0)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(0) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
          <td >
            <Field :name="`resultNumber.${4}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                :readonly="getNumberReadOnly(4)"
                v-bind="field" :maxlength="getNumberLength(4)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 4)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(4) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
        </tr>

        <tr>
            <td></td>
            <td >
            <Field :name="`resultNumber.${1}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                 :readonly="getNumberReadOnly(1)"
                v-bind="field" :maxlength="getNumberLength(1)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 1)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(1) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
          <td >
            <Field :name="`resultNumber.${5}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                 :readonly="getNumberReadOnly(5)"
                v-bind="field" :maxlength="getNumberLength(5)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 5)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(5) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
        </tr>

        <tr>
            <td></td>
            <td >
            <Field :name="`resultNumber.${2}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                 :readonly="getNumberReadOnly(2)"
                v-bind="field" :maxlength="getNumberLength(2)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 2)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(2) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
          <td >
            <Field :name="`resultNumber.${6}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                 :readonly="getNumberReadOnly(6)"
                v-bind="field" :maxlength="getNumberLength(6)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 6)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(6) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
        </tr>

        <tr>
            <td></td>
            <td >
            <Field :name="`resultNumber.${3}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                 :readonly="getNumberReadOnly(3)"
                v-bind="field" :maxlength="getNumberLength(3)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 3)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(3) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
        </tr>
        <!-- END post A4 -->

         <!-- Posts B, C, D (indices 9-12) -->
         <tr v-for="postIndex in POST_CONFIGS" :key="`post-${postIndex.start}`">
          <td class="labelcell">
            <div class="label">
              <label>{{ getPostName(postIndex.start) }}</label>
            </div>
          </td>
          <td v-for="offset in 2" :key="`cell-${postIndex.start + offset - 1}`">
            <Field :name="`resultNumber.${postIndex.start + offset - 1}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                 :readonly="getNumberReadOnly(postIndex.start + offset - 1)"
                v-bind="field" :maxlength="getNumberLength(postIndex.start + offset - 1)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, postIndex.start + offset - 1)" />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(postIndex.start + offset - 1) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
        </tr>

        <!-- Posts 19->1 (indices 13) -->
         <tr v-for="(_, idx) in 19" :key="`post-${idx}`">
          <td class="labelcell" v-if="shouldShowLabel(13 + idx)">
            <div class="label"
            :class="{ hidden: seriesItem && seriesItem[13 + idx]?.number_type_id === 2 }"
            >
              <label :for="`index-${19 - idx}`">{{ 19 - idx }}</label>
            </div>
          </td>
          <td :class="{ hidden: seriesItem && seriesItem[13 + idx]?.number_type_id === 2 }">
            <Field :name="`resultNumber.${13 + idx}`" v-slot="{ field, errorMessage }">
              <IconField>
                <InputText 
                :readonly="getNumberReadOnly(13 + idx)"
                :id="`index-${19 - idx}`"
                v-bind="field" :maxlength="getNumberLength(13 + idx)"
                  :class="{ 'p-invalid': errorMessage }" class="w-full" v-keyfilter.num
                  @input="handleInput($event, 13 + idx)" 
                  />
                 <InputIcon
                  class="flex items-center justify-center bg-[#ededed] border border-[#1e2939] text-black! text-xs font-medium h-5 w-5 rounded-full">
                  {{ getNumberLength(13 + idx) }}
                </InputIcon>

              </IconField>
              <small v-if="errorMessage" class="p-error">{{ errorMessage }}</small>
            </Field>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Error Summary -->
    <div v-if="Object.keys(errors).length > 0" class="mt-2 p-3 bg-red-50 border border-red-200 rounded">
      <p class="text-red-600 font-semibold">Please fix the following errors:</p>
      <ul class="text-red-600 text-sm mt-1">
        <li v-for="(error, field) in errors" :key="field">{{ error }}</li>
      </ul>
    </div>

    <div v-if="errorMessage" class="mt-2 p-3 bg-red-50 border border-red-200 rounded">
      <p class="text-red-600">{{ errorMessage }}</p>
    </div>

    <div class="flex justify-end mt-3 gap-2">
      <Button severity="warn" icon="pi pi-globe" label="ទាញលិទ្ធផល" type="button" @click="handleScrapResult" />
      <Button type="submit" icon="pi pi-save" severity="info" label="រក្សាទុក" :disabled="!meta.valid || disabledSeryResult" />
    </div>
  </Form>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { Form, Field } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useMutation } from '@tanstack/vue-query';
import {
  seriesItemsService,
  type ResultSeriesItemRequest,
  type ResultsSeries,
  type SeriesItem,
  type SeriesItemsRequest
} from '@/api';

// Constants
const TOTAL_FIELDS = 32;
const POST_CONFIGS = [
  { start: 7 }, // BD
  { start: 9 }, // C
  { start: 11 }, // D
];

export interface SeryProps {
    seriesItem: SeriesItem[] | undefined | null;
    seriesResult: ResultsSeries[] | undefined | null;
    seryItemRequest: SeriesItemsRequest;
    isLoading: boolean;
}

const emit = defineEmits(['refresh']);

const props = withDefaults(defineProps<SeryProps>(), {
  seriesItem: null,
  seriesResult: null,
});


// State
const form = ref();
const errorMessage = ref('');
const resultData = ref<Map<number, { value: string; itemId: number }>>(new Map());
const disabledSeryResult = ref<boolean>(false);

// Create dynamic Zod schema based on seriesItem
const validationSchema = computed(() => {
  if (!props.seriesItem?.length) {
    return toTypedSchema(z.object({ resultNumber: z.array(z.string()) }));
  }

  const fieldSchemas: Record<string, z.ZodString> = {};

  props.seriesItem.forEach((item, index) => {
    const maxLength = item.number_type_id || 2;

    fieldSchemas[index] = z
      .string()
      .min(1, `Field ${index + 1} (${item.post_name}) is required`)
      .length(maxLength, `${item.post_name} must be exactly ${maxLength} digits`)
      .regex(/^\d+$/, `${item.post_name} must contain only numbers`);
  });

  return toTypedSchema(
    z.object({
      resultNumber: z.object(fieldSchemas)
    })
  );
});
// Update the form key to include seriesItem for better reactivity
const formKey = computed(() => {
  const resultKey = props.seriesResult?.map(r => r.result_number).join('-') || 'empty';
  const itemKey = props.seriesItem?.map(i => i.id).join('-') || 'empty';
  return `${resultKey}-${itemKey}`;
});

const initialFormValues = computed(() => {
  const resultNumbers: Record<number, string> = {};

  if (props.seriesResult?.length) {
    props.seriesResult.forEach((result, index) => {
      resultNumbers[index] = result.result_number || '';
    });
  } else {
    // Initialize empty values for all fields
    for (let i = 0; i < TOTAL_FIELDS; i++) {
      resultNumbers[i] = '';
    }
  }

  return { resultNumber: resultNumbers };
});

// Mutation
const createResultsSeriesMutation = useMutation({
  mutationFn: (bodyRequest: ResultSeriesItemRequest) =>
    seriesItemsService.createResultsSeries(bodyRequest),
   onSuccess: () => {
        // Reset form using the form reference
        if (form.value) {
            form.value.resetForm();
        }
        resultData.value.clear();
        errorMessage.value = '';
        disabledSeryResult.value = true;

        // Emit the refresh event to parent
        emit('refresh');
    },
  onError: (error: any) => {
    console.error('Creation failed:', error);
    errorMessage.value = error?.response?.data?.message || 'Invalid create result entry!';
    disabledSeryResult.value = false;
  }
});

// Helper functions
const getNumberLength = (idx: number): number => {
  return props.seriesItem?.[idx]?.number_type_id ?? 2;
};

const getNumberReadOnly = (idx: number): boolean => {
  return props.seriesResult?.[idx]?.result_number.length === getNumberLength(idx);
};

const getPostName = (idx: number): string => {
  return props.seriesItem?.[idx]?.post_name ?? '';
};

const shouldShowLabel = (idx: number): boolean => {
  if (idx === 0) return true;
  if (!props.seriesItem) return false;

  return props.seriesItem[idx]?.post_name !== props.seriesItem[13 + idx]?.post_name;
};

const handleInput = (event: Event, index: number) => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const itemId = props.seriesItem?.[index]?.id || 0;

  resultData.value.set(index, { value, itemId });

  // Disable if all items have values or if results already exist
  const allHaveValues = props.seriesItem && 
    props.seriesItem.length > 0 &&
    Array.from(resultData.value.values()).every(item => item.value.trim() !== '');
  
  disabledSeryResult.value = !allHaveValues || 
    (!!props.seriesResult && props.seriesResult.length === props.seriesItem?.length);
};

const handleScrapResult = () => {
  console.log('handle scrapping data!');
  
};

const onFormSubmit = (values: any) => {
  const resultNumbers = values.resultNumber as Record<number, string>;

  const results = Object.entries(resultNumbers)
    .filter(([_, value]) => value)
    .map(([index, value]) => {
      const idx = parseInt(index);
      const itemId = props.seriesItem?.[idx]?.id || 0;

      return {
        result_number: value,
        sery_item_id: itemId,
      };
    });

  if (results.length === 0) {
    errorMessage.value = 'Please fill in at least one field';
    return;
  }

  const request: ResultSeriesItemRequest = {
    headers: props.seryItemRequest,
    results
  };

  console.log('Submitting request:', request);
  createResultsSeriesMutation.mutate(request);
};

// For the disabled state
watchEffect(() => {
  if (props.seriesResult && props.seriesItem) {
    disabledSeryResult.value = props.seriesResult.length === props.seriesItem.length;
  }
});

// For form reset
let isInitialLoad = true;
watch(
  () => props.seriesItem,
  (newVal, oldVal) => {
    if (isInitialLoad) {
      isInitialLoad = false;
      return;
    }
    if (form.value && newVal && oldVal && JSON.stringify(newVal) !== JSON.stringify(oldVal)) {
      form.value.resetForm();
      resultData.value.clear();
    }
  },
  { deep: true }
);
</script>

<style lang="scss" scoped>
.sery-result-entry-container {
  .labelcell {
    padding: 0.5rem;
  }

  .label {
    font-weight: 600;
  }

  .p-error {
    display: block;
    margin-top: 0.25rem;
    color: #ef4444;
    font-size: 0.875rem;
  }

  .p-inputicon {
    top: 42%;
  }
}
</style>