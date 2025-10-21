import { apiRequest } from '../http/client';
import type { UserResponse } from '../types/user.types';

export const userService = {
  async getUsers(options: { signal?: AbortSignal } = {}): Promise<UserResponse> {
    const response = await apiRequest<UserResponse>({
      method: 'GET',
      url: '/users',
      signal: options.signal,
    });
    return response.data;
  },
  
  // Add more user-related API calls here
  // Example:
  /*
  async getUserById(id: number): Promise<User> {
    const response = await apiRequest<User>({
      method: 'GET',
      url: `/users/${id}`,
    });
    return response.data;
  },
  */
};
