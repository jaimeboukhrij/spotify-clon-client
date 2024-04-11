import { FormSignUp } from '../FormSignUp'
import { HeaderParts } from './HeaderParts'

export function Part2 ({ part, setPart, query, setQuey, passwordConditions }) {
  return (
    <>
      <HeaderParts part={part} setPart={setPart}>Crea una contraseña</HeaderParts>
      <FormSignUp part={part} setPart={setPart} query={query} setQuey={setQuey} passwordConditions={passwordConditions} />
    </>
  )
}
