import styles from './login.module.css'
export function ContinueWith ({ width, padding, height, text }) {
  return (
    <article style={{ height }} className={styles.article}>
      <button style={{ width, padding }}>
        <span className={styles.logo_google} />
        <p style={{ fontWeight: '600', color: 'white' }}>{text} con Google</p>
      </button>
      <button style={{ width, padding }}>
        <span className={styles.logo_fb} />
        <p style={{ fontWeight: '600', color: 'white' }}>{text} con FaceBook</p>
      </button>
      <button style={{ width, padding }}>
        <span className={styles.logo_apple} />
        <p style={{ fontWeight: '600', color: 'white' }}>{text} con Apple</p>
      </button>
    </article>
  )
}
