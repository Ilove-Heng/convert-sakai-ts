import { trackingReportService } from '@/api';
import type { TrackingReportInfo, TrackingReportRequest } from '@/api';
import { useQuery, useQueryClient } from '@tanstack/vue-query';

// Query key factory
const trackingReportKeys = {
    detail: (bodyRequest: TrackingReportRequest) => ['tracking_reports', bodyRequest] as const,
};

// Query function with proper typing and cancellation
const fetchTrackingReport = async(bodyRequest: TrackingReportRequest): Promise<TrackingReportInfo> => {
    const response = await trackingReportService.getTrackingReport(bodyRequest);
    return response.data;
}

export const useTrackingReport = (bodyRequest: TrackingReportRequest) => {
    const queryClient = useQueryClient();
    const { data: trackingReportInfo, isLoading, error, isFetching } = useQuery({
        queryKey: trackingReportKeys.detail(bodyRequest),
        queryFn: () => fetchTrackingReport(bodyRequest),
        refetchInterval: 10_000, // poll every 10s
        refetchOnWindowFocus: false, // avoid extra spam
        refetchOnReconnect: true,
        staleTime: 5_000, // data fresh for 5s
        gcTime: 60_000 * 10, // keep cache 10 min
    })

    const refetchTrackingReports = (bodyRequest: TrackingReportRequest) => {
        // Only refetch if not already fetching
        if (!isFetching) {
            queryClient.invalidateQueries({
                queryKey: trackingReportKeys.detail(bodyRequest)
            })
        }
    };

    return {
        trackingReportInfo,
        isLoading,
        isFetching,
        error,
        refetchTrackingReports
    }
}