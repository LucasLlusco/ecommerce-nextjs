import React from 'react'
import styles from './MyAccount.module.sass'

interface MyAccountLayoutProps {
  children: React.ReactNode; 
  ordersInfo: React.ReactNode; 
  userInfo: React.ReactNode; 
}

const MyAccountLayout = (props: MyAccountLayoutProps) => {
  return (
    <div className={styles.MyAccount}>
      {props.children}
      <main className={styles.MyAccount__panels}>
        {props.userInfo}
        {props.ordersInfo}
      </main>
    </div>
  );
}

export default MyAccountLayout