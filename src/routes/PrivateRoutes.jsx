import { useContext } from 'react'
import { AuthContext } from './../contexts/auth.context'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { user, loadingLogIn } = useContext(AuthContext)

  if (loadingLogIn) {
    return <p>loader...</p>
  }

  if (!localStorage.getItem('authToken')) {
    return <Navigate to='/' />
  }

  return <Outlet />
}

export default PrivateRoute
