import { Header } from './Header'
import styles from './signup.module.css'
import { UseFormSingUp } from '../../hooks/UseFormSingUp'
import 'boxicons'
import { Part1 } from './SignUpParts/Part1'
import { Part2 } from './SignUpParts/Part2'
import { Part3 } from './SignUpParts/Part3'
export function SignUp () {
  const { part, setPart, query, setQuey, passwordConditions, validEmail } = UseFormSingUp()
  return (
    <main className={styles.main}>
      <Header />
      <section className={styles.section}>
        {part === 1 && <Part1 setPart={setPart} part={part} query={query} setQuey={setQuey} validEmail={validEmail} />}
        {part === 2 && <Part2 setPart={setPart} part={part} query={query} setQuey={setQuey} passwordConditions={passwordConditions} />}
        {part === 3 && <Part3 setPart={setPart} part={part} query={query} setQuey={setQuey} />}
      </section>
    </main>
  )
}
