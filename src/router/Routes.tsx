import { Navigate } from 'react-router-dom'
import { PostById } from '../pages/PostById/PostById'
import { Posts } from '../pages/Posts/Posts'

export const AppRoutes = [
  { path: '/', element: <Posts /> },
  { path: '/posts/:id', element: <PostById /> },
  { path: '*', element: <Navigate to="/" replace /> },
]
