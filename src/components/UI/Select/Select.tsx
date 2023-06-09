import { FC, useState } from 'react'
import { IUser } from '../../../interface/users.interface'

import { Loader } from '../Loader/Loader'
import './Select.scss'

interface Props {
  defaultValue?: string
  isLoading?: boolean
  error?: string
  users: IUser[] | undefined
  currentUser: IUser | null
  setCurrentUser: (item: IUser | null) => void
}

export const Select: FC<Props> = ({
  isLoading,
  error,
  users,
  currentUser,
  setCurrentUser,
  defaultValue = 'Все посты',
}) => {
  const [openSelect, setOpenSelect] = useState(false)

  const chooseUserHandler = (item: IUser | null) => {
    setOpenSelect(false)

    if (!item) {
      setCurrentUser(null)
      return
    }

    setCurrentUser(item)
  }

  return (
    <>
      <div className="select">
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        <div onClick={() => setOpenSelect(true)} className="select__current">
          {currentUser ? currentUser.name : defaultValue}
        </div>

        <ul className={openSelect ? 'select__options active' : 'select__options'}>
          <li onClick={() => chooseUserHandler(null)} className="select__item">
            {defaultValue}
          </li>
          {users?.map(item => {
            return (
              <li onClick={() => chooseUserHandler(item)} key={item.id} className="select__item">
                {item.name}
              </li>
            )
          })}
        </ul>
      </div>
      <div onClick={() => setOpenSelect(false)} className={openSelect ? 'overlay' : ''}></div>
    </>
  )
}
