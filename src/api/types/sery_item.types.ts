export interface SeriesItemsRequest {
  sery_id: number;
  group_time_id: number;
  sery_time_id: number;
}

export interface SeriesItemsResponse {
  status_code: number;
  message: string;
  data: SeriesItemInfo;
}

export interface SeriesItemInfo {
  series_items: SeriesItem[];
}

export interface SeriesItem {
  id: number;
  sery_id: number;
  group_time_id: number;
  sery_time_id: number;
  post_main_id: number;
  post_name: string;
  number_type_id: number;
  post_order_id: number;
  status_id: number;
}
