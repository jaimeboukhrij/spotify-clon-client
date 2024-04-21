/* eslint-disable react/jsx-closing-tag-location */
import { useContext } from 'react'
import styles from '../../pages/search/search.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Link } from 'react-router-dom'
import { TracksList } from '../tracksList/TracksList'
export function Header ({ searchInfo, setIsHoverTrack }) {
  const { runFirtsTrack, isPlaying, idArtist } = useContext(TrackPlayingContext)

  let artists, tracks
  if (searchInfo) {
    artists = searchInfo.artists
    tracks = searchInfo.tracks
  }
  return (
    artists &&
      <article className={styles.header}>
        <div className={styles.mainResult}>
          <h2>Resultado principal</h2>
          <Link to={`/artist/${artists?.[0].id}`} className={styles.body}>
            <img src={artists[0].urlImg} alt='' />
            <h5 style={{ color: 'white' }}>{artists[0].name}</h5>
            <h6>Artist</h6>
          </Link>
          <span
            onClick={(e) => {
              e.preventDefault()
              runFirtsTrack(artists?.[0].id, 'artist')
            }}
            className={styles.playIcon}
          ><box-icon name={isPlaying && idArtist === artists?.[0].id ? 'pause' : 'play'} size='40px' />
          </span>
        </div>
        <div className={styles.tracks}>
          <h2>Canciones</h2>

          <TracksList tracks={tracks} setIsHoverTrack={setIsHoverTrack} />
        </div>
      </article>
  )
}
