import { Link } from 'react-router-dom'
import styles from '../../pages/album/album.module.css'

export function Header ({ albumInfo, albumTracks }) {
  return (
    <header className={styles.header}>
      <article className={styles.img} style={{ backgroundImage: `url(${albumInfo?.urlImg})` }} />
      <article className={styles.info}>
        <h2>{albumInfo.name}</h2>
        <div className={styles.infoExtra}>
          <span>
            {albumInfo.artist.map(elem => <span key={elem.id}><Link>{elem.name}</Link>~</span>)}
          </span>
          <span>{albumInfo.date.slice(0, 4)} ~ </span>
          <span>{albumInfo.tracks.length} {albumInfo.tracks.length > 1 ? 'canciones' : 'cancion'} </span>

        </div>
      </article>
    </header>
  )
}
