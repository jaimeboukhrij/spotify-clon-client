import { UseFormSingUp } from '../../../hooks/UseFormSingUp'
import styles from '../signup.module.css'

export function Part2 ({ handleChange, query, passwordConditions, setPart }) {
  const { hasLetter, hasSpecialNumber, hasTenCaracteres } = passwordConditions
  const { focus, setFocus } = UseFormSingUp()

  const handleBlur = (e) => {
    const { name } = e.target
    setFocus(prevState => ({
      ...prevState,
      [name]: true
    }))
  }
  const checkIcon = <box-icon name='check-circle' type='solid' color='#1ed760' size='20px' />
  const normalIcon = <box-icon name='radio-circle' color='#ffffff' size='20px' />

  return (
    <>
      <label htmlFor='password'>Contraseña</label>
      <input
        style={{
          width: '90%',
          marginBottom: '7%',
          boxShadow: !((query.password === '' && focus.password)) ? 'none' : 'inset 0 0 0 1px var(--essential-negative, #e91429)',
          borderColor: !((query.password === '' && focus.password)) ? '#ffffff7d' : 'transparent'

        }}
        type='password'
        name='password'
        id='password'
        autoComplete='new-password'
        onBlur={handleBlur}
        value={query.password} onChange={handleChange}
      />

      <article className={styles.divCheckPassword}>
        <p style={{ fontWeight: 'bold' }}>La contraseña debe contener al menos:</p>
        <div>
          {hasLetter ? checkIcon : normalIcon}
          <p style={{ color: hasLetter ? '#fff' : '#f15e6c' }}>1 letra</p>
        </div>
        <div>
          {hasSpecialNumber ? checkIcon : normalIcon}
          <p style={{ color: hasSpecialNumber ? '#fff' : '#f15e6c' }}>
            1 número o carácter especial (por ejemplo, "#", "?", "!" o "&")
          </p>
        </div>
        <div>
          {hasTenCaracteres ? checkIcon : normalIcon}
          <p style={{ color: hasTenCaracteres ? '#fff' : '#f15e6c' }}>10 caracteres</p>
        </div>
      </article>

      <button
        style={{ marginTop: '4%', width: '92%' }}
        onClick={(e) => {
          e.preventDefault()
          hasLetter && hasSpecialNumber && hasTenCaracteres && setPart(prev => prev + 1)
        }}
      >
        Siguiente
      </button>
    </>
  )
}
