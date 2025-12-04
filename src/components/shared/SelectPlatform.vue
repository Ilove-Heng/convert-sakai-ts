<template>
  <Select
    v-model="selectedPlatform"
    :options="platforms"
    :loading="isLoadingPlatform"
    optionLabel="platform_name"
    placeholder="Select a Platform"
    class=" flex items-center h-[42px] select-platform-container"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        <Chip icon="pi pi-sort-alpha-down" class="mr-3" />
        <div>{{ slotProps.value.platform_name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center">
        <Chip icon="pi pi-sort-alpha-down" class="mr-3" />
        <div>{{ slotProps.option.platform_name }}</div>
      </div>
    </template>
    <template #dropdownicon>
      <i class="pi pi-sitemap" />
    </template>
    <template #header>
      <div class="font-bold p-3">ក្រុមហ៊ុន</div>
    </template>
  </Select>
</template>

<script setup lang="ts">
import type { Platform } from "@/api";
import { usePlatforms } from "@/composables/queries/usePlatforms";

// init props
const props = defineProps<{
  disableAutoSelect?: boolean;
}>()

// init state/data
const selectedPlatform = defineModel<Platform | null>({
  default: null,
});
const { platforms, isLoading: isLoadingPlatform } = usePlatforms();

// Track if component has been initialized
const hasInitialized = ref(false);

// Auto-select first post order when data loads
watch(platforms, (newPlatforms) => {
  if (newPlatforms &&newPlatforms.length && !selectedPlatform.value && !props.disableAutoSelect && hasInitialized.value) {
    selectedPlatform.value = newPlatforms[0] || null;
  }
}, { immediate: false })

onMounted(() => {
  // Mark as initialized after mount
  setTimeout(() => {
    hasInitialized.value = true;
  }, 800);
});
</script>

<style lang="scss">
.select-platform-container {
  .p-chip {
    background-color: #CCC9E7;
  }
  .p-chip-icon {
    color: black;
  }
}
</style>
