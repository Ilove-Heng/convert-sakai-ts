<template>
         <slot />
        <Dialog header="Logout" v-model:visible="displayConfirmation" :style="{ width: '350px' }" :modal="true" :dismissableMask="true">
            <div class="flex items-center flex-col">
                
                <div class="flex items-center justify-center bg-yellow-100 rounded-full w-12 h-12">
                    <i class="pi pi-exclamation-triangle text-yellow-500" style="font-size: 1.5rem"></i>
                </div>
                <div class="mt-4">
                    <p class="text-gray-500">Are you sure you want to sign out?</p>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" @click="closeConfirmation" text severity="secondary" />
                <Button label="Logout" icon="pi pi-check" @click="handleLogout" severity="danger" autofocus />
            </template>
        </Dialog>
</template>

<script setup lang="ts">
const displayConfirmation = ref(false);
const emit = defineEmits(['confirm']);

function openConfirmation() {
    displayConfirmation.value = true;
}

function closeConfirmation() {
    displayConfirmation.value = false;
}

function handleLogout() {
    emit('confirm');
    closeConfirmation();
}

defineExpose({ openConfirmation });
</script>