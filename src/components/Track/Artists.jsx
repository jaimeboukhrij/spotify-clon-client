import styles from '../../pages/track/track.module.css'
import { Link } from 'react-router-dom'
export function Artists ({ artistsData }) {
  return (
    <article className={styles.artists}>
      {
        artistsData?.map(({ data }) => {
          const { id, name, imgUrl } = data
          return (
            <Link to={`/artist/${id}`} key={id} className={styles.eachArtist}>
              <img src={imgUrl} alt={`${name} img`} />
              <span>
                <p>Artista</p>
                <h5>{name}</h5>
              </span>

            </Link>
          )
        })
      }
    </article>
  )
}
