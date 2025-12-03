import  { type NavigationGuardNext, type RouteLocationNormalized, useRouter } from 'vue-router';

export function authMiddleware(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
) {
  const token = localStorage.getItem('auth_token');
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Protected route: redirect to login if no token
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    // Public route: redirect to home if user is already authenticated
    if (token && (to.name === 'login' || to.path.startsWith('/auth'))) {
      next({ name: 'dashboard' });
    } else {
      next();
    }
  }
}

export function useAuth() {
  const router = useRouter();
  const isAuthenticated = () => !!localStorage.getItem('auth_token');
  const setToken = (token: string) => localStorage.setItem('auth_token', token);
  const removeToken = () => {
    localStorage.removeItem('auth_token');
    // redirect to login if no token
    router.push({ name: 'login' })
  };

  return {
    isAuthenticated,
    setToken,
    removeToken
  };
}
