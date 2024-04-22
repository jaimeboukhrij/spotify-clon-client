import { useContext } from 'react'
import styles from './actionBar.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
export function ActionBar ({ idToPlay, playOneTrack, type, deletePlay }) {
  const { isPlaying, runFirtsTrack, idPlayListTrack, updateTrackPlaying } = useContext(TrackPlayingContext)
  return (
    <article style={{ paddingLeft: '1%', display: 'flex', alignItems: 'center', gap: '25px' }}>
      <span
        onClick={() => playOneTrack ? updateTrackPlaying(idToPlay, 0, 'oneTrack') : runFirtsTrack(idToPlay, type)}
        className={styles.playIcon}
      ><box-icon name={(isPlaying && idPlayListTrack === idToPlay) ? 'pause' : 'play'} size='40px' />
      </span>
      {
deletePlay &&
  <span
    className={styles.heart}
    onClick={() => deletePlay(idToPlay)}
  >
    <box-icon name='trash' color='red' size='32px' className='heart' />
  </span>
      }
    </article>
  )
}
