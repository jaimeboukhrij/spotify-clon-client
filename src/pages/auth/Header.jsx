import { useNavigate } from 'react-router'
import styles from './login.module.css'
import logo from '../../assets/spotyfi-logo.png'
export function Header () {
  const navigate = useNavigate()
  return (
    <header className={styles.header}>
      <img src={logo} alt='spotify-logo' className={styles.logo_spotify} onClick={() => navigate('/')} />
    </header>
  )
}
