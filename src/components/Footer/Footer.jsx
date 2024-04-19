import { Link } from 'react-router-dom'
import styles from './footer.module.css'
export function Footer () {
  return (
    <footer className={styles.container}>
      <section className={styles.firstRow}>
        <article className={styles.col}>
          <h6>Empresa</h6>
          <p>Acerca de</p>
          <p>Empleo</p>
          <p>For the Record</p>
        </article>
        <article className={styles.col}>
          <h6>Comunidades</h6>
          <p>Para artistas</p>
          <p>Desarrolladores</p>
          <p>Publicidad</p>
          <p>Inversores</p>
          <p>Proveedores</p>
        </article>
        <article className={styles.col}>
          <h6>Enlaces útiles</h6>
          <p>Asistencia</p>
          <p>App gratis para móvil</p>
        </article>
        <article className={styles.col}>
          <h6>Planes de Spotify</h6>
          <p>Premium Inidividual</p>
          <p>Premiun Duo</p>
          <p>Premium Famliar</p>
          <p>Premium para Estudiantes</p>
          <p>Spotify Free</p>
        </article>
        <article
          className={styles.col}
          style={{ display: 'flex', alignItems: 'flex-start', gap: '2px', justifyContent: 'center' }}
        >
          <Link to='https://www.instagram.com/spotify/' target='_blank'>
            <box-icon name='instagram' type='logo' color='white' />
          </Link>
          <Link to='https://twitter.com/spotify' target='_blank'><box-icon type='logo' name='twitter' color='white' />
          </Link>
          <Link
            to='https://www.facebook.com/SpotifyEspana/?brand_redir=6243987495' target='_blank'
          ><box-icon type='logo' name='facebook' color='white' />
          </Link>
        </article>
      </section>
    </footer>
  )
}
