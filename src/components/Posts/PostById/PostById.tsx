import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useFetching } from '../../../hooks/useFetching'
import { IComment } from '../../../interface/comments.interface'
import { IPost } from '../../../interface/posts.interface'
import { IUser } from '../../../interface/users.interface'
import { CommentService } from '../../../service/comments.service'
import { PostService } from '../../../service/posts.service'
import { UserService } from '../../../service/user.service'
import { notify } from '../../../utils/notification'
import { Comments } from '../../Comments/Comments'
import { Loader } from '../../UI/Loader/Loader'

import avatar from '../../../assets/avatar.png'
import './PostById.scss'

export const PostById = () => {
  const { id } = useParams()
  const [commentInputsValue, setCommentInputsValue] = useState({
    body: '',
    name: '',
  })

  const {
    fetching: fetchingPost,
    data: post,
    error: errorPost,
    isLoading: isLoadingPost,
  } = useFetching<IPost>(() => PostService.getById(id))

  const { fetching: fetchingUser, data: userData } = useFetching<IUser>(() =>
    UserService.getById(post?.userId)
  )

  const {
    fetching: fetchingComments,
    data: commentsData,
    setData: fakeUpdateComments,
  } = useFetching<IComment>(() => CommentService.getCommentsById(post?.id))

  useEffect(() => {
    if (!id) return
    fetchingPost('Получен пост')
  }, [])

  useEffect(() => {
    if (!post?.userId) return
    fetchingUser('Получены данные пользователя')
    fetchingComments()

    notify('Получены комментарии')
  }, [post])

  const sendCommentHandler = async (e: React.FormEvent) => {
    e.preventDefault()

    const comment = {
      name: commentInputsValue.name,
      body: commentInputsValue.body,
      userId: post?.userId,
    }

    const response = await CommentService.createComment(post?.id, comment)

    if (response.status === 201) {
      fakeUpdateComments([response.data, ...commentsData])
      notify('Комментарий отправлен')
    } else {
      notify('Ошибка в отправке комментария, попробуйте еще раз')
    }
  }

  return (
    <div className="posts">
      <div className="posts__header">
        <h1 className="posts__title">
          <Link to="/">Ко всем постам</Link>
        </h1>
      </div>

      <div className="author post__container">
        <div className="author__info">
          <div className="author__avatar">
            <img className="author__avatar-img" src={avatar} alt="avatar" />
          </div>
          <div className="author__inner">
            <span className="author__name">{userData?.name}</span>
            <div className="author__email">{userData?.email}</div>
          </div>
        </div>
        <div className="author__city">
          Из города: <span>{userData?.address?.city}</span>
        </div>
      </div>

      <div className="post__container animate">
        {isLoadingPost && <Loader />}
        {errorPost && <p>{errorPost}</p>}

        <h2 className="post__title">{post?.title}</h2>
        <p className="post post__one">{post?.body}</p>
      </div>

      <div className="post__container animate">
        <Comments
          commentInputsValue={commentInputsValue}
          setCommentInputsValue={setCommentInputsValue}
          sendCommentHandler={sendCommentHandler}
          comments={commentsData}
        />
      </div>
    </div>
  )
}
