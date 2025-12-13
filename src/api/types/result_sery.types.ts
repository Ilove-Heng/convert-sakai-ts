
export interface ResultsSeriesRequest {
  sery_id: number;
  group_time_id: number;
  sery_time_id: number;
  date: string;
}

export interface ResultSeriesItemRequest {
  headers: ResultSeriesItemHeaders;
  results: ResultSeriesItem[];
}

export interface ResultSeriesItemHeaders {
  sery_id: number;
  group_time_id: number;
  sery_time_id: number;
}

export interface ResultSeriesItem {
  result_number: string;
  sery_item_id: number;
}

export interface ResultsSeriesResponse {
  status_code: number
  message: string
  data: ResultsSeriesInfo
}

export interface ResultsSeriesInfo {
  results_series: ResultsSeries[]
}

export interface ResultsSeries {
  result_number: string
  sery_item_id: number
}


