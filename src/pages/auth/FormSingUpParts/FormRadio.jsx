import styles from '../signup.module.css'

export function FormRadio ({ name, label, width, value, onChange, checked }) {
  return (
    <div style={{ width }}>
      <input type='radio' name={name} className={styles.radio} value={value} onChange={onChange} checked={checked} />
      <span>{label}</span>
    </div>
  )
}
