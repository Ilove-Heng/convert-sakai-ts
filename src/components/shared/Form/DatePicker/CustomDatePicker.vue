<template>
  <DatePicker
    v-model="selectedDate"
    :maxDate="maxDate"
    showIcon
    fluid
    showButtonBar
    dateFormat="dd/mm/yy"
    placeholder="Basic"
    iconDisplay="input"
    class="h-[42px]"
  >
    <template #buttonbar="{ todayCallback }">
      <div class="flex justify-end w-full">
        <Button
          size="small"
          :label="$t('form.today')"
          @click="todayCallback"
          variant="outlined"
        />
      </div>
    </template>
  </DatePicker>
</template>
<script setup lang="ts">
// init state/data
const selectedDate = defineModel<Date | null>({
  default: new Date(),
});
// Set max date to today (disables future dates)
const maxDate = ref(new Date());
</script>
