import styles from '../signup.module.css'
import { UseFormSingUp } from '../../../hooks/UseFormSingUp'
import { FormRadio } from './FormRadio'
import { NameInput } from './NameInput'
import { DateForm } from './DateForm'

export function Part3 ({ query, setQuey }) {
  const { profileName, date } = query
  const { focus, setFocus, validDate, setValidDate, dateConditions } = UseFormSingUp()

  const handleBlur = (e) => {
    const { name } = e.target
    setFocus(prevState => ({
      ...prevState,
      [name]: true
    }))
  }
  const handleChange = e => {
    const { name, value } = e.target
    setQuey(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleChangeDate = e => {
    const { name, value } = e.target
    setQuey(prevState => ({
      ...prevState,
      date: { ...prevState.date, [name]: value }
    }))
    setValidDate(dateConditions({ ...date, [name]: value }))
  }
  return (
    <>
      <NameInput handleBlur={handleBlur} handleChange={handleChange} profileName={profileName} focus={focus} query={query} />

      <label htmlFor='date'>Fecha de nacimiento</label>
      <DateForm
        handleBlur={handleBlur} handleChangeDate={handleChangeDate}
        validDate={validDate} focus={focus} date={date} query={query}
      />

      <label htmlFor='genre'>Género</label>
      <article className={styles.genre_container}>
        <article className={styles.genre_container}>
          <FormRadio name='gender' label='Hombre' value='Hombre' onChange={handleChange} checked={query.gender === 'Hombre'} />
          <FormRadio name='gender' label='Mujer' value='Mujer' onChange={handleChange} checked={query.gender === 'Mujer'} />
          <FormRadio name='gender' label='No binario' value='No binario' onChange={handleChange} checked={query.gender === 'No binario'} />
          <FormRadio name='gender' label='Otro' value='Otro' onChange={handleChange} checked={query.gender === 'Otro'} />
          <FormRadio name='gender' label='Prefiero no responder' value='nosaber' width='60%' onChange={handleChange} checked={query.gender === 'nosaber'} />
        </article>
      </article>

      <button
        style={{ marginTop: '6%', width: '92%' }}

      >
        Siguiente
      </button>
    </>
  )
}
