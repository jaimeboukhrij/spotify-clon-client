import styles from '../../pages/playList/playList.module.css'
import msSecondsToHour from '../../utils/msSecondsToHour'

export function Header ({ playListInfo, tracks }) {
  return (
    <header className={styles.header}>
      <article className={styles.img} style={{ backgroundImage: `url(${playListInfo.urlImg})` }} />
      {tracks?.length
        ?
          <article className={styles.info}>
            <h2>{playListInfo.name}</h2>
            <p>{playListInfo.description}</p>
            <div className={styles.infoExtra}>
              <span>
                <i><box-icon type='logo' name='spotify' color='#1fdf64' /></i>
                <p>{playListInfo.owner}</p>
                ~
              </span>
              <span>{playListInfo.likes} me gusta ~ </span>
              <span>{tracks.length} canciones ~</span>
              <span
                style={{ color: 'rgb(255 255 255 / 69%' }}
                className={styles.time}
              >{msSecondsToHour(playListInfo.duration)} aproximadamente
              </span>
            </div>
          </article>
        : ''}
    </header>
  )
}
