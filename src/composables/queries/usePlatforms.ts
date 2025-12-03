import { platformsService, type Platform } from "@/api";
import { useQuery } from "@tanstack/vue-query";


// Query key factory
const platformsKeys = {
    all: ['platforms'] as const,
    lists: () => [...platformsKeys.all, 'list'] as const,
};

// Query function with proper typing and cancellation
const fetchPlatforms = async (): Promise<Platform[]> => {
    const response = await platformsService.getPlatforms();
    return response.data.platforms;
}

export const usePlatforms = () => {
    const { data: platforms, isLoading, error, isFetching } = useQuery({
        queryKey: platformsKeys.lists(),
        queryFn: fetchPlatforms,
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    return {
        platforms,
        isLoading,
        error, 
        isFetching
    }
}