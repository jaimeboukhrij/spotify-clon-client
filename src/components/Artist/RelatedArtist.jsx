import { useContext } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import styles from '../../pages/artist/artist.module.css'
import { Link } from 'react-router-dom'

export function RelatedArtist ({ relatedArtist, divWidth, circuleImg, children, url }) {
  const { runFirtsTrack, isPlaying, idArtist, idPlayList } = useContext(TrackPlayingContext)
  console.log(relatedArtist)

  return (

    <article style={{ marginBottom: '30px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} className={styles.title}>
        {children}
        <h5 style={{ paddingRight: '3%' }}>Mostrar mas</h5>
      </div>
      <div
        className={styles.relatedArtists}
        style={{ gridTemplateColumns: `repeat(${parseInt(divWidth / 200)}, minmax(0, 1fr))` }}
      >
        {
          relatedArtist?.slice(0, parseInt(divWidth / 200)).map(({ id, name, urlImg, description }) => {
            description = description || 'Artista'
            if (description.length > 40) { description = `${description.substring(0, 40)}...` }
            if (name.length > 30) { name = `${name.substring(0, 20)}...` }
            return (
              <Link to={`/${url}/${id}`} key={id} className={styles.eachRelated}>
                <div style={{ backgroundImage: `url(${urlImg})`, borderRadius: circuleImg ? '100%' : '5px' }} className={styles.img}>
                  <span
                    onClick={(e) => {
                      e.preventDefault()
                      runFirtsTrack(id, url)
                    }}
                    className={styles.playIcon}
                  ><box-icon name={(!isPlaying || !(idArtist === id || idPlayList === id)) ? 'play' : 'pause'} size='40px' />
                  </span>
                </div>
                <span style={{ margin: '0', marginBottom: '6px', paddingLeft: '8%' }}>{name}</span>
                <p style={{ margin: '0', fontSize: '12px', paddingLeft: '8%', fontWeight: '0' }}>{description}</p>

              </Link>
            )
          })
      }
      </div>
    </article>
  )
}
