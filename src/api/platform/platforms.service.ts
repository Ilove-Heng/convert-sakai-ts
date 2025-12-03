import { apiRequest } from "../http/client";
import type { PlatformResponse } from "@/api";


export const platformsService = {
    async getPlatforms() {
        const response = await apiRequest<PlatformResponse>({
            method: 'GET',
            url: '/platforms',
        });
        return response.data;
    }
};