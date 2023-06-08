export interface IComment {
  id: number
  postId: number
  userId?: number
  name: string
  email: string
  body: string
}

export interface ICreateComment {
  userId?: number
  name: string
  body: string
}
