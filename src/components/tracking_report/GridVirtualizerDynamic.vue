<template>
    <div ref="parentRef" style="overflow-y: auto;" class="grid-virtualizer-dynamic-container">
    <div
      :style="{
        height: `${totalSize}px`,
        position: 'relative',
        
      }"
    >
      <template v-for="virtualRow in virtualRows" :key="virtualRow.key">
        <div
          :data-index="virtualRow.index"
          :ref="measureElement"
          :style="{
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translateY(${virtualRow.start - rowVirtualizer.options.scrollMargin}px)`,
            display: 'flex',
          }"
        >
          <div :style="{ width: `${width[0]}px` }" />
          <div
            v-for="(virtualColumn, index) in virtualColumns"
            :key="index"
            :style="{
              minHeight: virtualRow.index === 0 ? 50 : virtualRow.size,
              width: '100%',
            }"
            class="flex items-center justify-center mr-2"
          >
            <div v-if="virtualRow.index === 0" class="flex flex-col" 
            style="width: 280px;"
            
            >
              <!-- this is for post name -->
                <div 
                v-if="searchPostNameIndex !==  virtualColumn.index"
                @click="toggleEditMode(virtualColumn.index)"
                class="flex h-11 items-center text-blue-600 rounded-t-md w-full justify-center font-bold text-lg bg-[#B6D6CC] Roboto">
                  {{ reactiveColumns[virtualColumn.index].post_name }}
              </div>

              <InputText 
              v-else 
              type="text" 
              @blur="toggleEditMode(null)"
              v-model="searchNumber"
              @update:model-value="searchNumberInPostByName( reactiveColumns[virtualColumn.index].post_name)"
              @click:clear="clearSearchNumber"
              placeholder="Search here..."
              :maxlength="3"
              autofocus
              class="h-11"
              />

              <div class="flex w-auto h-full bg-[#E9F1F7]">
                <!-- 2D -->
                <div class="border-l! border-gray-300 h-full w-full">
                  <div class="h-14 flex items-center justify-between border-b! border-gray-300 ">
                    <div class="flex items-center justify-center h-full pl-3 text-xl font-bold text-gray-900 Roboto">
                      <div class="text-[16px] font-bold bg-gray-300 px-1.5 py-0.5 rounded-full">
                        2D
                      </div>
                    </div>
                    <!-- split total / odds amount -->
                     <div class="flex flex-col items-end justify-center h-full mr-2">
                        <span class=" text-[16px] font-bold whitespace-nowrap text-gray-950 Roboto">
                          {{ numberFormat(reactiveColumns[virtualColumn.index].posts[0].max_amount) }}
                        </span>
                        <span class="border-t! border-gray-400 border-dotted w-full text-right  text-[16px] font-bold text-blue-800 Roboto whitespace-nowrap">
                          {{ numberFormat(reactiveColumns[virtualColumn.index].posts[0].max_total_amount) }}
                        </span>
                     </div> 
                  </div>
                </div>

                <!-- 3D -->
                <div class="border-l! border-gray-300 h-full w-full">
                  <div class="h-14 flex items-center justify-between border-b! border-gray-300 ">
                    <div class="flex items-center justify-center h-full pl-3 text-xl font-bold text-gray-900 Roboto">
                      <div class="text-[16px] font-bold bg-gray-300 px-1.5 py-0.5 rounded-full">
                        3D
                      </div>
                    </div>
                    <!-- split total / odds amount -->
                     <div class="flex flex-col items-end justify-center h-full mr-2">
                        <span class=" text-[16px] font-bold whitespace-nowrap text-gray-950 Roboto">
                           {{ numberFormat(reactiveColumns[virtualColumn.index].posts[1].max_amount) }}
                        </span>
                        <span class="border-t! border-gray-400 border-dotted w-full text-right  text-[16px] font-bold text-blue-800 Roboto whitespace-nowrap">
                          {{ numberFormat(reactiveColumns[virtualColumn.index].posts[1].max_total_amount) }}
                        </span>
                     </div> 
                  </div>
                </div>
              </div>
            </div>

            <!-- Modified v-else section for separated number types -->
            <div 
            v-else 
            class="w-full number-detail-container flex" 
            style="width: auto;"
            >
              <!-- 2D Column - match the header width -->
              <div
              @click="handleNumberBetDetails(getNumberForType(virtualColumn.index, virtualRow.index - 1, 2), NumberTypeEnum.TWO, reactiveColumns[virtualColumn.index].post_id, reactiveColumns[virtualColumn.index].post_name)"
              class="cursor-pointer  h-full flex items-center justify-center hover:bg-gray-100" 
              style="width: 140px;"
              >
                <div class="flex justify-between items-center h-9 text-sm  w-full px-3 gap-3 number-type-2-classes" v-if="getNumberForType(virtualColumn.index, virtualRow.index - 1, 2).length > 0">
                  <span
                    :class="{
                      'bg-[#fac5bf] text-[#333]' : getIsWinForType(virtualColumn.index, virtualRow.index - 1, 2)
                    }"
                  class="p-1 rounded-full bg-[#29339B] text-white text-[14px] text-center px-2 select-none font-bold Roboto">{{ getNumberForType(virtualColumn.index, virtualRow.index - 1, 2) }}</span>
                  <span  
                    class="text-[16px] text-gray-700 font-bold Roboto"
                    :class="{
                      'bg-[#fac5bf]' : getIsWinForType(virtualColumn.index, virtualRow.index - 1, 2)
                    }"
                    >{{ numberFormat(getAmountForType(virtualColumn.index, virtualRow.index - 1, 2)) }}
                  </span>
                </div>
              </div>

              <!-- 3D Column - match the header width -->
              <div 
              @click="handleNumberBetDetails(getNumberForType(virtualColumn.index, virtualRow.index - 1, 3), NumberTypeEnum.THREE, reactiveColumns[virtualColumn.index].post_id, reactiveColumns[virtualColumn.index].post_name)"
              class="cursor-pointer  h-full flex items-center justify-center hover:bg-gray-100"
              style="width: 140px;"

              >
                <div class="flex justify-between items-center h-9 text-sm  w-full px-3 gap-3 number-type-3-classes" v-if="getNumberForType(virtualColumn.index, virtualRow.index - 1, 3).length > 0">
                  <span 
                        class="p-1 rounded-sm bg-[#B6D6CC] text-black text-[14px] text-center px-2 font-bold Roboto"
                        :class="{
                          'bg-[#fac5bf] text-[#333]' : getIsWinForType(virtualColumn.index, virtualRow.index - 1, 3)
                        }"
                        >
                        {{ getNumberForType(virtualColumn.index, virtualRow.index - 1, 3) }}
                      </span>
                  <span 
                    class="text-[16px] text-gray-700 font-bold Roboto"
                    :class="{
                      'bg-[#fac5bf]' : getIsWinForType(virtualColumn.index, virtualRow.index - 1, 3)
                    }"    
                  >
                  {{ numberFormat(getAmountForType(virtualColumn.index, virtualRow.index - 1, 3)) }}
                </span>
                </div>
              </div>
            </div>
          </div>
          <div :style="{ width: `${width[1]}px` }" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TrackingReportInfo } from '@/api';
import { generateData } from './generateData';

// plugin
import { useVirtualizer, useWindowVirtualizer } from '@tanstack/vue-virtual';
import { NumberTypeEnum } from '@/enums/globalEnum';
import { numberFormat } from '@/utils/helpers/formatNumber';

interface GridVirtualizerDynamicProps {
    trackingReportInfo: TrackingReportInfo |  any
}

const emit = defineEmits<{
  numberBetDetails: [data: {
    number: string;
    numberTypeId: number;
    postId: number;
    postName: string;
  }],
  numberBetSearch: [data: {
    searchNumber: string;
    postName: string;
  }],
  numberBetClearSearch: []
}>();

 const props = withDefaults(defineProps<GridVirtualizerDynamicProps>(),{});


 // Make data reactive by using computed
 const reactiveData = computed(() => {
    return generateData(props.trackingReportInfo);
 })

 // Extract reactive columns and virtualizedData
const reactiveColumns = computed<any[]>(() => reactiveData.value.columns);
const virtualizedData = computed(() => reactiveData.value.virtualizedData);

// init state/data
const parentRef = ref<HTMLElement | null>(null);
const parentOffsetRef = ref(0);
const searchPostNameIndex = ref<number | null>(null);
const searchNumber = ref<string>("");

// Make virtualizer options reactive
const rowVirtualizerOptions = computed(() => ({
  count: virtualizedData.value.length,
  estimateSize: () => 350,
  overscan: 5,
  scrollMargin: parentOffsetRef.value
}));

// Create virtualizer with reactive options
const rowVirtualizer = useWindowVirtualizer(rowVirtualizerOptions);

// reactive virtualizer items
const virtualRows = computed(() => rowVirtualizer.value.getVirtualItems());
const totalSize = computed(() => rowVirtualizer.value.getTotalSize());

const getColumnWidth = (index: number) => {
  const column = reactiveColumns.value[index];
  return column?.width || 400; // fallback width
};

const columnVirtualizerOptions = computed(() => ({
  horizontal: true,
  count: reactiveColumns.value.length,
  getScrollElement: () => parentRef.value,
  estimateSize: getColumnWidth,
  overscan: 5
}));

const columnVirtualizer = useVirtualizer(columnVirtualizerOptions);

const virtualColumns = computed<any[]>(() => columnVirtualizer.value.getVirtualItems());

const width = computed(() => {
  return virtualColumns.value.length > 0
    ? [
        virtualColumns.value[0].start, 
        columnVirtualizer.value.getTotalSize() - virtualColumns.value[virtualColumns.value.length - 1].end
      ]
    : [0, 0];
});

const measureElement = (el: any) => {
  if (!el) return;
  rowVirtualizer.value.measureElement(el);
  return undefined;
};

// Watch for data changes and update virtualizers
watch(
  () => props.trackingReportInfo,
  async () => {
    await nextTick();
    // Force remeasure all elements when data changes 
    rowVirtualizer.value.measure();
    columnVirtualizer.value.measure();
  }, 
  {
    deep: true
  }
);


// Helper functions using reactive data
function getNumberForType(columnIndex: number, rowIndex: number, numberTypeId: number): string {
  const column = reactiveColumns.value[columnIndex];
  if (!column?.posts) return '';

  const post = column.posts.find((p: any) => p.number_type_id === numberTypeId);
  if (!post?.numbers?.[rowIndex]) return '';

  return post.numbers[rowIndex].number;
}

function getAmountForType(columnIndex: number, rowIndex: number, numberTypeId: number): number | string {
  const column = reactiveColumns.value[columnIndex];
  if (!column?.posts) return '';

  const post = column.posts.find((p: any) => p.number_type_id === numberTypeId);
  if (!post?.numbers?.[rowIndex]) return '';

  return post.numbers[rowIndex].amount;
}

function getIsWinForType(columnIndex: number, rowIndex: number, numberTypeId: number): boolean {
  const column = reactiveColumns.value[columnIndex];
  if (!column?.posts) return false;

  const post = column.posts.find((p: any) => p.number_type_id === numberTypeId);
  if (!post?.numbers?.[rowIndex]) return false;

  return post.numbers[rowIndex].is_win;
}


async function handleNumberBetDetails(number: string, numberTypeId: number, postId: number, postName: string) {
  emit('numberBetDetails', {
    number,
    numberTypeId,
    postId,
    postName
  });
};

function toggleEditMode (idx: number | null) {
  searchPostNameIndex.value = idx;
  searchNumber.value = "";
};

// Debounce utility function with TypeScript
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function(this: any, ...args: Parameters<T>): void {
    const context = this;
    if (timeout) clearTimeout(timeout);
    
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
};

const debouncedEmit = debounce((searchNumber: string, postName: string) => {
  emit('numberBetSearch', {
    searchNumber,
    postName
  });
}, 300);


function searchNumberInPostByName(postName: string) {
  debouncedEmit(searchNumber.value, postName);
};

function clearSearchNumber() {
  searchNumber.value = "";
  emit('numberBetClearSearch');
};
</script>

<style scoped lang="scss">
.grid-virtualizer-dynamic-container {
	.number-type-2-classes {
		border-left: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
	}

	.number-type-3-classes {
		border-bottom: 0.5px solid #eaeaea;
		border-right: 0.5px solid #eaeaea;
		border-left: 0.5px solid #eaeaea;
	}
}
</style>