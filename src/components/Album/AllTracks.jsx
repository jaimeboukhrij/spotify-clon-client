/* eslint-disable react/jsx-closing-tag-location */
import { Link } from 'react-router-dom'
import styles from '../../pages/album/album.module.css'
import { secondsToMinute } from '../../utils/secondsToMinute'
import { useContext } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'

export function AllTracks ({ tracks, setIsHoverTrack }) {
  const { updateTrackPlaying, isPlaying, trackPlaying } = useContext(TrackPlayingContext)

  return (
    <article
      className={styles.allTracks} id='allTracksContainer'
      style={{ paddingBottom: trackPlaying ? '64px' : '0' }}
    >
      <div
        className={styles.eachTrack} style={{
          borderBottom: '1px solid #80808078',
          padding: '0',
          paddingLeft: '3%',
          background: 'transparent',
          cursor: 'default'
        }}
      >
        <span style={{ display: 'flex', gap: '20px' }}>
          <p className={styles.index}>#</p>
          <p className={styles.tittle}>Título</p>
        </span>

        <p style={{
          display: 'flex',
          justifyContent: 'left',
          alignItems: 'center',
          width: '11%'
        }}
        ><box-icon name='stopwatch' color='#a7a7a7' />
        </p>
      </div>
      {
      tracks?.map(({ trackName, duration, trackId, isHover, artist }, index) => {
        const artistName = artist.map(elem => elem.name)
        return (
          <div
            key={trackId} className={styles.eachTrack}
            onMouseEnter={() => setIsHoverTrack(index, true)} onMouseLeave={() => setIsHoverTrack(index, false)}
          >
            <article style={{ display: 'flex', gap: '20px' }}>
              <div
                className={styles.index}
                style={{ color: trackId === trackPlaying?.id ? '#1fdf64' : '#a7a7a7' }}
              >
                {
                isHover
                  ? <i
                      onClick={() => updateTrackPlaying(trackId, index, 'album')}
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
                <div>
                  <Link to={`/track/${trackId}`} style={{ color: trackId === trackPlaying?.id ? '#1fdf64' : 'white', fontWeight: '700' }}>
                    {trackName.length > 40 ? `${trackName.substring(0, 30)}...` : trackName}</Link>
                  <div style={{ display: 'flex' }}>
                    {
                      artistName.map((ele, index) => {
                        return <Link key={index}>{ele}{index < artistName.length - 1 && ','}</Link>
                      })
                    }
                  </div>
                </div>
              </div>
            </article>
            <p className={styles.duration}>
              <box-icon name='heart' color='white' className='icon' />
              {secondsToMinute(duration)}
            </p>
          </div>
        )
      })
    }

    </article>
  )
}
