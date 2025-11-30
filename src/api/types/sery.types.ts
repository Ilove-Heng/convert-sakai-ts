export interface SeriesResponse {
  status_code: number
  message: string
  data: SeriesInfo
}

export interface SeriesInfo {
  series: Sery[]
}

export interface Sery {
  id: number
  sery_name: string
  status_id: number
  logo: string
}


export interface GroupTimeResponse {
  status_code: number
  message: string
  data: GroupTimeInfo
}

export interface GroupTimeInfo {
  series_times: SeriesTime[]
}

export interface SeriesTime {
  id: number
  sery_id: number
  group_time_id: number
  group_time_name: string
  sery_time_id: number
  result_time: string
  check_status: boolean
}
