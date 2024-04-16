import { useContext, useState } from 'react'
import styles from './nav.module.css'
import { AuthContext } from '../../contexts/auth.context'
export function Profile ({ profileName }) {
  const { profileOptVisible, setProfileOptvisible } = useState(false)
  const { deleteItem } = useContext(AuthContext)
  return (
    <>
      <div
        className={styles.name}
        onClick={() => setProfileOptvisible(prev => !prev)}
      >
        {profileName[0]}
      </div>
      {
        profileOptVisible &&
          <div className={styles.profileOptions}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '90px' }}>
              <span>Cuenta</span>
              <span><box-icon name='window-open' color='white' size='20px' rotate='90' /></span>
            </div>
            <div>Perfil</div>
            <div>Configuración</div>
            <div
              style={{ borderTop: '1px solid #ffffff2e' }}
              onClick={() => deleteItem()}
            >
              Cerrar sesión
            </div>
          </div>
      }
    </>
  )
}
