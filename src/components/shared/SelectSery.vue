<template>
  <Select
    v-model="selectedSery"
    :options="series"
    :loading="isLoadingSeries"
    optionLabel="sery_name"
    placeholder="Select a Series"
    class=" flex items-center h-[42px]"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        <img
          :src="`/images/lottories/${slotProps.value.logo}`"
          class="mr-2 rounded-xs"
          :alt="slotProps.value.sery_name"
          style="width: 3rem"
        />
        <div>{{ slotProps.value.sery_name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center">
        <img
          :src="`/images/lottories/${slotProps.option.logo}`"
          class="mr-2 rounded-xs"
          :alt="slotProps.option.sery_name"
          style="width: 3rem"
        />
        <div>{{ slotProps.option.sery_name }}</div>
      </div>
    </template>
    <template #dropdownicon>
      <i class="pi pi-map" />
    </template>
    <template #header>
      <div class="font-bold p-3">សេរ៊ីទាំងអស់</div>
    </template>
  </Select>
</template>

<script setup lang="ts">
import type { Sery } from "@/api";
import { useSeries } from "@/composables/queries/useSeries";

// init props
const props = defineProps<{
  disableAutoSelect?: boolean;
}>();

// init state/data
const selectedSery = defineModel<Sery | null>({
    default: null
});

const { series, isLoading: isLoadingSeries } = useSeries();

// Track if component has been initialized
const hasInitialized = ref(false);

// Auto-select first series only if not disabled and no value exists
watch(series, (newSeries) => {
  if (newSeries?.length && !selectedSery.value && !props.disableAutoSelect && hasInitialized.value) {
    selectedSery.value = newSeries[0] || null;
  }
}, { immediate: false });

onMounted(() => {
  // Mark as initialized after mount
  setTimeout(() => {
    hasInitialized.value = true;
  }, 800);
});
</script>