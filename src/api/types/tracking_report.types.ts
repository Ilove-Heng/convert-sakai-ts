export interface TrackingReportRequest {
  sery_id: number;
  group_time_id: number;
  sery_time_id: number;
  platform_id: number;
  post_order: number;
  check_win_number: number;
  date: string;
}


export interface TrackingReportResponse {
  status_code: number
  message: string
  data: TrackingReportInfo
}

export interface TrackingReportInfo {
  tracking_reports: TrackingReport[]
}

export interface TrackingReport {
  sery_id: number
  group_time_id: number
  sery_time_id: number
  post_id: number
  post_name: string
  posts: Post[]
}

export interface Post {
  max_amount: number
  max_total_amount: number
  number_type_id: number
  Numbers: Number[]
}

export interface Number {
  number: string
  amount: number
  is_win: boolean
  win_amount: number
}
