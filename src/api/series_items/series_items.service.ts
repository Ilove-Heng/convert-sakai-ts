import type { ResultSeriesItemRequest, ResultsSeriesRequest, ResultsSeriesResponse, SeriesItemsRequest, SeriesItemsResponse } from '@/api';
import { apiRequest } from '../http/client';

export const seriesItemsService = {
    async getSeriesItems(bodyRequest: SeriesItemsRequest): Promise<SeriesItemsResponse> {
        const response = await apiRequest<SeriesItemsResponse>({
            method: 'POST',
            url: '/series_items',
            data: bodyRequest
        });
        return response.data;
    },

    async getResultsSeries(bodyRequest: ResultsSeriesRequest): Promise<ResultsSeriesResponse> {
        const response = await apiRequest<ResultsSeriesResponse>({
            method: "POST",
            url: '/results_series',
            data: bodyRequest
        });
        return response.data;
    },

    async createResultsSeries(bodyRequest: ResultSeriesItemRequest) {
        const response = await apiRequest({
            method: "POST",
            url: '/create_results_series',
            data: bodyRequest,
        });
        return response.data;
    }
};