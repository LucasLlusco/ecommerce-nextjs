import React from 'react'
import Link from 'next/link'
import styles from './ChatLink.module.sass'

const ChatLink = () => {
  return (
    <Link className={styles.ChatLink} href='/chat'>
      Chat ✨
    </Link>  
  )
}

export default ChatLink