/* eslint-disable react/jsx-closing-tag-location */
import { useContext } from 'react'
import styles from './nav.module.css'
import { AuthContext } from '../../contexts/auth.context'
import { Profile } from './Profile'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalVarContext } from '../../contexts/globalVar.context'
import { SearchContext } from '../../contexts/search.context'

export function Nav () {
  const context = useContext(AuthContext)
  const { navFilter, pageName, navColor } = useContext(GlobalVarContext)
  const { handleChange, query, inSearch } = useContext(SearchContext)
  const user = context?.user
  const navigate = useNavigate()
  return (
    <nav className={styles.nav} style={{ background: navColor }} id='nav'>
      <section className={styles.section1} style={{ justifyContent: !user && 'flex-start' }}>

        <div style={{ width: '14%', display: 'flex', justifyContent: 'center' }} className={styles.arrows}>
          <span onClick={() => navigate(-1)}>
            <box-icon name='chevron-left' color='white' size='30px' cursor='pointer' />
          </span>
          <span className={styles.rightArrow} onClick={() => navigate(+1)}>
            <box-icon name='chevron-right' color='white' size='30px' />
          </span>
        </div>
        {
          (user && pageName && navFilter) &&
            <h4 style={{ fontSize: '20px', position: 'absolute', left: '13%' }}>{pageName}</h4>
        }
        {
         (user) &&
           <div
             style={{
               opacity: inSearch ? 1 : 0,
               pointerEvents: inSearch ? 'auto' : 'none'
             }}
             className={styles.inputContainer}
           >
             <label htmlFor='search-box' className={styles.searchLabel}>
               <box-icon name='search' color='#a7a7a7' size='18px' />
             </label>
             <input
               onChange={handleChange}
               value={query}
               type='text' placeholder='¿Qué quieres reproducir?'
             />
           </div>
        }

      </section>
      <section className={styles.section2}>
        {
          user
            ? <>
              <div className={styles.instalarApp}>
                <span><box-icon name='down-arrow-circle' color='white' size='20px' /></span>
                <p style={{ fontSize: '13px', color: 'white', fontWeight: '700' }}>Instalar app</p>
              </div>
              <div className={styles.bell}>
                <box-icon name='bell' color='white' />
              </div>
              <Profile profileName={user.profileName} />
            </>
            : <div style={{ display: 'flex', gap: '8px' }}>
              <Link to='/signup' className={styles.signUpButton}>Registrarte</Link>
              <Link to='/login' className={styles.logInButton}>Iniciar Sesion</Link>
            </div>
}
      </section>
      {navFilter && <div className={styles.filter} />}

    </nav>
  )
}
