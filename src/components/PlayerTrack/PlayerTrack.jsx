/* eslint-disable react/jsx-closing-tag-location */
import { useContext } from 'react'
import styles from './playerTrack.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Link } from 'react-router-dom'
import { VolumeBar } from '../VolumeBar/VolumeBar'
export function PlayerTrack () {
  const { trackPlaying, isPlaying, runTrack, runNextTrack, runPrevTrack, currentTime, duration, typeMusic } = useContext(TrackPlayingContext)
  return (
    trackPlaying &&
      <footer className={styles.main}>
        <article className={styles.track}>
          <img src={trackPlaying.urlImg} alt='' />
          <div>
            <Link
              to={`/track/${trackPlaying.id}`}
            ><span>{trackPlaying.name.length > 20 ? `${trackPlaying.name.substring(0, 15)}...` : trackPlaying.name}</span></Link>
            <Link
              to={`/artist/${trackPlaying.owner[0][0]}`}
            ><p style={{ margin: '0' }}>{trackPlaying?.owner[0][1]}</p></Link>
          </div>
          <div
            style={{ cursor: 'pointer' }}
            className={styles.plusIcon}
          ><box-icon name='plus-circle' color='white' size='20px' />
          </div>
        </article>
        <article style={{ width: '45%', flexDirection: 'column' }}>
          <div
            className={styles.playIcons}
          >
            <span
              style={{
                cursor: typeMusic === 'oneTrack' ? 'no-drop' : 'pointer'
              }}
            >
              <i
                onClick={() => runPrevTrack(trackPlaying.id)}
                style={{
                  fontSize: '36px',
                  pointerEvents: typeMusic === 'oneTrack' ? 'none' : 'auto',
                  cursor: typeMusic === 'oneTrack' ? 'no-drop' : 'pointer'
                }}
                className='material-icons skip_previous'
              >skip_previous
              </i>
            </span>
            <span><i
              onClick={() => runTrack()}
              style={{ fontSize: '36px' }}
              className='material-icons pause'
                  >{isPlaying ? 'pause_circle' : 'play_circle'}
            </i>
            </span>
            <span
              style={{
                cursor: typeMusic === 'oneTrack' ? 'no-drop' : 'pointer'
              }}
            >
              <i
                style={{
                  fontSize: '36px'
                }}
                className='material-icons skip_next'
                onClick={() => runNextTrack(trackPlaying.id)}
              >skip_next
              </i>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', height: '10px', gap: '5px', justifyContent: 'center' }}>
            <span style={{ fontSize: '15px' }}>
              0:{parseInt(currentTime) < 10 && 0}{parseInt(currentTime)}
            </span>
            <div className={styles.progresBar}>
              <div className={styles.progressFill} style={{ width: `${(currentTime / duration) * 100}%` }} />
            </div>
            <span style={{ fontSize: '15px' }}>0:{parseInt(duration)}</span>
          </div>
        </article>
        <article className={styles.multipleIcons}>
          <span><i style={{ fontSize: '20px' }} className='material-icons mic'>mic</i></span>
          <span className={styles.volumeBar}><VolumeBar /></span>
          {/* <span><i style={{ fontSize: '20px' }} className='material-icons volume_off'>volume_off</i></span> */}
          <span><i style={{ fontSize: '20px' }} className='material-icons fullscreen'>fullscreen</i></span>

        </article>
      </footer>
  )
}
