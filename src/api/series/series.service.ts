import type { GroupTimeResponse, SeriesResponse } from "@/api";
import { apiRequest } from "../http/client"

export const seriesService = {
    async getSeries(options: { signal?: AbortSignal } = {}): Promise<SeriesResponse> {
        const response = await apiRequest<SeriesResponse>({
            method: "GET",
            url: '/series',
            signal: options.signal,
        });
        return response.data;
    },

    async getGroupTimesBySery(sery_id: number): Promise<GroupTimeResponse> {
        const response = await apiRequest<GroupTimeResponse>({
            method: 'POST',
            url: '/series_times',
            data: {
                sery_id
            }
        });
        return response.data;
    }
}