import { createContext, useEffect, useState } from 'react'
import authService from '../services/auth.services'
import { useNavigate } from 'react-router'

export const AuthContext = createContext()

export function AuthProviderWrapper ({ children }) {
  const [user, setUser] = useState(null)
  const [loadingLogIn, setLoadingLogIn] = useState(false)
  const [errorMessage, setErrorMessage] = useState()
  const [spotifyToken, setSpotifyToken] = useState()
  const navigate = useNavigate()

  useEffect(() => { authenticateUser() }, [])
  useEffect(() => spotifyToken && localStorage.setItem('tokenSpotify', spotifyToken), [spotifyToken])
  const authenticateUser = () => {
    const token = localStorage.getItem('authToken')
    setLoadingLogIn(true)
    if (token) {
      authService
        .verify(token)
        .then(({ data }) => {
          setUser(data)
          setLoadingLogIn(false)
        })
        .catch(({ data }) => {
          navigate('/login')
          setLoadingLogIn(false)
          localStorage.removeItem('authToken')
        })
    } else {
      setUser(null)
      deleteItem()
      setLoadingLogIn(false)
    }
  }
  const deleteItem = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('tokenSpotify')
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{
      user,
      authenticateUser,
      loadingLogIn,
      setLoadingLogIn,
      setErrorMessage,
      errorMessage,
      setSpotifyToken,
      spotifyToken,
      deleteItem

    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
