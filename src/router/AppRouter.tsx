import { Route, Routes } from 'react-router-dom'
import { AppRoutes } from './Routes'

export const AppRouter = () => {
  return (
    <Routes>
      {AppRoutes.map(route => (
        <Route key={route.path} element={route.element} path={route.path} />
      ))}
    </Routes>
  )
}
