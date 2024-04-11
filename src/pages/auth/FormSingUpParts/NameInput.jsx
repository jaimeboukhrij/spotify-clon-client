import { ErrorInputParts } from './ErrorInputParts'

export function NameInput ({ handleBlur, handleChange, profileName, focus, query }) {
  return (
    <>
      <label htmlFor='profileName'>Nombre</label>
      <input
        type='text' onBlur={handleBlur} name='profileName' onChange={handleChange} value={query.profileName}
        style={{
          boxShadow: !(profileName === '' && focus.profileName) ? 'none' : 'inset 0 0 0 1px #e91429',
          borderColor: !(profileName === '' && focus.profileName) ? '#ffffff7d' : 'transparent'
        }}
      />
      {
          profileName === '' && focus.profileName &&
            <ErrorInputParts>
              Indica un nombre para tu perfil.
            </ErrorInputParts>
        }
    </>
  )
}
