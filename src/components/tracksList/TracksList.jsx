/* eslint-disable react/jsx-closing-tag-location */
import { useContext } from 'react'
import styles from './tracksList.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Link } from 'react-router-dom'
import { secondsToMinute } from '../../utils/secondsToMinute'
export function TracksList ({ tracks, setIsHoverTrack, children }) {
  const { updateTrackPlaying, isPlaying, trackPlaying } = useContext(TrackPlayingContext)

  return (
    <div style={{ marginTop: '20px' }}>
      {children && <h4 style={{ fontSize: '25px', margin: '0', marginBottom: '10px' }}>{children}</h4>}
      {tracks?.slice(0, 5).map(({ name, duration, id, isHover, owner, urlImg }, index) => {
        const artistName = owner.slice(0, 2).map(elem => elem.name)
        return (
          <div key={id} className={styles.eachTrack}>
            <article style={{ display: 'flex', gap: '10px' }}>
              <div
                className={styles.index}
                style={{ color: id === trackPlaying?.id ? '#1fdf64' : '#a7a7a7' }}
              >
                <i
                  onClick={() => updateTrackPlaying(id, index, 'artist', owner[0].id)}
                  className='material-icons pause'
                >{id === trackPlaying?.id && isPlaying ? 'pause' : 'play_arrow'}
                </i>
                {id === trackPlaying?.id && isPlaying
                  ? <div className={styles.loading_wave}>
                    <div className={styles.loading_bar} />
                    <div className={styles.loading_bar} />
                    <div className={styles.loading_bar} />
                    <div className={styles.loading_bar} />
                  </div>
                  : <img src={urlImg} alt='imagen artista' />}

              </div>

              <div className={styles.tittle}>
                <Link to={`/track/${id}`} style={{ color: id === trackPlaying?.id ? '#1fdf64' : 'white', fontWeight: '700' }}>
                  {name.length > 40 ? `${name.substring(0, 20)}...` : name}
                </Link>
                <div style={{ display: 'flex' }}>
                  {
                    artistName.map((ele, index) => {
                      return <Link to={`/artist/${owner[index].id}`} key={index}>{ele}{index < artistName.length - 1 && ','}</Link>
                    })
                  }
                </div>
              </div>
            </article>
            <p className={styles.duration}>
              <box-icon name='heart' color='white' className='icon' />
              {secondsToMinute(duration)}
            </p>
          </div>
        )
      })}
    </div>
  )
}
