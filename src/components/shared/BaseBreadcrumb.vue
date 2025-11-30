<template>
    <div class="font-semibold text-xl mb-4">
        <i class="pi pi-fw pi-chevron-right"></i>
        {{ title }}
    </div>
</template>

<script setup lang="ts">
    defineProps({
        title: String
    })
</script>