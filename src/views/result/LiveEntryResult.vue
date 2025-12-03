<template>
    <div class="card">
         <BaseBreadcrumb :title="page.title"/>
        <p>for live result.</p>
    </div>
</template>
<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const page = ref({ title: t('page.live_entry_result') });

</script>