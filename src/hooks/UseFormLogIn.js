/* eslint-disable camelcase */
import { useContext, useEffect, useState } from 'react'
import authService from '../services/auth.services'
import { AuthContext } from '../contexts/auth.context'
import { useNavigate } from 'react-router'
import { getSpotifyToken } from '../services/getSpotifyToken.service'

export function useFormLogIn () {
  const { authenticateUser, setErrorMessage, setLoadingLogIn, setSpotifyToken } = useContext(AuthContext)
  const [query, setQuery] = useState({
    email: 'user1@gmail.com',
    password: 'Spotify2024'
  })
  const navigate = useNavigate()
  useEffect(() => {
    getSpotifyToken()
      .then(({ access_token }) => {
        setSpotifyToken(access_token)
      })
      .catch(e => console.log(e))
  }, [])

  const logIn = () => {
    setLoadingLogIn(true)
    authService
      .login(query)
      .then(({ data }) => {
        localStorage.setItem('authToken', data.authToken)
        authenticateUser()
        setLoadingLogIn(false)
        navigate('/')
      })
      .catch(({ response }) => {
        setLoadingLogIn(false)
        setErrorMessage(response.data.message)
      })
  }

  return { query, setQuery, logIn }
}
