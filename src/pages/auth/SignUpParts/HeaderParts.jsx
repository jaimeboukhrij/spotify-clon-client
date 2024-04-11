import styles from '../signup.module.css'

export function HeaderParts ({ part, setPart, children }) {
  return (
    <>
      <div className={styles.barra}>
        <div className={styles.relleno} style={{ width: '33%' }} />
      </div>
      <article className={styles.contentPart}>
        <div className={styles.contentDiv}>
          <p style={{ margin: '0' }}>Paso {part} de 3</p>
          <span style={{ minWidth: '160px' }}>{children}</span>
        </div>
        <div
          style={{ cursor: 'pointer', position: 'relative', right: '64%' }}
          onClick={() => setPart(prePart => prePart - 1)}
        >
          <box-icon name='chevron-left' size='md' flip='vertical' color='#a7a7a7' />
        </div>
      </article>
    </>
  )
}
