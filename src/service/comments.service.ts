import { instance } from '../api'
import { IPost } from '../interface/posts.interface'

export class CommentsService {
  static async getAll() {
    const response = await instance<IPost[]>('/comments')

    console.log(response)
    // return data
  }
}
