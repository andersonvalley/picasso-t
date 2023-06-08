import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPost } from '../../../../interface/posts.interface.ts'

import './OnePost.scss'

export const OnePost: FC<IPost> = ({ id, body, title }) => {
  return (
    <article className="post">
      <Link className="post__link" to={`posts/${id}`}>
        <h2 className="post__title">{title}</h2>
        <p className="post__body">{body}</p>
      </Link>
    </article>
  )
}
