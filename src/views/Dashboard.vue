<template>
    <div class="card">
        <BaseBreadcrumb :title="page.title" />
        <p>Use this page to start from scratch and place your custom content.</p>

        <div v-if="isLoading" class="text-center">
            <i class="pi pi-spin pi-spinner text-5xl text-blue-600 mb-4"></i>
            <p class="text-lg text-gray-600 font-medium">Loading user data...</p>
        </div>
        <div v-for="user in users" :key="user.id" class="text-center">
            <p>id: {{ user.id }}</p>
            <p>username: {{ user.username }}</p>
            <p>created at: {{ user.created_at }}</p>
        </div>
    </div>
</template>


<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useUsers } from '@/composables/queries/useUsers';
import { useI18n } from "vue-i18n";

const { users, isLoading } = useUsers();
const { t } = useI18n();
const page = ref({ title: t('page.dashboard') });
</script>