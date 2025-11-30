<template>
  <div class="card">
    <BaseBreadcrumb :title="page.title" />
    <p>Use this page to start from scratch and place your custom content.</p>
    <div v-if="isLoadingTrackingReport" class="text-center">
      <i class="pi pi-spin pi-spinner text-5xl text-blue-600 mb-4"></i>
      <p class="text-lg text-gray-600 font-medium">Loading user data...</p>
    </div>
    <div class="text-center">
      <pre>{{ series }}</pre>
      <!-- <pre>{{ groupTime }}</pre> -->
       <pre>{{ postOrders }}</pre>
      <!-- <pre>
                {{ trackingReportInfo }}
            </pre
      > -->
    </div>
  </div>
</template>
<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useTrackingReport } from "@/composables/queries/useTrackingReport";
import { useGroupTime, useSeries } from "@/composables/queries/useSeries";
import { usePostOrders } from "@/composables/queries/usePostOrders";
import type { TrackingReportRequest } from "@/api";
import { useI18n } from "vue-i18n";


const bodyRequest = ref<TrackingReportRequest>({
  sery_id: 1,
  group_time_id: 5,
  sery_time_id: 7,
  platform_id: 1,
  post_order: 1,
  check_win_number: 0,
  date: "2025-11-29",
});

const { series, isLoading: isLoadingSeries } = useSeries();
const { postOrders } = usePostOrders();

const { groupTime, isLoading: isLoadingGroupTime } = useGroupTime(1);
const { trackingReportInfo, isLoading: isLoadingTrackingReport } = useTrackingReport(bodyRequest.value);
const { t } = useI18n();
const page = ref({ title: t("page.tracking_report") });
</script>
