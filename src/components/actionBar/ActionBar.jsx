import { useContext } from 'react'
import styles from './actionBar.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
export function ActionBar ({ idToPlay, playOneTrack, type }) {
  const { isPlaying, runFirtsTrack, idPlayListTrack, updateTrackPlaying } = useContext(TrackPlayingContext)
  return (
    <article style={{ paddingLeft: '1%', display: 'flex', alignItems: 'center', gap: '25px' }}>
      <span
        onClick={() => playOneTrack ? updateTrackPlaying(idToPlay) : runFirtsTrack(idToPlay, type)}
        className={styles.playIcon}
      ><box-icon name={(isPlaying && idPlayListTrack === idToPlay) ? 'pause' : 'play'} size='40px' />
      </span>
      <span className={styles.heart}>
        <box-icon name='heart' color='white' size='40px' className='heart' />
      </span>
    </article>
  )
}
