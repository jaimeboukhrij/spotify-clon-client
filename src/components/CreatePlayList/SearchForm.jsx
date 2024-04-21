import { useContext } from 'react'
import styles from '../../pages/createPlayList/createPlayList.module.css'
import { SearchContext } from '../../contexts/search.context'

export function SearchForm ({ isVisibleInput = true }) {
  const { query, setQuery } = useContext(SearchContext)
  return (

    <article style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '40px' }}>
      <form
        className={styles.searchContainer} action='//llamaswill.tumblr.com/search'

      >
        <label
          htmlFor='search-box' className={styles.searchLabel}
          style={{
            background: 'hsla(0,0%,100%,.1)',
            borderTopLeftRadius: '5px',
            borderBottomLeftRadius: '5px',
            pointerEvents: 'none'
          }}

        >
          <box-icon name='search' color='#a7a7a7' size='20px' />
        </label>
        <input
          id='search-box'
          type='text'
          className={`${styles.searchBox} ${isVisibleInput ? styles.visible : ''}`}
          name='q'
          placeholder='Buscar canciones'
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>
      <i style={{ cursor: 'pointer' }} onClick={() => setQuery('')}>
        <box-icon name='x' color='white' size='30px' />
      </i>
    </article>

  )
}
