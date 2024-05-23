import React from 'react'
import Description from 'app/components/home/Description/Description'
import Hero from 'app/components/home/Hero/Hero'

const HomeLayout = ({children}: Readonly<{children: React.ReactNode;}>) => {
  return (
    <div>
      <Hero />
      <Description />
      {children}
    </div>
  )
}

export default HomeLayout