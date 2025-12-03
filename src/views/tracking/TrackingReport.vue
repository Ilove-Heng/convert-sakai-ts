<template>
  <div class="card">
    <BaseBreadcrumb :title="page.title" />
    
    <!-- Desktop Filters (hidden on mobile) -->
    <div class="hidden lg:flex gap-2 items-center">
      <SelectPlatform v-model="selectedPlatform" class="shrink-0" />
      <SelectSery v-model="selectedSery" class="shrink-0" />
      <SelectGroupTime v-model="selectedGroupTime" :sery-id="selectedSery && selectedSery.id" class="shrink-0" />
      <SelectPostOrder v-model="selectedPostOrder" class="shrink-0" />
      <CustomDatePicker v-model="selectedDate" class="shrink-0" />
      <CustomToggleSwitch v-model="isCheckedWinNumber" class="shrink-0">
        <template v-slot:label>
          <span v-once>លេខឈ្នះ</span>
        </template>
      </CustomToggleSwitch>
      <Button 
        type="button" 
        label="ទិន្នន័យថ្មី" 
        :badge="`${countdown}s`" 
        badgeSeverity="danger" 
        variant="outlined" 
        class="shrink-0" 
        icon="pi pi-clock"
        @click="refetchTrackingReports(bodyRequest)"
      />
    </div>

    <!-- Mobile Filter Button (visible on mobile) -->
    <div class="lg:hidden mb-4">
      <Button 
        type="button" 
        label="បើកផ្ទាំងត្រង" 
        icon="pi pi-filter"
        class="w-full"
        severity="secondary"
        @click="showFilterDialog = true"
      />
    </div>

    <!-- Mobile Filter Dialog -->
    <Dialog 
      v-model:visible="showFilterDialog" 
      header="ជ្រើសរើសតម្រង"
      :style="{ width: '95vw', maxWidth: '500px' }"
      :modal="true"
      :dismissableMask="true"
      position="bottom"
      class="mobile-filter-dialog"
    >
      <div class="flex flex-col gap-4 py-2">
        <!-- Platform Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ក្រុមហ៊ុន</label>
          <SelectPlatform v-model="selectedPlatform" class="w-full" />
        </div>

        <!-- Sery Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ស៊េរី</label>
          <SelectSery v-model="selectedSery" class="w-full" />
        </div>

        <!-- Group Time Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ពេលវេលា</label>
          <SelectGroupTime 
            v-model="selectedGroupTime" 
            :sery-id="selectedSery && selectedSery.id"
            class="w-full" 
          />
        </div>

        <!-- Post Order Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ប៉ុស្តិ័លើក្រោម</label>
          <SelectPostOrder v-model="selectedPostOrder" class="w-full" />
        </div>

        <!-- Date Picker -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">កាលបរិច្ឆេទ</label>
          <CustomDatePicker v-model="selectedDate" class="w-full" />
        </div>

        <!-- Win Number Toggle -->
        <div class="flex items-center justify-between py-2 border-t border-b">
          <span class="font-medium text-sm">លេខឈ្នះ</span>
          <CustomToggleSwitch v-model="isCheckedWinNumber" />
        </div>

        <!-- Refresh Button -->
        <Button 
          type="button" 
          label="ទិន្នន័យថ្មី" 
          :badge="`${countdown}s`" 
          badgeSeverity="danger" 
          class="w-full" 
          icon="pi pi-clock"
          :loading="isLoadingTrackingReport"
          @click="handleRefresh"
        />

        <!-- Apply Button -->
        <Button 
          type="button" 
          label="អនុវត្ត" 
          icon="pi pi-check"
          class="w-full"
          @click="applyFilters"
        />
      </div>
    </Dialog>

    <!-- សាងលេខ content -->
     <div class="relative mt-2">
    <!-- Loading State -->
    <div v-if="isLoadingTrackingReport" class="text-center py-8">
      <i class="pi pi-spin pi-spinner text-5xl text-blue-600 mb-4"></i>
      <p class="text-lg text-gray-600 font-medium">Loading tracking data...</p>
    </div>
      <GridVirtualizerDynamic v-else 
      :trackingReportInfo="trackingReportInfo"
      @number-bet-search="handleNumberBetSearch"
      />
     </div>
  </div>
</template>

<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useTrackingReport } from "@/composables/queries/useTrackingReport";
import type { Platform, PostOrder, SeriesTime, Sery, TrackingReportRequest } from "@/api";
import { useI18n } from "vue-i18n";
import SelectSery from "@/components/shared/SelectSery.vue";
import SelectGroupTime from "@/components/shared/SelectGroupTime.vue";
import SelectPostOrder from "@/components/shared/SelectPostOrder.vue";
import SelectPlatform from "@/components/shared/SelectPlatform.vue";
import CustomDatePicker from "@/components/shared/Form/DatePicker/CustomDatePicker.vue";
import CustomToggleSwitch from "@/components/shared/Form/SwitchToggle/SwitchToggle.vue";
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import GridVirtualizerDynamic from "@/components/tracking_report/GridVirtualizerDynamic.vue";

const bodyRequest = ref<TrackingReportRequest>({
    "sery_id": 1,
    "group_time_id": 5,
    "sery_time_id": 7,
    "platform_id": 1,
    "post_order": 1,
    "check_win_number": 0,
    "date": "2025-11-29"
});

// init state/data
const { t } = useI18n();
const page = ref({ title: t("page.tracking_report") });
const selectedPlatform = ref<Platform | null>(null);
const selectedSery = ref<Sery | null>(null);
const selectedGroupTime = ref<SeriesTime | null>(null);
const selectedPostOrder = ref<PostOrder | null>(null);
const selectedDate = ref<Date>(new Date());
const isCheckedWinNumber = ref<boolean>(false);
const showFilterDialog = ref<boolean>(false);

const { trackingReportInfo, isLoading: isLoadingTrackingReport, countdown, refetchTrackingReports } = useTrackingReport(bodyRequest.value);

// Watchers to update bodyRequest when filters change (for desktop)
// watch([selectedPlatform, selectedSery, selectedGroupTime, selectedPostOrder, selectedDate, isCheckedWinNumber], () => {
//   if (selectedPlatform.value) bodyRequest.value.platform_id = selectedPlatform.value.id;
//   if (selectedSery.value) bodyRequest.value.sery_id = selectedSery.value.id;
//   if (selectedGroupTime.value) {
//     bodyRequest.value.group_time_id = selectedGroupTime.value.group_time_id;
//     bodyRequest.value.sery_time_id = selectedGroupTime.value.sery_time_id;
//   }
//   if (selectedPostOrder.value) bodyRequest.value.post_order = selectedPostOrder.value.id;
//   bodyRequest.value.check_win_number = isCheckedWinNumber.value ? 1 : 0;
  
//   // Format date
//   if (selectedDate.value) {
//     const year = selectedDate.value.getFullYear();
//     const month = String(selectedDate.value.getMonth() + 1).padStart(2, '0');
//     const day = String(selectedDate.value.getDate()).padStart(2, '0');
//     bodyRequest.value.date = `${year}-${month}-${day}`;
//   }
// });

const handleRefresh = () => {
  refetchTrackingReports(bodyRequest.value);
  showFilterDialog.value = false;
};

const applyFilters = () => {
  showFilterDialog.value = false;
  // Filters are already applied through watchers
};

const handleNumberBetSearch = (data: { searchNumber: string; postName: string }) => {
  const { searchNumber, postName } = data;
  console.log("👽 : postName:", postName);
  console.log("👽 : searchNumber:", searchNumber);
}
</script>

<style scoped>
/* Custom styles for mobile dialog */
:deep(.mobile-filter-dialog .p-dialog) {
  border-radius: 1rem 1rem 0 0;
}

:deep(.mobile-filter-dialog .p-dialog-content) {
  padding: 1rem;
}

/* Ensure selects are full width on mobile */
@media (max-width: 1023px) {
  :deep(.p-dropdown),
  :deep(.p-calendar) {
    width: 100% !important;
  }
}
</style>