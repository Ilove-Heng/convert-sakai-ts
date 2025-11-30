import { postOrdersService } from "@/api";
import { useQuery } from "@tanstack/vue-query";


// Query key factory
const postOrdersKeys = {
    all: ['post_orders'] as const,
    lists: () => [...postOrdersKeys.all, 'list'] as const,
}

// Query function with proper typing and cancellation
const fetchPostOrders = async () => {
   const response = await postOrdersService.getPostOrders();
   return response.data;
};

export const usePostOrders = () => {
    const { data: postOrders, isLoading, error, isFetching } = useQuery({
        queryKey: postOrdersKeys.lists(),
        queryFn: fetchPostOrders,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return {
        postOrders,
        isLoading,
        error, 
        isFetching
    }
}