import { useContext } from 'react'
import styles from '../../pages/home/home.module.css'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Link } from 'react-router-dom'
export function Header ({ recentListened, setImgColor, setBgColor }) {
  const { runFirtsTrack, isPlaying, idArtist, idPlayList } = useContext(TrackPlayingContext)
  return (
    <article className={styles.header}>
      {
        recentListened?.slice(0, 8).map(elem => {
          return (
            <Link
              to={`/${elem.typeMusic}/${elem.id}`}
              onMouseEnter={() => {
                setImgColor(elem.urlImg)
              }}
              onMouseLeave={() => setBgColor([])}
              key={elem.id} className={styles.eachElem}
            >
              <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
                <img src={elem.urlImg} alt='playList image' />
                <p
                  style={{ fontSize: '13px' }}
                >{elem.name.length > 30 ? `${elem.name.substring(0, 15)}...` : elem.name}
                </p>
              </span>
              <span
                onClick={(e) => {
                  e.preventDefault()
                  runFirtsTrack(elem.id, elem.typeMusic)
                }}
                className={styles.playIcon}
              ><box-icon name={(!isPlaying || !(idArtist === elem.id || idPlayList === elem.id)) ? 'play' : 'pause'} size='30px' />
              </span>
            </Link>
          )
        })
      }
    </article>
  )
}
