import { useNavigate } from 'react-router'
import authService from '../../services/auth.services'
import { Part1 } from './FormSingUpParts/Part1'
import { Part2 } from './FormSingUpParts/Part2'
import { Part3 } from './FormSingUpParts/Part3'
import styles from './signup.module.css'

export function FormSignUp ({ part, setPart, query, setQuey, passwordConditions, validEmail }) {
  const Navigate = useNavigate()
  const handleChange = (e) => {
    const { value, name } = e.target
    setQuey(prevQuery => ({ ...prevQuery, [name]: value }))
  }
  const handleSubmit = e => {
    e.preventDefault()
    authService.signup(query)
      .then(() => Navigate('/login'))
      .catch(e => console.log(e))
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {part === 1 &&
        <Part1 query={query} setPart={setPart} handleChange={handleChange} validEmail={validEmail} />}
      {part === 2 &&
        <Part2
          handleChange={handleChange} passwordConditions={passwordConditions}
          query={query} setPart={setPart}
        />}
      {part === 3 &&
        <Part3
          query={query} setPart={setPart} setQuey={setQuey}
        />}
    </form>
  )
}
