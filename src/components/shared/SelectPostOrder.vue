<template>
  <!-- <pre>{{ postOrder }}</pre> -->
  <Select
    v-model="selectedPostOrder"
    :options="postOrder"
    :loading="isLoadingPostOrder"
    optionLabel="post_order_name"
    placeholder="Select a Post Order"
    class=" flex items-center h-[42px] select-post-order-container"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex items-center">
        <Chip icon="pi pi-sort-numeric-up-alt" class="mr-3" />

        <div>{{ slotProps.value.post_order_name }}</div>
      </div>
      <span v-else>
        {{ slotProps.placeholder }}
      </span>
    </template>
    <template #option="slotProps">
      <div class="flex items-center">
        <Chip icon="pi pi-sort-numeric-up-alt" class="mr-3" />
        <div>{{ slotProps.option.post_order_name }}</div>
      </div>
    </template>
    <template #dropdownicon>
      <i class="pi pi-sort-amount-up" />
    </template>
    <template #header>
      <div class="font-bold p-3">ប៉ុស្តិ័លើក្រោម</div>
    </template>
  </Select>
</template>

<script setup lang="ts">
import type { PostOrder } from "@/api";
import { usePostOrders } from "@/composables/queries/usePostOrders";

// init state/data
const selectedPostOrder = defineModel<PostOrder | null>({
  default: null,
});
const { postOrder, isLoading: isLoadingPostOrder } = usePostOrders();

// Auto-select first post order when data loads
watchEffect(() => {
  if (postOrder.value && postOrder.value.length && !selectedPostOrder.value) {
    selectedPostOrder.value = postOrder.value[0] || null;
  }
});
</script>

<style lang="scss">
.select-post-order-container {
  .p-chip {
    background-color: #60463B;
  }
  .p-chip-icon {
    color: white;
  }
}
</style>
