"use client";
import { useState } from "react";
import { handleCreateUser } from "app/actions";
import styles from "./NewAccountForm.module.sass";
import Link from "next/link";

const NewAccountForm = () => {
  const [errors, setErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: {target: any, preventDefault: () => void}) => {
    event.preventDefault();
    setErrors([""]); 
    setLoading(true);
    try {
      const formData = new FormData(event.target);
      const {firstName, lastName, email, phone, password, password_confirmation} = Object.fromEntries(formData);

      if(firstName && lastName && email && phone && password && password_confirmation) {
        if(password === password_confirmation) { 
          const customer:any = await handleCreateUser(formData); 
          if(customer?.length >= 1) { 
            throw new Error(customer[0].message, { 
              cause: {customerErrors: customer} 
            });
          }
        } else {
          setErrors(["Las contraseñas no coinciden."]);
        }
      } else {
        setErrors(["El formulario esta incompleto"]);
      }
    } catch (error: any) {
      if(error?.cause?.customerErrors?.length >= 1) { 
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
    <div className={styles.NewAccountForm}  >
      <h1 className={styles.NewAccountForm__title}>New Account</h1>
      <form className={styles.NewAccountForm__form} onSubmit={handleSubmit}>
        <input type="text" name="firstName" placeholder="Name" disabled={loading} />
        <input type="text" name="lastName" placeholder="Lastname" disabled={loading} />
        <input type="text" name="email" placeholder="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" disabled={loading} />
        <input type="text" name="phone" placeholder="phone number" pattern="^[0-9]*$" disabled={loading} />
        <input type="password" name="password" placeholder="password" disabled={loading} />
        <input type="password" name="password_confirmation" placeholder="re-type password" disabled={loading} />
        <input type="submit" name="submit" value="Crear cuenta" disabled={loading} />
      </form>
      {errors.length > 0 && 
        <div>
          {errors.map((error, index) => {
            return <p key={index} className={styles.NewAccountForm__error}>{error}</p>
          })}
        </div>
      }
      <p className={styles.NewAccountForm__link}>Already a member?<Link href={"/login"}>Login</Link></p>
    </div>  
  )
}

export default NewAccountForm