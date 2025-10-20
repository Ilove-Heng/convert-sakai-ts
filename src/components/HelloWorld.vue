<script setup lang="ts">
const isDark = ref(true)
</script>

<template>
  <div>    
    <h1 class="text-3xl font-bold underline mb-2">
      Hello world!
    </h1>
  </div>
   <div :class="{ 'my-app-dark': isDark }">
    <Button @click="isDark = !isDark">Toggle Dark Mode</Button>
    <div class="dark:bg-gray-900 dark:text-white p-6 my-2">
      Test dark mode!
    </div>
  </div>

    <div class="flex flex-col gap-12">
    <div class="flex gap-6 flex-wrap">
        <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-primary hover:bg-primary-emphasis text-primary-contrast font-medium flex-auto transition-colors">primary</div>
        <div class="rounded-border p-4 border border-transparent flex items-center justify-center bg-highlight hover:bg-highlight-emphasis font-medium flex-auto transition-colors">highlight</div>
        <div class="rounded-border p-4 border border-surface flex items-center justify-center text-muted-color hover:text-color hover:bg-emphasis font-medium flex-auto transition-colors">box</div>
    </div>

     <div class="p-4 rounded-lg text-white custom-box">
        Tailwind + SCSS example
      </div>
  </div>

</template>

<style scoped lang="scss">
$primary-color: #771562;

.custom-box {
  background-color: $primary-color;
}
</style>
