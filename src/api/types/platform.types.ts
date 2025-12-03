export interface PlatformResponse {
  status_code: number
  message: string
  data: PlatformInfo
}

export interface PlatformInfo {
  platforms: Platform[]
}

export interface Platform {
  id: number
  platform_name: string
  status_id: number
}
