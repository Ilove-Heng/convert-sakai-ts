import {
  seriesItemsService,
  type ResultsSeriesRequest,
  type ResultsSeries,
  type SeriesItem,
  type SeriesItemsRequest,
} from "@/api";
import { useQuery } from "@tanstack/vue-query";

// Query key factory
const seriesItemsKeys = {
  seriesItem: (bodyRequest: SeriesItemsRequest) => ["series_items", bodyRequest] as const,
  seriesResult: (bodyRequest: ResultsSeriesRequest) => ["series_results", bodyRequest] as const
};

// Query function with proper typing and cancellation
const fetchSeriesItems = async (
  bodyRequest: SeriesItemsRequest
): Promise<SeriesItem[]> => {
  const response = await seriesItemsService.getSeriesItems(bodyRequest);
  return response.data.series_items;
};

const fetchSeriesResults = async (bodyRequest: ResultsSeriesRequest): Promise<ResultsSeries[]> => {
  try {
    const response = await seriesItemsService.getResultsSeries(bodyRequest);
    return response?.data?.results_series || [];
  } catch (error) {
    console.error('Error fetching series results:', error);
    return [];
  }
};

export const useSeriesResults = (bodyRequest: MaybeRefOrGetter<ResultsSeriesRequest>) => {
  // toValue works with refs, getters, and plain values
  const bodyRequestRef = computed(() => toValue(bodyRequest));
  const {
    data: seriesResult,
    isLoading,
    error,
    isFetching,
    refetch
  } = useQuery({
    queryKey: computed(() => seriesItemsKeys.seriesResult(bodyRequestRef.value)),
    queryFn: () => fetchSeriesResults(bodyRequestRef.value),
    enabled: computed(() => !!bodyRequestRef.value),
  });
  return {
    seriesResult,
    isLoading,
    error,
    isFetching,
    refetch
  };
}

export const useSeriesItems = (
  bodyRequest: MaybeRefOrGetter<SeriesItemsRequest>
) => {
  // toValue works with refs, getters, and plain values
  const bodyRequestRef = computed(() => toValue(bodyRequest));
  const {
    data: seriesItem,
    isLoading,
    error,
    isFetching,
  } = useQuery({
    queryKey: computed(() => seriesItemsKeys.seriesItem(bodyRequestRef.value)),
    queryFn: () => fetchSeriesItems(bodyRequestRef.value),
    enabled: computed(() => !!bodyRequestRef.value),
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  return {
    seriesItem,
    isLoading,
    error,
    isFetching,
  };
};
