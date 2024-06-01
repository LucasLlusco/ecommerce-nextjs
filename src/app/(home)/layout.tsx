import React from 'react'
import Description from 'app/components/home/Description/Description'
import Hero from 'app/components/home/Hero/Hero'
import styles from './homeLayout.module.sass'


const HomeLayout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div className={styles.HomeLayout}>
      <Hero />
      <Description />
      {children}
    </div>
  )
}

export default HomeLayout