"use client"
import { handleSignout } from 'app/actions'
import React, { SyntheticEvent } from 'react'
import styles from "./SignoutForm.module.sass";
import { GoSignOut } from 'react-icons/go';

const SignoutForm = () => {

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    handleSignout()
  }

  return (
    <form onSubmit={handleSubmit} className={styles.SignoutForm}>
      <button type='submit'>
        <GoSignOut />
        <span>Signout</span>      
      </button>
    </form>
  )
}

export default SignoutForm