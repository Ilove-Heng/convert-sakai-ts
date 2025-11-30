import type { TrackingReportRequest, TrackingReportResponse } from '@/types/tracking/trackingReportType';
import { apiRequest } from '../http/client';

export const trackingReportService = {
    async getTrackingReport(bodyRequest: TrackingReportRequest,options: { signal?: AbortSignal } = {}): Promise<TrackingReportResponse> {
        const response = await apiRequest<TrackingReportResponse>({
            method: 'POST',
            url: '/tracking_reports',
            signal: options.signal,
            data: bodyRequest
        });
        return response.data;
    }
};