<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import AppFooter from './AppFooter.vue';
import AppSidebar from './AppSidebar.vue';
import AppTopbar from './AppTopbar.vue';

type OutsideClickListener = (event: MouseEvent) => void;

const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const outsideClickListener: Ref<OutsideClickListener | null> = ref(null);

watch(isSidebarActive, (newVal: boolean) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

const containerClass = computed(() => {
    return {
        'layout-overlay': layoutConfig.menuMode === 'overlay',
        'layout-static': layoutConfig.menuMode === 'static',
        'layout-static-inactive': layoutState.staticMenuDesktopInactive && layoutConfig.menuMode === 'static',
        'layout-overlay-active': layoutState.overlayMenuActive,
        'layout-mobile-active': layoutState.staticMenuMobileActive
    };
});

function bindOutsideClickListener(): void {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event: MouseEvent) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive = false;
                layoutState.staticMenuMobileActive = false;
                layoutState.menuHoverActive = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
}

function unbindOutsideClickListener(): void {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener.value);
        outsideClickListener.value = null;
    }
}

function isOutsideClicked(event: MouseEvent): boolean {
    const sidebarEl = document.querySelector('.layout-sidebar');
    const topbarEl = document.querySelector('.layout-menu-button');

    if (!sidebarEl || !topbarEl) {
        return true;
    }

    return !(
        sidebarEl === event.target || 
        sidebarEl.contains(event.target as Node) || 
        topbarEl === event.target || 
        topbarEl.contains(event.target as Node)
    );
}

// Clean up event listeners when component is unmounted
onBeforeUnmount(() => {
    unbindOutsideClickListener();
});
</script>

<template>
    <div class="layout-wrapper" :class="containerClass">
        <AppTopbar />
        <AppSidebar />
        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>
        <div class="layout-mask animate-fadein" />
    </div>
</template>

