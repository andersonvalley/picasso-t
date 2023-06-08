import { FC, useState } from 'react'
import { IUser } from '../../../interface/users.interafce'

import { Loader } from '../Loader/Loader'
import './Select.scss'

interface Props {
  isLoading: boolean
  error: string
  users: IUser[]
  currentUser: IUser | null
  setCurrentUser: (item: IUser) => void
}

export const Select: FC<Props> = ({ isLoading, error, users, currentUser, setCurrentUser }) => {
  const [openSelect, setOpenSelect] = useState(false)

  const chooseUserHandler = (item: IUser) => {
    setCurrentUser(item)
    setOpenSelect(false)
  }

  return (
    <>
      <div className="select">
        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        <div onClick={() => setOpenSelect(true)} className="select__current">
          {currentUser ? currentUser.name : 'Не выбрано'}
        </div>

        <ul className={openSelect ? 'select__options active' : 'select__options'}>
          {users.map(item => {
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
