import styles from './aside.module.css'

export function SearchForm ({ isVisibleInput, setIsVisibleInput, setQuery, query }) {
  return (

    <>
      <form
        className={styles.searchContainer} action='//llamaswill.tumblr.com/search'

      >
        <label
          htmlFor='search-box' className={styles.searchLabel} onClick={() => setIsVisibleInput(true)}
          style={{
            background: isVisibleInput && 'hsla(0,0%,100%,.1)',
            borderTopLeftRadius: isVisibleInput && '5px',
            borderBottomLeftRadius: isVisibleInput && '5px',
            pointerEvents: isVisibleInput && 'none'
          }}

        >
          <box-icon name='search' color='#a7a7a7' size='20px' />
        </label>
        <input
          id='search-box'
          type='text'
          className={`${styles.searchBox} ${isVisibleInput ? styles.visible : ''}`}
          name='q'
          placeholder='Buscar en Tu biblioteca'
          onBlur={() => !query && setIsVisibleInput(false)}
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
      </form>
    </>

  )
}
