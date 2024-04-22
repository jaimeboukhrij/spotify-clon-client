import { Link } from 'react-router-dom'
import { ContinueWith } from '../ContinuaWith'
import { FormSignUp } from '../FormSignUp'
import styles from '../signup.module.css'
export function Part1 ({ setPart, part, query, setQuey, validEmail }) {
  return (
    <>
      <h1>Regístrate para empezar a escuchar contenido</h1>
      <FormSignUp part={part} setPart={setPart} query={query} setQuey={setQuey} validEmail={validEmail} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
        <span className={styles.line} style={{ margin: '20px 0' }} />
        <span>o</span>
        <span className={styles.line} style={{ margin: '20px 0' }} />
      </div>
      <ContinueWith width='99%' height='28%' padding='3.5% 3%' text='Registrarte' />
      <span className={styles.line} style={{ width: '100%', borderTop: '1px solid rgb(255 255 255 / 20%)' }} />
      <p style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
        ¿Ya tienes una cuenta? <Link to='/login'>Inicia sesión aquí.</Link>
      </p>
    </>
  )
}
