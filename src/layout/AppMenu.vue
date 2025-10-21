<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AppMenuItem from './AppMenuItem.vue';
import LogoutDialog from '@/components/layout/LogoutDialog.vue';
import { useAuth } from '@/middleware/auth';
const { removeToken } = useAuth();

// init state/data
const router = useRouter();
const logoutDialog = ref<InstanceType<typeof LogoutDialog> | null>(null);

const logout = () => {
    logoutDialog.value?.openConfirmation();
};

const handleConfirmLogout = () => {
    removeToken();
    router.push('/auth/login');
}

const model = ref([
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/dashboard' }],

    },
    {
        label: 'Operation',
        items: [
            {
                label: 'Tracking Report',
                icon: 'pi pi-fw pi-chart-scatter',
                to: '/tracking/report'
            },
            {
                label: 'Entry Result',
                icon: 'pi pi-fw pi-file-export',
                to: '/result/entry'
            },
        ]
    }
]);

</script>

<template>
    <div class="layout-menu-container">
        <ul class="layout-menu">
            <app-menu-item v-for="(item, i) in model" :key="i" :item="item" :index="i"></app-menu-item>
        </ul>
        <LogoutDialog ref="logoutDialog" @confirm="handleConfirmLogout">
            <ul class="layout-menu">
                <li class="logout-button">
                    <a @click="logout">
                        <i class="pi pi-fw pi-sign-out layout-menuitem-icon"></i>
                        <span class="layout-menuitem-text">Logout</span>
                    </a>
                </li>
            </ul>
        </LogoutDialog>
    </div>
</template>

<style lang="scss" scoped>
.layout-menu {
    height: 100%;
}

.layout-menu-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.logout-button {
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: end;
    justify-content: center;
}

.logout-button {
    a {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        outline: 0 none;
        color: red;
        cursor: pointer;
        padding: 0.75rem 1rem;
        border-radius: var(--content-border-radius);
        background-color: rgba(240, 128, 128, 0.1);
        margin-bottom: 1rem;
        width: 100%;

        &:hover {
            background-color: var(--surface-hover);
        }
    }
}
</style>
