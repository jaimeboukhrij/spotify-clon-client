import { FormSignUp } from '../FormSignUp'
import { HeaderParts } from './HeaderParts'

export function Part3 ({ part, setPart, query, setQuey, handleChange }) {
  return (
    <>
      <HeaderParts part={part} setPart={setPart}>Háblanos de ti </HeaderParts>
      <FormSignUp part={part} setPart={setPart} query={query} setQuey={setQuey} />
    </>
  )
}
