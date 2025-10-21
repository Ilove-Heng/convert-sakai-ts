<template>
    <div class="card">
        <div class="font-semibold text-xl mb-4">dashboard Page</div>
        <p>Use this page to start from scratch and place your custom content.</p>

        <div v-if="isLoading" class="text-center">
            <i class="pi pi-spin pi-spinner text-5xl text-blue-600 mb-4"></i>
            <p class="text-lg text-gray-600 font-medium">Loading user data...</p>
        </div>
        <div v-for="user in users" :key="user.id" class="text-center">
            {{ user.username }}
        </div>

    </div>
</template>


<script setup lang="ts">
import { useUsers } from '@/composables/queries/useUsers';

const { users, isLoading } = useUsers();
</script>