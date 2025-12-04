import { trackingReportService } from '@/api';
import type { TrackingReportInfo, TrackingReportRequest } from '@/api';
import { useQuery } from '@tanstack/vue-query';
import { ref, onUnmounted, watch, computed, type Ref } from 'vue';

// Query key factory
const trackingReportKeys = {
    detail: (bodyRequest: TrackingReportRequest) => ['tracking_reports', bodyRequest] as const,
};

// Query function with proper typing and cancellation
const fetchTrackingReport = async(bodyRequest: TrackingReportRequest): Promise<TrackingReportInfo> => {
    const response = await trackingReportService.getTrackingReport(bodyRequest);
    return response.data;
}

export const useTrackingReport = (bodyRequest: Ref<TrackingReportRequest>) => {
    const countdown = ref(10); // countdown in seconds
    let countdownInterval: number | null = null;

    // Create a computed query key that updates when bodyRequest changes
    const queryKey = computed(() => trackingReportKeys.detail(bodyRequest.value));

    const { data: trackingReportInfo, isLoading, error, isFetching, refetch } = useQuery({
        queryKey: queryKey,
        queryFn: () => fetchTrackingReport(bodyRequest.value),
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

    // Reset countdown when data is fetched (polling or manual refetch)
    watch(isFetching, (fetching, wasFetching) => {
        if (wasFetching && !fetching) {
            // Just finished fetching
            startCountdown();
        }
    });

    // Cleanup on unmount
    onUnmounted(() => {
        if (countdownInterval) {
            clearInterval(countdownInterval);
        }
    });

    const refetchTrackingReports = async () => {
        if (!isFetching.value) {
            // Use the built-in refetch from useQuery
            // This will use the current bodyRequest.value
            await refetch();
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