<script setup lang="ts">
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
import { useToast } from 'primevue/usetoast';
import { setToastService } from '@/api/http/client';

// Initialize toast service for HTTP client
const toast = useToast();
setToastService(toast);
</script>

<template>
    <Toast position="top-right" group="br"/>
    <router-view />
    <VueQueryDevtools />
</template>

<style lang="scss">
@use "@/assets/layout/layout" as *;
</style>
