<script setup lang="ts">
import { useLayout } from '@/layout/composables/layout';
import AppConfigurator from './AppConfigurator.vue';

const { toggleMenu, toggleDarkMode, isDarkTheme } = useLayout();
</script>

<template>
    <div class="layout-topbar">
        <div class="layout-topbar-logo-container">
            <button class="layout-menu-button layout-topbar-action" @click="toggleMenu">
                <i class="pi pi-bars"></i>
            </button>
            <router-link to="/" class="layout-topbar-logo">
                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Dashboard background -->
                    <rect x="4" y="8" width="56" height="48" rx="4" fill="#f0f4f8" stroke="#4F46E5" stroke-width="2" />

                    <!-- Header bar -->
                    <rect x="4" y="8" width="56" height="12" rx="4" fill="#4F46E5" />
                    <circle cx="12" cy="14" r="2" fill="#ffffff" />
                    <circle cx="18" cy="14" r="2" fill="#ffffff" />
                    <circle cx="24" cy="14" r="2" fill="#ffffff" />

                    <!-- Lottery balls -->
                    <circle cx="18" cy="35" r="7" fill="#EF4444" stroke="#991B1B" stroke-width="1.5" />
                    <text x="18" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ffffff"
                        text-anchor="middle">7</text>

                    <circle cx="32" cy="35" r="7" fill="#3B82F6" stroke="#1E40AF" stroke-width="1.5" />
                    <text x="32" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ffffff"
                        text-anchor="middle">23</text>

                    <circle cx="46" cy="35" r="7" fill="#10B981" stroke="#047857" stroke-width="1.5" />
                    <text x="46" y="38" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#ffffff"
                        text-anchor="middle">42</text>

                    <!-- Ticket icon -->
                    <rect x="10" y="46" width="16" height="8" rx="1" fill="#ffffff" stroke="#4F46E5" stroke-width="1.5"
                        stroke-dasharray="2,2" />
                    <circle cx="13" cy="50" r="1" fill="#4F46E5" />
                    <circle cx="17" cy="50" r="1" fill="#4F46E5" />
                    <circle cx="21" cy="50" r="1" fill="#4F46E5" />

                    <!-- Chart bars -->
                    <rect x="32" y="52" width="4" height="6" rx="1" fill="#8B5CF6" />
                    <rect x="38" y="48" width="4" height="10" rx="1" fill="#8B5CF6" />
                    <rect x="44" y="50" width="4" height="8" rx="1" fill="#8B5CF6" />
                    <rect x="50" y="46" width="4" height="12" rx="1" fill="#8B5CF6" />

                    <!-- Sparkle effects -->
                    <path d="M52 28 L53 30 L55 31 L53 32 L52 34 L51 32 L49 31 L51 30 Z" fill="#FCD34D" />
                    <path d="M14 24 L14.5 25 L15.5 25.5 L14.5 26 L14 27 L13.5 26 L12.5 25.5 L13.5 25 Z"
                        fill="#FCD34D" />
                </svg>

                <span class="!font-battambang">Result</span>
            </router-link>
        </div>

        <div class="layout-topbar-actions">
            <div class="layout-config-menu">
                <button type="button" class="layout-topbar-action" @click="toggleDarkMode">
                    <i :class="['pi', { 'pi-moon': isDarkTheme, 'pi-sun': !isDarkTheme }]"></i>
                </button>
                <div class="relative">
                    <button
                        v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
                        type="button" class="layout-topbar-action layout-topbar-action-highlight">
                        <i class="pi pi-palette"></i>
                    </button>
                    <AppConfigurator />
                </div>
            </div>

            <button
                class="layout-topbar-menu-button layout-topbar-action"
                v-styleclass="{ selector: '@next', enterFromClass: 'hidden', enterActiveClass: 'animate-scalein', leaveToClass: 'hidden', leaveActiveClass: 'animate-fadeout', hideOnOutsideClick: true }"
            >
                <i class="pi pi-ellipsis-v"></i>
            </button>

            <div class="layout-topbar-menu hidden lg:block">
                <div class="layout-topbar-menu-content">
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-calendar"></i>
                        <span>Calendar</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-inbox"></i>
                        <span>Messages</span>
                    </button>
                    <button type="button" class="layout-topbar-action">
                        <i class="pi pi-user"></i>
                        <span>Profile</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
