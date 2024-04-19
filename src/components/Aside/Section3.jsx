import { Link } from 'react-router-dom'
import { UseAside } from '../../hooks/UseAside'
import { SearchForm } from './SearchForm'
import styles from './aside.module.css'
import { useContext } from 'react'
import { TrackPlayingContext } from '../../contexts/trackPlaying'
export function Section3 ({ recentlyListened, filterListened, filterType, setQuery, query }) {
  const { isVisibleInput, setIsVisibleInput } = UseAside()
  const { isPlaying } = useContext(TrackPlayingContext)
  const showRecentListened = (filterType || query) ? filterListened : recentlyListened
  return (
    <section className={styles.section3}>
      <article className={styles.header}>
        <SearchForm isVisibleInput={isVisibleInput} setIsVisibleInput={setIsVisibleInput} setQuery={setQuery} query={query} />
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {
            isVisibleInput
              ? <p>Rec...</p>
              : <p>Recientes</p>
          }
          <span style={{ display: 'flex', alignItems: 'center' }}><box-icon name='list-ul' color='#a7a7a7' size='20px' /></span>
        </div>
      </article>
      <article style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        paddingLeft: '3%',
        maxHeight: isPlaying ? '445px' : 'none',
        overflowY: 'auto'
      }}
      >
        {
          showRecentListened?.map(({ id, name, typeMusic, urlImg }) => {
            return (
              <Link to={`${typeMusic}/${id}`} key={id} className={styles.card}>
                <img
                  src={urlImg} alt={`${name} image`}
                  style={{ borderRadius: typeMusic === 'artist' ? '50%' : '5px' }}
                />
                <span>
                  <h5 style={{ fontSize: '15px', color: 'white' }}>{name}</h5>
                  <p style={{ fontSize: '13px' }}>{typeMusic.charAt(0).toUpperCase() + typeMusic.slice(1)}</p>
                </span>
              </Link>
            )
          })
        }
      </article>
    </section>
  )
}
