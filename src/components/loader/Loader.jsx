import styles from './loader.module.css'
export function Loader () {
  return (
    <svg viewBox='25 25 50 50' className={styles.circle}>
      <circle r='20' cy='50' cx='50' className={styles.svg} />
    </svg>
  )
}
