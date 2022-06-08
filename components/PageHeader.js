import styles from '../styles/pageHeader.module.css'

const PageHeader = ({ settingsTab }) => {
  return (
    <div className={styles.pageHeader}>
      <div className={styles.pageContainer}>
        <h1 className={styles.title}>{settingsTab}</h1>
      </div>
    </div>
  )
}

export default PageHeader