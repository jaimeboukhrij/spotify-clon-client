import styles from './aside.module.css'
export function Section2 ({ setSpanHover, spanHover, filterRecentListened, filterType, createPlayList }) {
  return (
    <section className={styles.section2}>
      <article className={styles.article}>
        <div
          style={{ paddingLeft: '6%' }}
          onMouseEnter={() => setSpanHover(prev => ({ ...prev, tag: true }))}
          onMouseLeave={() => setSpanHover(prev => ({ ...prev, tag: false }))}
        >
          <span><box-icon name='bookmarks' color={spanHover.tag ? 'white' : '#a7a7a7'} /></span>
          <p>Tu biblioteca</p>
        </div>
        <div onClick={createPlayList}>
          <p>
            Crear PlayList
          </p>
        </div>
      </article>
      <article className={styles.article} style={{ gap: '6px', justifyContent: 'flex-start', paddingLeft: '6%' }}>
        {filterType && <button onClick={() => filterRecentListened(null)} style={{ width: '32px' }}>X</button>}
        {(filterType === 'playlist' || !filterType) &&
          <button
            onClick={() => filterRecentListened('playlist')}
            style={filterType === 'playlist' ? { backgroundColor: 'white', color: 'black' } : {}}
          >
            Listas
          </button>}
        {(filterType === 'artist' || !filterType) &&
          <button
            style={filterType === 'artist' ? { backgroundColor: 'white', color: 'black' } : {}}
            onClick={() => filterRecentListened('artist')}
          >Artistas
          </button>}
        {(filterType === 'album' || !filterType) &&
          <button
            style={filterType === 'album' ? { backgroundColor: 'white', color: 'black' } : {}}
            onClick={() => filterRecentListened('album')}
          >Álbumes
          </button>}
      </article>

    </section>
  )
}
