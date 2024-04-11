import styles from './aside.module.css'
export function Section2 ({ setSpanHover, spanHover }) {
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
        <div>
          <span
            onMouseEnter={() => setSpanHover(prev => ({ ...prev, plus: true }))}
            onMouseLeave={() => setSpanHover(prev => ({ ...prev, plus: false }))}
          ><box-icon name='plus' color={spanHover.plus ? 'white' : '#a7a7a7'} />
          </span>
          <span
            onMouseEnter={() => setSpanHover(prev => ({ ...prev, arrow: true }))}
            onMouseLeave={() => setSpanHover(prev => ({ ...prev, arrow: false }))}
          ><box-icon name='right-arrow-alt' color={spanHover.arrow ? 'white' : '#a7a7a7'} />
          </span>
        </div>
      </article>
      <article className={styles.article} style={{ gap: '6px', justifyContent: 'flex-start', paddingLeft: '6%' }}>
        <button>Listas</button>
        <button>Artistas</button>
      </article>
    </section>
  )
}
