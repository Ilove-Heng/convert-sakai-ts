import { apiRequest } from '../http/client';
import type { LoginCredentials, LoginResponse } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await apiRequest<LoginResponse>({
      method: 'POST',
      url: '/login',
      data: credentials,
    });
    return response.data;
  },

  // Add more auth-related methods as needed
  /*
  async logout(): Promise<void> {
    await apiRequest({
      method: 'POST',
      url: '/logout',
    });
  },
  */
};
