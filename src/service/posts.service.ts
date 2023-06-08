import { AxiosResponse } from 'axios'
import { instance } from '../api'
import { IPost } from '../interface/posts.interface'

export class PostService {
  static async getAll(): Promise<AxiosResponse<IPost[]>> {
    const response = await instance('/posts')
    return response
  }

  static async getById(id: string | undefined): Promise<AxiosResponse<IPost[]>> {
    const response = await instance(`/posts/${id}`)
    return response
  }

  static async getCommentsByIdPost(id: string | undefined): Promise<AxiosResponse<IPost[]>> {
    const response = await instance(`/posts/${id}/comments`)
    return response
  }
}
