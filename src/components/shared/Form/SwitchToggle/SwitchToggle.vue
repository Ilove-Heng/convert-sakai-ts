<template>
  <div class="flex gap-2">
    <div class="container">
      <input
        :id
        :name
        :disabled
        :checked="modelValue"
        v-model="modelValue"
        @click="$emit('click', $event)"
        @input="$emit('input', $event)"
        @change="$emit('change', $event)"
        type="checkbox"
        class="checkbox"
      />
      <label class="switch" :for="label">
        <span class="slider"></span>
      </label>
    </div>
    <label :for="label" class="flex items-center cursor-pointer select-none whitespace-nowrap Battambang">
      <slot name="label" />
    </label>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, useId } from 'vue';

interface CheckboxProps {
  label?: string;
  name?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}

const id = String(useId());
const label = id;
const name = computed(() => 'checkbox-' + id);

const props = withDefaults(defineProps<CheckboxProps>(), {
  errorMessage: ''
});

defineEmits<{
  (e: 'click', event: Event): void;
  (e: 'input', event: Event): void;
  (e: 'change', event: Event): void;
}>();

const modelValue = defineModel<boolean>({ default: false });
</script>

<style scoped>
@import url('./switch-toggle.css');
</style>
