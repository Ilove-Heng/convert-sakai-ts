import { seriesService, type GroupTimeInfo, type SeriesInfo } from "@/api"
import { storageCache } from "@/utils/cache/storage";
import { useQuery } from "@tanstack/vue-query";


// Query key factory
const seriesKeys = {
    all: ['series'] as const,
    lists: () => [...seriesKeys.all, 'list'] as const,
    groupTimes: () => [...seriesKeys.all, 'group_time'] as const,
    groupTime: (seryId: number) => [...seriesKeys.groupTimes(), seryId] as const,
}


// Query function with proper typing and cancellation
const fetchSeries = async (): Promise<SeriesInfo> => {
    const response = await seriesService.getSeries();
    return response.data;
};

const fetchGroupTimesBySery = async (seryId: number): Promise<GroupTimeInfo> => {
    const response = await seriesService.getGroupTimesBySery(seryId);
    return response.data;
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
        initialData: (): SeriesInfo | undefined => {
            // Use storageCache.get() - but since it's async and initialData needs sync,
            // we still need to use localStorage.getItem directly here
            const cached = localStorage.getItem('series-cache');
            return cached ? JSON.parse(cached) : undefined;
        },
    });

    // Watch and persist to localStorage using storageCache
    watch(series, async (newSeries) => {
        if (newSeries) {
            await storageCache.set('series-cache', newSeries);
        }
    });

    return {
        series,
        isLoading,
        error, 
        isFetching
    }
}

export const useGroupTime = (seryId: number) => {
    const { 
        data: groupTime, 
        isLoading, 
        error, 
        isFetching 
    } = useQuery({
        queryKey: seriesKeys.groupTime(seryId),
        queryFn: () => fetchGroupTimesBySery(seryId),
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