import { Link } from 'react-router-dom'
import { UseCategories } from '../../hooks/UseCategories'
import styles from './categories.module.css'
import { useContext } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
import { Footer } from '../../components/Footer/Footer'
export function Categories () {
  const { allCategories } = UseCategories()
  const { trackPlaying } = useContext(TrackPlayingContext)

  return (

    <section style={{ overflow: 'hidden auto', height: '100%' }}>
      <h3>Explorar todo</h3>
      <section
        className={styles.section}
        style={{ paddingBottom: trackPlaying ? '80px' : '3%' }}
      >
        {
          allCategories.map(({ name, urlImg, id }) => {
            return (
              <Link
                to={`/genre/${id}`}
                key={id} style={{ backgroundImage: `url(${urlImg})` }} className={styles.eachCategory}
              >
                <p>{name}</p>
              </Link>
            )
          })
      }
      </section>
      <Footer />
    </section>
  )
}
