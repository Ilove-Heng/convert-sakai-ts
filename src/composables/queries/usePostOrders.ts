import { postOrdersService, type PostOrder } from "@/api";
import { useQuery } from "@tanstack/vue-query";


// Query key factory
const postOrdersKeys = {
    all: ['post_orders'] as const,
    lists: () => [...postOrdersKeys.all, 'list'] as const,
}

// Query function with proper typing and cancellation
const fetchPostOrders = async (): Promise<PostOrder[]> => {
   const response = await postOrdersService.getPostOrders();
   return response.data.post_orders;
};

export const usePostOrders = () => {
    const { data: postOrder, isLoading, error, isFetching } = useQuery({
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
        postOrder,
        isLoading,
        error, 
        isFetching
    }
}