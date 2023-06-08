import { instance } from '../api'
import { IPost } from '../interface/posts.interface.ts'
import { IUser } from '../interface/users.interafce.tsx'

export class UserService {
  static async getAll() {
    const response = await instance<IUser[]>('/users')
    return response
  }

  static async getUserPosts(id: number | undefined) {
    const response = await instance<IPost[]>(`/users/${id}/posts`)
    return response
  }
}
