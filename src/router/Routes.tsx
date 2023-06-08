import { Navigate } from 'react-router-dom'
import { PostByIdPage } from '../pages/PostById/PostByIdPage'
import { PostsPage } from '../pages/Posts/PostsPage'

export const AppRoutes = [
  { path: '/', element: <PostsPage /> },
  { path: '/posts/:id', element: <PostByIdPage /> },
  { path: '*', element: <Navigate to="/" replace /> },
]
