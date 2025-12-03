import { seriesService, type SeriesTime, type Sery } from "@/api"
import { useQuery } from "@tanstack/vue-query";


// Query key factory
const seriesKeys = {
    all: ['series'] as const,
    lists: () => [...seriesKeys.all, 'list'] as const,
    groupTimes: () => [...seriesKeys.all, 'group_time'] as const,
    groupTime: (seryId: number) => [...seriesKeys.groupTimes(), seryId] as const,
}


// Query function with proper typing and cancellation
const fetchSeries = async (): Promise<Sery[]> => {
    const response = await seriesService.getSeries();
    return response.data.series;
};

const fetchGroupTimesBySery = async (seryId: number): Promise<SeriesTime[]> => {
    const response = await seriesService.getGroupTimesBySery(seryId);
    return response.data.series_times;
} 

export const useSeries = () => {
    const { data: series, isLoading, error, isFetching } = useQuery({
        queryKey: seriesKeys.lists(),
        queryFn: fetchSeries,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return {
        series,
        isLoading,
        error, 
        isFetching
    }
}

export const useGroupTime = (seryId: MaybeRefOrGetter<number | undefined | null>) => {
    // toValue works with refs, getters, and plain values
    const seryIdRef = computed(() => toValue(seryId));
    
    const { 
        data: groupTime, 
        isLoading, 
        error, 
        isFetching 
    } = useQuery({
        queryKey: computed(() => seriesKeys.groupTime(seryIdRef.value ?? 1)),
        queryFn: () => fetchGroupTimesBySery(seryIdRef.value ?? 1),
        enabled: computed(() => !!seryIdRef.value),
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
    })

    return {
        groupTime,
        isLoading,
        error,
        isFetching
    }
}