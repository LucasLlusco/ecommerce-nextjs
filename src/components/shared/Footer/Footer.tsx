import React from 'react'
import styles from './Footer.module.sass';


const Footer = () => {
  return (
    <footer className={styles.Footer}>
      <p>Future World © {new Date().getFullYear()}</p>
    </footer>
  )
}

export default Footer