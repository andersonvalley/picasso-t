import { useEffect, useState } from 'react'
import { useFetching } from '../../../hooks/useFetching'
import { IUser } from '../../../interface/users.interface.tsx'
import { UserService } from '../../../service/user.service.ts'
import { OnePost } from './PostItem/OnePost.tsx'

import { IPost } from '../../../interface/posts.interface.ts'
import { PostService } from '../../../service/posts.service.ts'
import { Loader } from '../../UI/Loader/Loader.tsx'
import { Select } from '../../UI/Select/Select.tsx'
import './Posts.scss'

export const AllPosts = () => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  const {
    fetching: fetchingPosts,
    data: posts,
    error: errorPosts,
    isLoading: isLoadingPosts,
    setData: setPostsByUserId,
  } = useFetching<IPost[]>()

  const { fetching: fetchingUsers, data: users } = useFetching<IUser[]>()

  const {
    fetching: fetchingUserPosts,
    data: userPosts,
    error: errosUserPosts,
    isLoading: isLoadingUserPosts,
  } = useFetching<IPost[]>()

  useEffect(() => {
    fetchingUsers(() => UserService.getAll())
  }, [])

  useEffect(() => {
    if (!currentUser?.id) {
      fetchingPosts(() => PostService.getAll())
      return
    }

    fetchingUserPosts(() => UserService.getUserPosts(currentUser?.id), 'Посты пользователя получены')
  }, [currentUser])

  useEffect(() => {
    setPostsByUserId(userPosts)
  }, [userPosts])

  return (
    <>
      <div className="posts">
        <div className="posts__header">
          <h1 className="posts__title">Посты</h1>
        </div>

        <div className="container">
          <div className="posts__controls container container-controls">
            <span>Фильтрация постов по пользователю: </span>
            <Select setCurrentUser={setCurrentUser} currentUser={currentUser} users={users} />
          </div>

          {isLoadingPosts && <Loader />}
          {isLoadingUserPosts && <Loader />}
          {errorPosts && (
            <p className="error">
              {errorPosts}, <br /> попробуйте перезагрузить страницу
            </p>
          )}
          {errosUserPosts && <p className="error">{errosUserPosts}</p>}

          <div className="posts__list animate">
            {posts?.map(item => {
              return <OnePost key={item.id} {...item} />
            })}
          </div>
        </div>
      </div>

      <span className="total">
        Всего постов: <span>{posts && posts.length}</span>
      </span>
    </>
  )
}
