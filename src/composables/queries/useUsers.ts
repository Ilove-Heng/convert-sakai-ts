import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { userService, type UserInfo } from '@/api';

// Query key factory
export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (id: number) => [...userKeys.details(), id] as const,
};

// Query function with proper typing and cancellation
const fetchUsers = async (): Promise<UserInfo[]> => {
  const response = await userService.getUsers();
  return response.data;
};
  
  export const useUsers = () => {
    const queryClient = useQueryClient();
  
    const {
      data: users = [],
      isLoading,
      error,
      isFetching, // Add this to track if a request is in progress
    } = useQuery({
      queryKey: userKeys.lists(),
      queryFn: fetchUsers,
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  
    const refetchUsers = () => {
      // Only refetch if not already fetching
      if (!isFetching) {
        queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      }
    };
  
    return {
      users,
      isLoading,
      isFetching, // Expose isFetching to the component
      error,
      refetchUsers,
    };
  };