<template>
    <!-- <pre>{{ groupTime }}</pre> -->
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
  seryId?: number | null
}>(); 

const selectedGroupTime = defineModel<SeriesTime | null>({
    default: null
});

const { groupTime, isLoading: isLoadingGroupTime } = useGroupTime(toRef(() => props.seryId));

// Auto-select first item when data loads or changes
watch(groupTime, (newGroupTime) => {
  if (newGroupTime && newGroupTime.length > 0) {
    selectedGroupTime.value = newGroupTime[0] || null;
  } else {
    selectedGroupTime.value = null;
  }
}, { immediate: true });
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