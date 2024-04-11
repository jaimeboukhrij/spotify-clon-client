/* eslint-disable react/jsx-closing-tag-location */
import { Link } from 'react-router-dom'
import styles from '../../pages/artist/artist.module.css'
import { secondsToMinute } from '../../utils/secondsToMinute'
import { useContext, useState } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'

export function Tracks ({ tracks, setIsHoverTrack }) {
  const { updateTrackPlaying, isPlaying, trackPlaying } = useContext(TrackPlayingContext)
  const [arrLimit, setArrLimit] = useState(5)

  return (
    <article
      className={styles.allTracks} id='allTracksContainer'
      style={{ paddingBottom: trackPlaying ? '64px' : '0' }}
    >
      <h2 style={{ paddingLeft: '1%' }}>Populares</h2>
      {
      tracks.slice(0, arrLimit).map(({ trackName, duration, trackId, album, urlImg, isHover }, index) => {
        return (
          <div
            key={trackId} className={styles.eachTrack}
            onMouseEnter={() => setIsHoverTrack(index, true)} onMouseLeave={() => setIsHoverTrack(index, false)}
          >
            <div
              className={styles.index}
              style={{ color: trackId === trackPlaying?.id ? '#1fdf64' : 'white' }}
            >
              {
                isHover
                  ? <i
                      onClick={() => updateTrackPlaying(trackId, index, 'artist')}
                      className='material-icons pause'
                    >{trackId === trackPlaying?.id && isPlaying ? 'pause' : 'play_arrow'}
                  </i>
                  : trackId === trackPlaying?.id && isPlaying
                    ? <div className={styles.loading_wave}>
                      <div className={styles.loading_bar} />
                      <div className={styles.loading_bar} />
                      <div className={styles.loading_bar} />
                      <div className={styles.loading_bar} />
                    </div>
                    : index + 1
              }
            </div>

            <div className={styles.tittle}>
              <img src={urlImg} alt='' />
              <div>
                <Link to={`/track/${trackId}`} style={{ color: trackId === trackPlaying?.id ? '#1fdf64' : 'white', fontWeight: '700' }}>
                  {trackName.length > 40 ? `${trackName.substring(0, 30)}...` : trackName}</Link>

              </div>
            </div>
            <Link className={styles.album}>{album[0].length > 30 ? `${album[0].substring(0, 30)}...` : album[0]}</Link>
            <p className={styles.duration}>
              <box-icon name='heart' color='white' className='icon' />
              {secondsToMinute(duration)}
            </p>
          </div>
        )
      })
    }
      {
        tracks.length > 5 &&
          <p
            onClick={() => setArrLimit(prev => {
              if (prev === 5) { return 11 } else { return 5 }
            })}
            className={styles.seeMore}
          >{arrLimit === 5 ? 'Ver mas' : 'Ver menos'}

          </p>
}
    </article>
  )
}
