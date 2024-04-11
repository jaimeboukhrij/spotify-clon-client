import styles from '../../pages/artist/artist.module.css'
export function Header ({ artist }) {
  return (
    <header
      className={styles.header}
      style={{ backgroundImage: `url(${artist?.headerImage})` }}
    >
      <article className={styles.info}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '24px', height: '23px' }}>
            <div className={styles.bg} />
            <span className='material-icons' style={{ color: '#3d91f4', fontSize: '32px', zIndex: '2' }}>
              verified
            </span>
          </span>
          <p>Artista verificado</p>
        </div>
        <h2>{artist?.name}</h2>
        <p>{artist?.followers.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} oyentes mensuales </p>
      </article>
    </header>
  )
}
