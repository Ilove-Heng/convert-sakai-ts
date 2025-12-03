import type { TrackingReportRequest, TrackingReportResponse } from '@/api';
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