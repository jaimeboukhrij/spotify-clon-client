/* eslint-disable react/jsx-closing-tag-location */
import { Link } from 'react-router-dom'
import styles from '../../pages/playList/playList.module.css'
import { secondsToMinute } from '../../utils/secondsToMinute'
import { transformDate } from '../../utils/transformDate'
import { useContext } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'

export function AllTracks ({ tracks, setIsHoverTrack, playListInfo }) {
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
          paddingLeft: '1%',
          background: 'transparent',
          cursor: 'default'
        }}
      >
        <p className={styles.index}>#</p>
        <p className={styles.tittle}>Título</p>
        <p className={styles.album}>Álbum</p>
        <p className={styles.date}>Fecha en la que salio</p>
        <p style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '11%'
        }}
        ><box-icon name='stopwatch' color='#a7a7a7' />
        </p>
      </div>
      {
      tracks.map(({ trackName, duration, date, trackId, artistTrack, artistTrackId, album, urlImg, isHover, idArtists }, index) => {
        let artists = artistTrack.map((elem, index) => elem).join(',')
        if (artists.length > 20) { artists = `${artists.substring(0, 19)}...` }
        if (trackName.length > 25) { trackName = `${trackName.substring(0, 25)}...` }
        const arrArtist = artists.split(',')

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
                      onClick={() => updateTrackPlaying(trackId, index, 'playlist')}
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
                <Link to={`/track/${trackId}`} style={{ color: trackId === trackPlaying?.id ? '#1fdf64' : 'white', fontWeight: '700' }}>{trackName}</Link>
                <p className={styles.artists}>
                  {arrArtist.map((elem, id) => {
                    return (
                      <Link
                        to={`/artist/${artistTrackId[id]}`} key={id}
                      >{elem}{id <= arrArtist.length - 2 && ','}</Link>
                    )
                  })}
                </p>
              </div>
            </div>
            <Link className={styles.album}>{album.length > 20 ? `${album.substring(0, 15)}...` : album}</Link>
            <p className={styles.date}>hace {transformDate(date)}</p>
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
