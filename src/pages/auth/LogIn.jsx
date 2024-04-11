import { FormLogIn } from './FormLogIn'
import styles from './login.module.css'

import { Header } from './Header'
import { ContinueWith } from './ContinuaWith'
export function LogIn () {
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.section}>
        <h1>Inicia sesión en Spotify </h1>
        <ContinueWith text='Continuar' />
        <span className={styles.line} />
        <FormLogIn />
      </section>

    </main>
  )
}
