export interface UserInfo {
  id: number;
  username: string;
  created_at: string;
}

export interface UserResponse {
  status_code: number;
  message: string;
  data: UserInfo[];
}
