<template>
  <!-- <pre>{{ selectedGroupTime }}</pre> -->
   <!-- <pre>seryItemRequest: {{ seryItemRequest }}</pre> -->
   <!-- <pre>resultSeryRequest: {{ resultSeryRequest }}</pre> -->
  <div class="card">
    <BaseBreadcrumb :title="page.title" />

    <div class="flex flex-col md:flex-row gap-4 result-entry-container">
      <div class="md:w-1/3">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-4">
            <div class="flex flex-col grow basis-0 gap-2">
              <!-- selection sery session -->
              <SelectSery
                v-model="selectedSery"
                :disable-auto-select="hasUrlParams"
                class="shrink-0"
              />
            </div>
            <div class="flex flex-col grow basis-0 gap-2">
              <CustomDatePicker v-model="selectedDate" class="shrink-0" />
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 time-shift-list">
            <Button
              v-for="(time, index) in groupTime"
              :key="index"
              :label="time.result_time"
              @click="handleGroupTime(time)"
              :severity="selectedGroupTime === time ? 'info' : 'secondary'"
              class="text-sm md:text-base p-1 md:p-4"
            >
              <template #icon>
                <i class="pi pi-clock text-xs md:text-base"></i>
              </template>
            </Button>
          </div>
        </div>
      </div>

      <div class="md:w-2/3">
        <div class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-4">
            <div class="flex flex-col grow basis-0 gap-2">
              <div
                class="h-[42px] bg-gray-200 rounded-md flex items-center justify-between px-4"
              >
                <div class="flex items-center gap-2">
                  <span>{{ params.sery_name }}</span>
                  <Chip
                    :label="selectedGroupTime?.result_time"
                    icon="pi pi-history"
                  />
                </div>
                <div class="flex items-center gap-2">
                  <span>{{ formatter.format(selectedDate) }}</span>
                </div>
              </div>
              <div
                class="rounded-md flex flex-col w-full template-entry-result-classes"
              >
                <!-- Loading State -->
                <div v-if="isLoadingSeriesItem" class="text-center py-8">
                  <i
                    class="pi pi-spin pi-spinner text-5xl text-blue-600 mb-4"
                  ></i>
                  <p class="text-lg text-gray-600 font-medium">
                    Loading entry result data...
                  </p>
                </div>
                <div v-else>
                  <VN4h30 
                  v-if="isVN4h30"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <VN6h30 
                  v-else-if="isVN6h30"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Khmer
                  v-else-if="isKhmer"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <KhmerYouTube
                  v-else-if="isKhmerYouTube"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Hoso11h05
                  v-else-if="isHoso11h05 || isHoso13h35"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Hoso15h05
                  v-else-if="isHoso15h05"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Hoso17h05
                  v-else-if="isHoso17h05 || isHoso19h35"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Thinhnam10h30
                  v-else-if="isThinhnam10h30 || isThinhnam14h30"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Thinhnam13h30
                  v-else-if="isThinhnam13h30"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                  <Thinhnam19h30
                  v-else-if="isThinhnam19h30"
                  :seriesItem="seriesItem"
                  :seriesResult="seriesResult"
                  :seryItemRequest="seryItemRequest"
                  :isLoading="isLoadingSeriesResult"
                  @refresh="handleRefresh"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// internal imported
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";
import SelectSery from "@/components/shared/SelectSery.vue";
import CustomDatePicker from "@/components/shared/Form/DatePicker/CustomDatePicker.vue";

// external imported
import { useI18n } from "vue-i18n";

// custom plugin
import customDayjs from "@/composables/dayjs/useConfiguredDayjs";
import useTabTitleManager from "@/composables/tab-title-manager/useTabTitleManager";
import { enableCellNavigation } from "@/utils/navigate/navigable-table";
import { useSearchParams } from "@/composables/uri-params/useSearchParams";

// tanstack query imported
import { useSeriesItems, useSeriesResults } from "@/composables/queries/useSeriesItems";

// template lottery result
import VN4h30 from "@/components/template/vn/VN4h30.vue";
import VN6h30 from "@/components/template/vn/VN6h30.vue";
import Khmer from "@/components/template/khmer/Khmer.vue";
import KhmerYouTube from "@/components/template/khmer_youtube/KhmerYouTube.vue";
import Hoso11h05 from "@/components/template/hoso/Hoso11h05.vue";
import Hoso15h05 from "@/components/template/hoso/Hoso15h05.vue";
import Hoso17h05 from "@/components/template/hoso/Hoso17h05.vue";
import Thinhnam10h30 from "@/components/template/thinhnam/Thinhnam10h30.vue";
import Thinhnam13h30 from "@/components/template/thinhnam/Thinhnam13h30.vue";
import Thinhnam19h30 from "@/components/template/thinhnam/Thinhnam19h30.vue";


// type imported
import type { ResultsSeriesRequest, SeriesItemsRequest, SeriesTime, Sery } from "@/api";

const { t } = useI18n();
const { setupNavigableTable, cleanupNavigableTable } = enableCellNavigation();
const page = ref({ title: t("page.entry_result") });

// init url params
const { params } = useSearchParams({
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
    default: customDayjs().format("YYYY-MM-DD"),
    parse: (value: string) => value,
    serialize: (value: string) => String(value),
  },
  sery_name: {
    default: "ឆ្នោត​​ វៀតណាម",
    parse: (value: string) => value,
    serialize: (value: string) => String(value),
  },
});

// init state/data
const selectedSery = ref<Sery | null>(null);
const selectedGroupTime = ref<SeriesTime | null>(null);
const selectedDate = ref<Date>(customDayjs(params.value.date).toDate());

// custom format date
const formatter = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

// check exist lottery result
const isVN4h30 = computed(() => params.value.sery_id === 1 && params.value.group_time_id === 5 && params.value.sery_time_id === 7);
const isVN6h30 = computed(() => params.value.sery_id === 1 && params.value.group_time_id === 6 && params.value.sery_time_id === 8);
const isKhmer = computed(() => params.value.sery_id === 2);
const isKhmerYouTube = computed(() => params.value.sery_id === 3);
const isHoso11h05 = computed(() => params.value.sery_id === 4 && params.value.group_time_id === 3 && params.value.sery_time_id === 3);
const isHoso13h35 = computed(() => params.value.sery_id === 4 && params.value.group_time_id === 4 && params.value.sery_time_id === 4);
const isHoso15h05 = computed(() => params.value.sery_id === 4 && params.value.group_time_id === 5 && params.value.sery_time_id === 7);
const isHoso17h05 = computed(() => params.value.sery_id === 4 && params.value.group_time_id === 6 && params.value.sery_time_id === 8);
const isHoso19h35 = computed(() => params.value.sery_id === 4 && params.value.group_time_id === 7 && params.value.sery_time_id === 9);
const isThinhnam10h30 = computed(() => params.value.sery_id === 6 && params.value.group_time_id === 2 && params.value.sery_time_id === 2);
const isThinhnam13h30 = computed(() => params.value.sery_id === 6 && params.value.group_time_id === 3 && params.value.sery_time_id === 3);
const isThinhnam14h30 = computed(() => params.value.sery_id === 6 && params.value.group_time_id === 4 && params.value.sery_time_id === 4);
const isThinhnam19h30 = computed(() => params.value.sery_id === 6 && params.value.group_time_id === 6 && params.value.sery_time_id === 8);

// Check if URL has custom params (not defaults)
const route = useRoute();
const hasUrlParams = computed(() => {
  return Object.keys(route.query).length > 0;
});

// Initialize bodyRequest from URL params
const seryItemRequest = ref<SeriesItemsRequest>({
  sery_id: params.value.sery_id,
  group_time_id: params.value.group_time_id,
  sery_time_id: params.value.sery_time_id,
});

const resultSeryRequest = ref<ResultsSeriesRequest>({
  sery_id: seryItemRequest.value.sery_id,
  group_time_id: seryItemRequest.value.group_time_id,
  sery_time_id: seryItemRequest.value.sery_time_id,
  date: params.value.date,
});

// init dynamic tab title
const { setTitle } = useTabTitleManager();

// Flag to prevent watchers from firing during initialization
const isInitializing = ref(true);

// Import composables to get data for initialization
import { useSeries } from "@/composables/queries/useSeries";
import { useGroupTime } from "@/composables/queries/useSeries";

// Fetch data for initialization
const { series } = useSeries();

const { seriesItem, isLoading: isLoadingSeriesItem } = useSeriesItems(seryItemRequest);
const { seriesResult, isLoading: isLoadingSeriesResult, refetch: refetchSeriesResults } = useSeriesResults(resultSeryRequest);


// Initialize selections from URL params when data is available
watchEffect(() => {
  // Initialize Sery
  if (series.value?.length && !selectedSery.value) {
    const sery = series.value.find((s) => s.id === params.value.sery_id);
    selectedSery.value = sery || series.value[0] || null;
  }
});

// Watch for sery changes to initialize group time
const { groupTime } = useGroupTime(toRef(() => selectedSery.value?.id));

watchEffect(() => {
  if (!groupTime.value?.length || !selectedSery.value) return;

  // If we have URL params, try to find matching group time
  if (hasUrlParams.value) {
    const groupTimeItem = groupTime.value.find(
      (item) =>
        item.sery_id === params.value.sery_id &&
        item.group_time_id === params.value.group_time_id &&
        item.sery_time_id === params.value.sery_time_id
    );
    
    if (groupTimeItem) {
      selectedGroupTime.value = groupTimeItem;
      return;
    }
  }

  // If no matching group time found in URL params, select the first one for the current sery
  const firstGroupTime = groupTime.value.find(
    (item) => item.sery_id === selectedSery.value?.id
  );
  
  if (firstGroupTime && !selectedGroupTime.value) {
    selectedGroupTime.value = firstGroupTime;
  }
});


watch(selectedSery, (newVal, oldVal) => {
  if (newVal && !isInitializing.value) {
    // Reset selectedGroupTime when sery changes (but not on initial load)
    if (oldVal && oldVal.id !== newVal.id) {
      selectedGroupTime.value = null;
    }
    // init state sery item
    seryItemRequest.value.sery_id = newVal.id;

    // init sery result
    resultSeryRequest.value.sery_id = newVal.id;

    // assign params url
    params.value.sery_id = newVal.id;
    params.value.sery_name = newVal.sery_name;
    setTitle(newVal.sery_name);
  }
});

watch(selectedGroupTime, (newVal) => {
  if (newVal && !isInitializing.value) {
    // init state sery item
    seryItemRequest.value.group_time_id = newVal.group_time_id;
    seryItemRequest.value.sery_time_id = newVal.sery_time_id;

    // init state sery result
    resultSeryRequest.value.group_time_id = newVal.group_time_id;
    resultSeryRequest.value.sery_time_id = newVal.sery_time_id;

    // assign params url
    params.value.group_time_id = newVal.group_time_id;
    params.value.sery_time_id = newVal.sery_time_id;
  }
});

watch(selectedDate, (newVal) => {
  if (newVal && !isInitializing.value) {
    const formattedDate = customDayjs(newVal).format('YYYY-MM-DD');

    // init state sery result
    resultSeryRequest.value.date = formattedDate;

    // assign params url
    params.value.date = formattedDate;
  }
});


const handleRefresh = async() => { 
 await refetchSeriesResults();
};


const handleGroupTime = (seriesTimeItem: SeriesTime) => {
  selectedGroupTime.value = seriesTimeItem;
};

onMounted(() => {
  // Set title from URL params on mount
  if (params.value.sery_name) {
    setTitle(params.value.sery_name);
  } else if (selectedSery.value) {
    setTitle(selectedSery.value.sery_name);
  }

  // set params url active 
  if ( groupTime.value?.length && !selectedGroupTime.value && selectedSery.value) {
    const groupTimeItem = groupTime.value.find( (g) => g.group_time_id === params.value.group_time_id && g.sery_time_id === params.value.sery_time_id);
    selectedGroupTime.value = groupTimeItem || null;
  }
  

  // Mark initialization as complete after all child components have initialized
  // Wait longer to ensure all selections are properly set
  nextTick(() => {
    setTimeout(() => {
      isInitializing.value = false;
    }, 900);
  });

  // Setup navigable table
  setupNavigableTable();
});

onUnmounted(() => {
  cleanupNavigableTable();
});
</script>

<style lang="scss">
.result-entry-container {
  .p-chip {
    background-color: #0ea5e9;
    color: white;
    font-family: 'Roboto', sans-serif !important;
    .p-chip-icon {
      color: white;
    }
  }
  .template-entry-result-classes {
    table {
      color: black;
      border-collapse: collapse;
      width: 100%;
    }

    table th,
    table td {
      padding: 0.1em;
    }

    .labelcell {
      width: 1%;
      white-space: nowrap;
    }

    .label label {
      display: block;
      height: 100%;
      text-align: end;
      font-size: 0.9rem;
      padding-right: 10px;
    }

    table input {
      text-align: center;
      height: 25px;
      font-size: 1.5em;
      font-weight: bold;
      font-family: "Public Sans", sans-serif !important;
    }
  }
}
</style>
