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

// init state/data
const selectedPlatform = defineModel<Platform | null>({
  default: null,
});
const { platforms, isLoading: isLoadingPlatform } = usePlatforms();


// Auto-select first post order when data loads
watchEffect(() => {
  if (platforms.value && platforms.value.length && !selectedPlatform.value) {
    selectedPlatform.value = platforms.value[0] || null;
  }
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
