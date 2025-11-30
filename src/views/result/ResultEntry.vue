<template>
    <div class="card">
        <BaseBreadcrumb :title="page.title" />

        <div class="flex flex-col md:flex-row gap-4">
            <div class="md:w-1/3">
                <div class=" flex flex-col gap-4">
                    <div class="flex flex-wrap gap-4">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name2">វើសសេរ៊ី</label>
                            <!-- selection session -->
                            <Select v-model="selectedCountry" :options="countries" optionLabel="name"
                                placeholder="Select a Series" class="w-full flex items-center h-[42px]">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex items-center">
                                        <img :alt="slotProps.value.label"
                                            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                            :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                                            style="width: 18px" />
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex items-center">
                                        <img :alt="slotProps.option.label"
                                            src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                                            :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                                            style="width: 18px" />
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                                <template #dropdownicon>
                                    <i class="pi pi-map" />
                                </template>
                                <template #header>
                                    <div class="font-medium p-3">Available Countries</div>
                                </template>
                            </Select>
                        </div>
                        <div class="flex flex-col grow basis-0 gap-2">
                            <!-- <pre>{{ date }}</pre> -->
                            <label for="email2" class="whitespace-nowrap">កាលបរិច្ឆេទ</label>
                            <DatePicker v-model="date" fluid dateFormat="dd/mm/yy" class="h-[42px]" />
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-3 time-shift-list">
                        <Button v-for="(time, index) in timeSlots" :key="index" :label="time"
                            @click="handleGroupTime(time)" :severity="selectedTime === time ? 'info' : 'secondary'"
                            class="text-sm md:text-base p-1 md:p-4">
                            <template #icon>
                                <i class="pi pi-clock text-xs md:text-base"></i>
                            </template>
                        </Button>
                    </div>
                </div>
            </div>

            <div class="md:w-2/3">
                <div class=" flex flex-col gap-4">
                    <div class="flex flex-wrap gap-4">
                        <div class="flex flex-col grow basis-0 gap-2">
                            <label for="name2">លិទ្ធផលឆ្នោត</label>
                            <div class="h-[42px] bg-gray-200 rounded-md flex items-center justify-between px-4">
                                <div class="flex items-center gap-2">
                                    <span>ឆ្នោត​​ វៀតណាម</span>
                                    <Chip label="04:30" icon="pi pi-history" />
                                </div>
                                <div class="flex items-center gap-2">
                                    <span>31/10/2025</span>
                                </div>
                            </div>
                            <div class="rounded-md flex flex-col w-full template-entry-result-classes">
                                <VN4h30 v-model="resultNumber" />
                                 <!-- <VN6h30 v-model="resultNumber" /> -->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import BaseBreadcrumb from "@/components/shared/BaseBreadcrumb.vue";

// template lottery result
import VN4h30 from "@/components/template/vn/VN4h30.vue";
// import VN6h30 from "@/components/template/vn/VN6h30.vue";
import { useI18n } from "vue-i18n";
import { enableCellNavigation } from "@/utils/navigate/navigable-table";

const { t } = useI18n();
const { setupNavigableTable, cleanupNavigableTable } = enableCellNavigation();
const page = ref({ title: t('page.entry_result') });

// init state/data
const selectedCountry = ref();
const date = ref(new Date());
const resultNumber = ref<string[]>([]);
const selectedTime = ref('10:30');

const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' }
]);

const timeSlots = ref(['10:30', '11:30', '12:30', '13:30', '14:30']);

const handleGroupTime = (time: string) => {
    console.log('time', time);
    selectedTime.value = time;
}

onMounted(() => {
    // Setup navigable table
    setupNavigableTable();
});

onUnmounted(() => {
    cleanupNavigableTable();
})

</script>

<style lang="scss">
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
        font-weight: 700;
        font-family: 'Public Sans', sans-serif !important;
    }
}
</style>