import {AxiosResponse} from 'axios'
import {instance} from '../api'
import {IComment, ICreateComment} from '../interface/comments.interface'

export class CommentService {
  static async getCommentsById(id: number | undefined): Promise<AxiosResponse<IComment[]>> {
    const response = await instance(`/posts/${id}/comments`)
    return response
  }

  static async createComment(id: number | undefined, data: ICreateComment): Promise<AxiosResponse<IComment>> {
    const response = await instance(`/posts/${id}/comments`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      data,
    })
    return response
  }
}
