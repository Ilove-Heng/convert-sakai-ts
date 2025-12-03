import { trackingReportService } from '@/api';
import type { TrackingReportInfo, TrackingReportRequest } from '@/api';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { ref, onUnmounted } from 'vue';

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
    const countdown = ref(10); // countdown in seconds
    let countdownInterval: number | null = null;

    const { data: trackingReportInfo, isLoading, error, isFetching } = useQuery({
        queryKey: trackingReportKeys.detail(bodyRequest),
        queryFn: () => fetchTrackingReport(bodyRequest),
        refetchInterval: 10_000, // poll every 10s
        refetchOnWindowFocus: false,
        refetchOnReconnect: true,
        staleTime: 5_000,
        gcTime: 60_000 * 10,
    });

    // Start countdown timer
    const startCountdown = () => {
        countdown.value = 10;
        
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }

        countdownInterval = setInterval(() => {
            countdown.value--;
            
            if (countdown.value <= 0) {
                countdown.value = 10; // reset to 10s
            }
        }, 1000) as unknown as number;
    };

    // Initialize countdown
    startCountdown();

    // Cleanup on unmount
    onUnmounted(() => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });

    const refetchTrackingReports = (bodyRequest: TrackingReportRequest) => {
        if (!isFetching) {
            queryClient.invalidateQueries({
                queryKey: trackingReportKeys.detail(bodyRequest)
            });
            // Reset countdown when manually refetching
            startCountdown();
        }
    };

    return {
        trackingReportInfo,
        isLoading,
        isFetching,
        error,
        countdown, // expose countdown
        refetchTrackingReports
    }
}