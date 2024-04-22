import { useContext } from 'react'
import { AuthContext } from './../contexts/auth.context'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { loadingLogIn } = useContext(AuthContext)

  if (loadingLogIn) {
    return <p>loader...</p>
  }

  if (!localStorage.getItem('authToken')) {
    return <Navigate to='/login' />
  }

  return <Outlet />
}

export default PrivateRoute
