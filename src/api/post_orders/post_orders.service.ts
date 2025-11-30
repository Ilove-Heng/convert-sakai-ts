import { apiRequest } from "../http/client"
import type { PostOrderResponse } from "@/api";


export const postOrdersService = {
    async getPostOrders(): Promise<PostOrderResponse> {
        const response = await apiRequest<PostOrderResponse>({
            method: 'GET',
            url: '/post_orders'
        });
        return response.data;
    }
}