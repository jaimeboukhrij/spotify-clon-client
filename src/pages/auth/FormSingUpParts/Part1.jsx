import 'boxicons'
import styles from '../signup.module.css'
import { Link } from 'react-router-dom'
import { ErrorInputParts } from './ErrorInputParts'
import { UseFormSingUp } from '../../../hooks/UseFormSingUp'
export function Part1 ({ query, handleChange, setPart, validEmail }) {
  const { focus, setFocus } = UseFormSingUp()
  const handleBlur = (e) => {
    const { name } = e.target
    setFocus(prevState => ({
      ...prevState,
      [name]: true
    }))
  }
  return (
    <>
      <label htmlFor='email'>Dirección de correo electrónico</label>
      <input
        type='email'
        name='email'
        id='email'
        placeholder='nombre@dominio.com'
        value={query.email} onChange={handleChange} onBlur={handleBlur}
        style={{
          boxShadow: !(!validEmail || (query.email === '' && focus.email)) ? 'none' : 'inset 0 0 0 1px var(--essential-negative, #e91429)',
          borderColor: !(!validEmail || (query.email === '' && focus.email)) ? '#ffffff7d' : 'transparent'
        }}
      />
      {
       (!validEmail || (query.email === '' && focus.email)) &&
         <ErrorInputParts>
           Este correo electrónico no es válido. Asegúrate de que tenga un formato como este: ejemplo@email.com
         </ErrorInputParts>
      }
      {
        false &&
          <div className={styles.emailValidText}>
            <box-icon name='error-circle' size='20px' color='#ffa42b' />
            <p style={{ color: '#ffa42b' }}>
              Esta dirección ya está vinculada a una cuenta. Para continuar,
              <Link to='/login'>inicia sesión.</Link>
            </p>
          </div>
      }
      <button
        style={{ marginTop: '4%' }}
        onClick={(e) => {
          e.preventDefault()
          query.email !== '' && validEmail && setPart(prev => prev + 1)
        }}
      >
        Continuar
      </button>
    </>
  )
}
