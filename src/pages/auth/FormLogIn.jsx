import { Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './login.module.css'
import { useFormLogIn } from '../../hooks/UseFormLogIn'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import { ErrorInputParts } from './FormSingUpParts/ErrorInputParts'
export function FormLogIn () {
  const { query, setQuery, logIn } = useFormLogIn()
  const { loadingLogIn, errorMessage } = useContext(AuthContext)
  const handleInputChange = (e) => {
    const { name, value } = e.target
    const newQuery = { ...query, [name]: value }
    setQuery(newQuery)
  }
  const hanldeSubmit = (e) => {
    e.preventDefault()
    logIn()
  }

  return (
    <>
      <form className={styles.form} onSubmit={hanldeSubmit}>
        <label htmlFor='email'>Correo electrónico o nombre de usuario</label>
        <input
          type='email'
          name='email'
          value={query.email} onChange={handleInputChange}
          placeholder='Correo electrónico o nombre de usuario'
        />
        <label htmlFor='password'>Constraseña</label>
        <input
          name='password'
          type='password'
          placeholder='Contraseña'
          value={query.password} onChange={handleInputChange}
          style={{ marginBottom: '2%' }}
        />
        {
          errorMessage && <ErrorInputParts width='100%'>{errorMessage}</ErrorInputParts>
        }
        <button style={{ marginTop: '2%' }}>
          {
            !loadingLogIn
              ? 'Iniciar Sesion'
              : <CircularProgress color='inherit' />
          }
        </button>
        <Link className={styles.forgotPassword}>¿Se te ha olvidado la contraseña?</Link>
        <span className={styles.line} />

        <span className={styles.subs}><p>¿No tienes cuenta? </p><Link to='/signup'>Suscríbete a Spotify</Link></span>
      </form>
    </>
  )
}
