import { Main } from '../../components/Home/Main/Main'
import styles from './home.module.css'
export function Home ({ changeNavColor }) {
  return (
    <section className={styles.main}>
      <Main />
    </section>
  )
}
