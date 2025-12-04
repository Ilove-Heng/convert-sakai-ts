<template>
  <div class="card">
    <BaseBreadcrumb :title="page.title" />

    <!-- Desktop Filters (hidden on mobile) -->
    <div class="hidden lg:flex gap-2 items-center">
      <SelectPlatform v-model="selectedPlatform" class="shrink-0" />
      <SelectSery v-model="selectedSery" :disable-auto-select="hasUrlParams" class="shrink-0" />
      <SelectGroupTime v-model="selectedGroupTime" :disable-auto-select="hasUrlParams" :sery-id="selectedSery && selectedSery.id" class="shrink-0" />
      <SelectPostOrder v-model="selectedPostOrder" class="shrink-0" />
      <CustomDatePicker v-model="selectedDate" class="shrink-0" />
      <CustomToggleSwitch v-model="isCheckedWinNumber" class="shrink-0">
        <template v-slot:label>
          <span v-once>លេខឈ្នះ</span>
        </template>
      </CustomToggleSwitch>
      <Button type="button" label="ទិន្នន័យថ្មី" :badge="`${countdown}s`" badgeSeverity="danger" variant="outlined"
        class="shrink-0" icon="pi pi-clock" @click="refetchTrackingReports()" />
    </div>

    <!-- Mobile Filter Button (visible on mobile) -->
    <div class="lg:hidden mb-4">
      <Button type="button" label="បើកផ្ទាំងត្រង" icon="pi pi-filter" class="w-full" severity="secondary"
        @click="showFilterDialog = true" />
    </div>

    <!-- Mobile Filter Dialog -->
    <Dialog v-model:visible="showFilterDialog" header="ជ្រើសរើសតម្រង" :style="{ width: '95vw', maxWidth: '500px' }"
      :modal="true" :dismissableMask="true" position="bottom" class="mobile-filter-dialog">
      <div class="flex flex-col gap-4 py-2">
        <!-- Platform Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ក្រុមហ៊ុន</label>
          <SelectPlatform v-model="selectedPlatform" class="w-full" />
        </div>

        <!-- Sery Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ស៊េរី</label>
          <SelectSery v-model="selectedSery" :disable-auto-select="hasUrlParams" class="w-full" />
        </div>

        <!-- Group Time Select -->
        <div class="flex flex-col gap-2">
          <label class="font-medium text-sm">ពេលវេលា</label>
          <SelectGroupTime v-model="selectedGroupTime" :disable-auto-select="hasUrlParams"
            :sery-id="selectedSery && selectedSery.id" class="w-full" />
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

        <Button type="button" label="ទិន្នន័យថ្មី" :badge="`${countdown}s`" badgeSeverity="danger" class="w-full"
          icon="pi pi-clock" :loading="isLoadingTrackingReport" @click="handleRefresh" />

        <!-- Apply Button -->
        <Button type="button" label="អនុវត្ត" icon="pi pi-check" class="w-full" @click="applyFilters" />
      </div>
    </Dialog>

    <!-- សាងលេខ content -->
    <div class="relative mt-2">
      <!-- Loading State -->
      <div v-if="isLoadingTrackingReport" class="text-center py-8">
        <i class="pi pi-spin pi-spinner text-5xl text-blue-600 mb-4"></i>
        <p class="text-lg text-gray-600 font-medium">Loading tracking data...</p>
      </div>
      <div v-else-if="trackingReportInfo && !trackingReportInfo.tracking_reports.length"
      class="flex flex-col min-h-[calc(100vh-16rem)] items-center justify-center"
      >
      <img src="/images/data/no_data.svg" alt="no_data" class="w-[300px] select-none" >
      <span class="font-serif text-2xl">{{ $t('no_data') }}</span>
    </div>
      <GridVirtualizerDynamic v-else 
      :trackingReportInfo="filteredTrackingReportInfo"
      @number-bet-search="handleNumberBetSearch" />
    </div>
  </div>
</template>

<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import { useTrackingReport } from "@/composables/queries/useTrackingReport";
import type { Platform, PostOrder, SeriesTime, Sery, TrackingReportInfo, TrackingReportRequest } from "@/api";
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
import { useSearchParams } from "@/composables/uri-params/useSearchParams";
import useTabTitleManager from "@/composables/tab-title-manager/useTabTitleManager";
import customDayjs from "@/composables/dayjs/useConfiguredDayjs";

// init url params
const { params } = useSearchParams({
  platform_id: {
    default: 1,
    parse: (value: string) => Number(value),
    serialize: (value: number) => String(value),
  },
  sery_id: {
    default: 1,
    parse: (value: string) => Number(value),
    serialize: (value: number) => String(value),
  },
  group_time_id: {
    default: 5,
    parse: (value: string) => Number(value),
    serialize: (value: number) => String(value),
  },
  sery_time_id: {
    default: 7,
    parse: (value: string) => Number(value),
    serialize: (value: number) => String(value),
  },
  date: {
    default: customDayjs().format('YYYY-MM-DD'),
    parse: (value: string) => value,
    serialize: (value: string) => String(value),
  },
  post_order_id: {
    default: 1,
    parse: (value: string) => Number(value),
    serialize: (value: number) => String(value),
  },
  check_win_number: {
    default: 0,
    parse: (value: string) => Number(value),
    serialize: (value: number) => String(value),
  },
  sery_name: {
    default: "",
    parse: (value: string) => value,
    serialize: (value: string) => String(value),
  },
});

// Check if URL has custom params (not defaults)
const route = useRoute();
const hasUrlParams = computed(() => {
  return Object.keys(route.query).length > 0;
});

// Initialize bodyRequest from URL params
const bodyRequest = ref<TrackingReportRequest>({
  sery_id: params.value.sery_id,
  group_time_id: params.value.group_time_id,
  sery_time_id: params.value.sery_time_id,
  platform_id: params.value.platform_id,
  post_order: params.value.post_order_id,
  check_win_number: params.value.check_win_number,
  date: params.value.date
});

// init dynamic tab title
const { setTitle } = useTabTitleManager();

// init state/data
const { t } = useI18n();
const page = ref({ title: t("page.tracking_report") });
const selectedPlatform = ref<Platform | null>(null);
const selectedSery = ref<Sery | null>(null);
const selectedGroupTime = ref<SeriesTime | null>(null);
const selectedPostOrder = ref<PostOrder | null>(null);
const selectedDate = ref<Date>(customDayjs(params.value.date).toDate());
const isCheckedWinNumber = ref<boolean>(params.value.check_win_number === 1);
const showFilterDialog = ref<boolean>(false);
const searchQuery = ref({
  searchNumber: "",
  postName: ""
});

const { trackingReportInfo, isLoading: isLoadingTrackingReport, countdown, refetchTrackingReports } = useTrackingReport(bodyRequest);


// init filter tracking report
const filteredTrackingReportInfo = computed<TrackingReportInfo | null>(() => {
  const info = trackingReportInfo.value;
  if (!info) return null;

  const { searchNumber, postName } = searchQuery.value;

  // If no filters → return original
  if (!postName && !searchNumber) {
    return { tracking_reports: info.tracking_reports };
  }

  // 1) Which post is selected?
  const selectedPost = info.tracking_reports.find(
    (item) => item.post_name.toLowerCase() === postName.toLowerCase()
  );

  if (!selectedPost) {
    // keep layout but empty selected post
    return {
      tracking_reports: info.tracking_reports.map((p) => ({
        ...p,
        posts: p.posts.map(n => ({ ...n, numbers: [] }))
      }))
    };
  }

  // 2) Clone ALL posts (don’t remove them)
  const clonedAllPosts = info.tracking_reports.map((postBlock) => ({
    ...postBlock,
    posts: postBlock.posts.map((p) => ({
      ...p,
      numbers: [...p.numbers]
    }))
  }));

  // 3) Apply number filtering ONLY to the selected post
  if (searchNumber) {
    const numberLength = searchNumber.length; // 2D or 3D

    clonedAllPosts.forEach((block) => {
      if (block.post_name.toLowerCase() === postName.toLowerCase()) {
        block.posts = block.posts.map((item) => {
          if (item.number_type_id === numberLength) {
            return {
              ...item,
              numbers: item.numbers.filter(
                (n) => n.number === searchNumber
              )
            };
          }
          return { ...item, numbers: [] };
        });
      } else {
        // other posts remain unchanged
      }
    });
  }

  return { tracking_reports: clonedAllPosts };
});

// Flag to prevent watchers from firing during initialization
const isInitializing = ref(true);

// Import composables to get data for initialization
import { useSeries } from '@/composables/queries/useSeries';
import { useGroupTime } from '@/composables/queries/useSeries';
import { usePlatforms } from '@/composables/queries/usePlatforms';
import { usePostOrders } from '@/composables/queries/usePostOrders';

// Fetch data for initialization
const { series } = useSeries();
const { platforms } = usePlatforms();
const { postOrders } = usePostOrders();

// Initialize selections from URL params when data is available
watchEffect(() => {
  // Initialize Platform
  if (platforms.value?.length && !selectedPlatform.value) {
    const platform = platforms.value.find(p => p.id === params.value.platform_id);
    selectedPlatform.value = platform || platforms.value[0] || null;
  }

  // Initialize Sery
  if (series.value?.length && !selectedSery.value) {
    const sery = series.value.find(s => s.id === params.value.sery_id);
    selectedSery.value = sery || series.value[0] || null;
  }

  // Initialize PostOrder
  if (postOrders.value?.length && !selectedPostOrder.value) {
    const postOrder = postOrders.value.find(p => p.id === params.value.post_order_id);
    selectedPostOrder.value = postOrder || postOrders.value[0] || null;
  }
});

// Watch for sery changes to initialize group time
const { groupTime } = useGroupTime(toRef(() => selectedSery.value?.id));

watchEffect(() => {
  // Initialize GroupTime after sery is selected
  if (groupTime.value?.length && !selectedGroupTime.value && selectedSery.value) {
    const groupTimeItem = groupTime.value.find(
      g => g.group_time_id === params.value.group_time_id &&
        g.sery_time_id === params.value.sery_time_id
    );
    selectedGroupTime.value = groupTimeItem || groupTime.value[0] || null;
  }
});

// Watch individual filters separately to prevent double triggers
watch(selectedPlatform, (newVal) => {
  if (newVal && !isInitializing.value) {
    bodyRequest.value.platform_id = newVal.id;
    params.value.platform_id = newVal.id;
  }
});

watch(selectedSery, (newVal, oldVal) => {
  if (newVal && !isInitializing.value) {
    // Reset selectedGroupTime when sery changes (but not on initial load)
    if (oldVal && oldVal.id !== newVal.id) {
      selectedGroupTime.value = null;
    }

    bodyRequest.value.sery_id = newVal.id;
    params.value.sery_id = newVal.id;
    params.value.sery_name = newVal.sery_name;
    setTitle(newVal.sery_name);
  }
});

watch(selectedGroupTime, (newVal) => {
  if (newVal && !isInitializing.value) {
    bodyRequest.value.group_time_id = newVal.group_time_id;
    bodyRequest.value.sery_time_id = newVal.sery_time_id;
    params.value.group_time_id = newVal.group_time_id;
    params.value.sery_time_id = newVal.sery_time_id;
  }
});

watch(selectedPostOrder, (newVal) => {
  if (newVal && !isInitializing.value) {
    bodyRequest.value.post_order = newVal.id;
    params.value.post_order_id = newVal.id;
  }
});

watch(selectedDate, (newVal) => {
  if (newVal && !isInitializing.value) {
    const formattedDate = customDayjs(newVal).format('YYYY-MM-DD');
    bodyRequest.value.date = formattedDate;
    params.value.date = formattedDate;
  }
});

watch(isCheckedWinNumber, (newVal, oldVal) => {
  // Only update if it's not the initial value and value actually changed
  if (!isInitializing.value && newVal !== oldVal) {
    const winNumberId = newVal ? 1 : 0;
    bodyRequest.value.check_win_number = winNumberId;
    params.value.check_win_number = winNumberId;
  }
});

const handleRefresh = () => {
  refetchTrackingReports();
  showFilterDialog.value = false;
};

const applyFilters = () => {
  showFilterDialog.value = false;
  refetchTrackingReports();
};

const handleNumberBetSearch = (data: { searchNumber: string; postName: string }) => {
  const { searchNumber, postName } = data;
  console.log("👽 : postName:", postName);
  console.log("👽 : searchNumber:", searchNumber);
  searchQuery.value = { searchNumber, postName };
}

onMounted(() => {
  // Set title from URL params on mount
  if (params.value.sery_name) {
    setTitle(params.value.sery_name);
  } else if (selectedSery.value) {
    setTitle(selectedSery.value.sery_name);
  }

  // Mark initialization as complete after all child components have initialized
  // Wait longer to ensure all selections are properly set
  nextTick(() => {
    setTimeout(() => {
      isInitializing.value = false;
    }, 900);
  });
})
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