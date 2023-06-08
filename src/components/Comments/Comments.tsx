import { FC, useState } from 'react'
import { IComment } from '../../interface/comments.interface'

import avatar from '../../assets/avatar.png'
import './Comments.scss'

interface createComment {
  name: string
  body: string
}

interface Props {
  comments: IComment[]
  commentInputsValue: createComment
  setCommentInputsValue: (type: createComment) => void
  sendCommentHandler: (e: React.FormEvent) => void
}

export const Comments: FC<Props> = ({
  comments,
  commentInputsValue,
  setCommentInputsValue,
  sendCommentHandler,
}) => {
  const [createComments, setCreateComments] = useState(false)

  const commentHandler = () => {
    setCreateComments(!createComments)
    setCommentInputsValue({ name: '', body: '' })
  }

  const submitForm = (e: React.FormEvent) => {
    sendCommentHandler(e)
    setCommentInputsValue({ name: '', body: '' })
  }

  return (
    <div className="comments">
      <button onClick={commentHandler} className="btn">
        {createComments ? 'Отменить' : 'Написать комментарий'}
      </button>
      <div className={createComments ? 'comments__create active' : 'comments__create'}>
        <form className="comments__form" onSubmit={submitForm}>
          <input
            className="comments__input"
            value={commentInputsValue.name}
            onChange={e => setCommentInputsValue({ ...commentInputsValue, name: e.target.value })}
            required
            minLength={2}
            type="text"
            placeholder="Введите название"
          />
          <textarea
            className="comments__input"
            minLength={10}
            value={commentInputsValue.body}
            onChange={e => setCommentInputsValue({ ...commentInputsValue, body: e.target.value })}
            required
            placeholder="Введите комментарий"
          />
          <button className="btn btn-send">Отправить</button>
        </form>
      </div>

      <ul className="comments__list">
        {comments.map(item => {
          return (
            <li className="comments__item" key={item.id}>
              <div className="author post__container">
                <div className="author__info">
                  <div className="author__avatar">
                    <img className="author__avatar-img" src={avatar} alt="avatar" />
                  </div>
                  <div className="author__inner">
                    <div className="author__email">{item?.email ? item.email : 'Аноним'}</div>
                  </div>
                </div>
              </div>

              <div className="comments__body">
                <span className="post post__one comments__title">{item?.name}</span>
                <p className="post post__one">{item.body}</p>
              </div>
            </li>
          )
        })}
      </ul>

      <span className="total">
        Всего комментариев: <span>{comments && comments.length}</span>
      </span>
    </div>
  )
}
