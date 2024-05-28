"use client"
import { handleLogin } from "app/actions";
import { useState } from "react";
import styles from "./LoginForm.module.sass";
import Link from "next/link";

const LoginForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: {target: any, preventDefault: () => void}) => {
    event.preventDefault();
    setErrors([""]); 
    setLoading(true);
    try {
      const formData = new FormData(event.target);
      const {email, password} = Object.fromEntries(formData);
      if(email && password) {
        const customer:any = await handleLogin(formData);
        if(customer?.length >= 1) {
          throw new Error(customer[0].message, { 
            cause: {customerErrors: customer}
          });
        }
      } else {
        setErrors(["El formulario esta incompleto"]);
      }
    } catch (error:any) {
      if(error?.cause?.customerErrors?.length >= 1)  {
        const customerErrorMsgs = error.cause.customerErrors.map((err:any) => {
          return err.message
        })
        setErrors(customerErrorMsgs);
      } else { 
        setErrors(["Lo sentimos hubo un error, intenta de nuevo."]);
      } 
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.NewAccountForm}>
      <h1 className={styles.NewAccountForm__title}>Login</h1>
      <form onSubmit={handleSubmit} className={styles.NewAccountForm__form}>
        <input type="text" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" disabled={loading} />
        <input type="password" name="password" placeholder="password" disabled={loading}/>
        <input type="submit" name="submit" value="Login" disabled={loading}  />
      </form>
      {errors.length > 0 && 
        <div>
          {errors.map((error, index) => {
            return <p key={index} className={styles.NewAccountForm__error}>{error}</p>
          })}
        </div>
      }
      <p className={styles.NewAccountForm__link}>Don&apos;t have an account yet?<Link href="/signup">Sign up</Link></p>
    </div>
  )
}

export default LoginForm