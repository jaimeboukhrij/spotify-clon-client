import styles from '../../pages/track/track.module.css'
import { secondsToMinute } from '../../utils/secondsToMinute'

export function Header ({ trackInfo, artistImg }) {
  return (
    trackInfo && artistImg &&
      <header className={styles.header}>
        <article className={styles.img} style={{ backgroundImage: `url(${trackInfo.urlImg})` }} />
        <article className={styles.info}>
          <h2>{trackInfo.name}</h2>
          <p>{trackInfo.description}</p>
          <div className={styles.infoExtra}>
            <span>
              <img
                src={artistImg} alt='ArtisImg'
                style={{ borderRadius: '9999px', width: '30px', height: '30px' }}
              />
              <p>{trackInfo.owner[0][1]}</p>
              <span>~</span>
            </span>
            <span>{trackInfo.album[1]}  </span>
            <span>~</span>
            <span>{trackInfo.date.substring(0, 5)} </span>
            <span>~</span>

            <span
              style={{ color: 'rgb(255 255 255 / 69%' }}
              className={styles.time}
            >{secondsToMinute(trackInfo.duration)}
            </span>
          </div>
        </article>
      </header>
  )
}
