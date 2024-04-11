import styles from '../signup.module.css'
export function ErrorInputParts ({ children, width }) {
  return (
    <div className={styles.emailValidText}>
      <box-icon name='error-circle' size='20px' color='#f15e6c' />
      <p style={{ width }}>{children}</p>
    </div>
  )
}
