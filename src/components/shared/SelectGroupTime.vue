<template>
     <Select
    v-model="selectedGroupTime"
    :options="groupTime"
    :loading="isLoadingGroupTime"
    optionLabel="result_time"
    placeholder="Select a GroupTime"
    class=" flex items-center h-[42px] select-group-time-container"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        <Chip  icon="pi pi-calendar-clock" class="mr-3" />

        <div>{{ slotProps.value.result_time }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center">
        <Chip  icon="pi pi-calendar-clock" class="mr-3"/>
        <div>{{ slotProps.option.result_time }}</div>
      </div>
    </template>
    <template #dropdownicon>
      <i class="pi pi-clock" />
    </template>
    <template #header>
      <div class="font-bold p-3">ពេលទាំងអស់</div>
    </template>
  </Select>
</template>

<script setup lang="ts">
import type { SeriesTime } from '@/api';
import { useGroupTime } from '@/composables/queries/useSeries';

// init state/data
const props = defineProps<{
  seryId?: number | null;
  disableAutoSelect?: boolean;
}>(); 

const selectedGroupTime = defineModel<SeriesTime | null>({
    default: null
});

const { groupTime, isLoading: isLoadingGroupTime } = useGroupTime(toRef(() => props.seryId));

// Only auto-select when user manually changes sery (not on initial load)
const hasInitialized = ref(false);

watch(groupTime, (newGroupTime) => {
  if (!newGroupTime || !newGroupTime.length) {
    return;
  }

  // If there's already a selected value, try to find and keep it
  if (selectedGroupTime.value) {
    const matchingItem = newGroupTime.find(
      (item) => 
        item.group_time_id === selectedGroupTime.value?.group_time_id &&
        item.sery_time_id === selectedGroupTime.value?.sery_time_id
    );
    
    if (matchingItem) {
      // Update with fresh data from API
      selectedGroupTime.value = matchingItem;
      return;
    }
  }

  // Auto-select first item when:
  // 1. Component has initialized AND
  // 2. No current selection (null or doesn't exist in new data) AND
  // 3. Auto-select is not disabled OR has already initialized
  if (hasInitialized.value || !props.disableAutoSelect) {
    selectedGroupTime.value = newGroupTime[0] || null;
  }
}, { immediate: false });

onMounted(() => {
  // Mark as initialized after mount
  setTimeout(() => {
    hasInitialized.value = true;
  }, 800);
});
</script>

<style lang="scss">
.select-group-time-container {
 .p-chip {
    background-color: #f15c5c;
 }
 .p-chip-icon {
    color: white;
 }
}
</style>