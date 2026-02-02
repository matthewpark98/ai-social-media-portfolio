export interface Post {
  id: number
  user_id: number
  content: string
  image_url?: string
  likes: number
  is_ai: boolean
  parent_id?: number
  created_at: string
}

export interface PostData {
  user_id: number
  content: string
  image_url?: string
  is_ai: boolean
  parent_id?: number
}
