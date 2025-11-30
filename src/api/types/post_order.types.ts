export interface PostOrderResponse {
  status_code: number
  message: string
  data: PostOrderInfo
}

export interface PostOrderInfo {
  post_orders: PostOrder[]
}

export interface PostOrder {
  id: number
  post_order_name: string
  status_id: number
}
