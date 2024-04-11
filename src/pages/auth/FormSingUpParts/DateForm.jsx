import styles from '../signup.module.css'
import { ErrorInputParts } from './ErrorInputParts'
import { SelectInput } from './SelectInput'

export function DateForm ({ handleBlur, handleChangeDate, validDate, focus, date, query }) {
  return (
    <>
      <article className={styles.date_container}>
        <input
          style={{
            flexBasis: '50%',
            boxShadow: (date.day === '' && focus.day) ? 'inset 0 0 0 1px #e91429' : 'none',
            borderColor: (date.day === '' && focus.day) ? 'transparent' : '#ffffff7d'
          }} type='text' placeholder='dd' onChange={handleChangeDate} onBlur={handleBlur} name='day' value={query.date.day}
        />
        <SelectInput handleBlur={handleBlur} handleChangeDate={handleChangeDate} date={date} focus={focus} query={query} />
        <input
          style={{
            flexBasis: '50%',
            boxShadow: (date.year === '' && focus.year) ? 'inset 0 0 0 1px #e91429' : 'none',
            borderColor: (date.year === '' && focus.year) ? 'transparent' : '#ffffff7d'
          }} type='text' placeholder='aaaa' onChange={handleChangeDate} onBlur={handleBlur} name='year' value={query.date.year}
        />
      </article>
      {(!validDate && (focus.day && focus.month && focus.year)) &&
        <ErrorInputParts>Indica tu fecha de nacimiento.</ErrorInputParts>}
    </>
  )
}
