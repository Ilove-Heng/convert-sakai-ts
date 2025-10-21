export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  status_code: number;
  message: string;
  data: LoginInfo;
}

interface LoginInfo {
  id: number;
  username: string;
  token: string;
}