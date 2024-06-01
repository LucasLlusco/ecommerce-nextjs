"use client"
import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from './ShoppingCart.module.sass'
import { useShoppingCart } from 'app/hooks/useShoppingCart';
import { handleCreateCart } from 'app/actions';
import ShoppingCartItem from './ShoppingCartItem';
import Link from 'next/link';


const ShoppingCart = () => {
  const { cart } = useShoppingCart();
  const [isOpen, setIsOpen] = useState(false);
  const [isBuying, setIsBuying] = useState(false);  
  const hasItems = cart.length > 0;
  const handleOpen = () => setIsOpen(!isOpen); 

  const handleBuy = async () => {
    try {
      setIsBuying(true);
      const checkoutUrl = await handleCreateCart(cart); 
      if(!checkoutUrl) throw new Error('Error creating checkout'); 
      
      window.localStorage.removeItem('cart'); 
      window.location.href = checkoutUrl; 
    } catch (error) {
      console.log(error);
    } finally {
      setIsBuying(false);
    }
  }

  return (
    <div className={styles.ShoppingCart}>
      <button className={styles.ShoppingCart__iconButton} onClick={handleOpen}>
        {hasItems && (
          <span className={styles.ShoppingCart__counter}>
            {cart.length}
          </span>
        )}
        <FaShoppingCart />
      </button>
      {isOpen && (
        <div className={styles.ShoppingCart__items}>
        {hasItems ? (
          <>
            {cart.map(item => (
              <ShoppingCartItem key={item.id} item={item} />
            ))}
            <button onClick={handleBuy} className={styles.ShoppingCart__buyButton} disabled={isBuying}>
              Buy
            </button>          
          </>
        ) : (
          <div className={styles.ShoppingCart__empty}>
            <p>No hay productos en el Carrito</p>
            <Link href={"/store"} className={styles.ShoppingCart__buyButton}>Explorar productos</Link>
          </div>
        )}
        </div>
      )}
    </div>
  )
}

export default ShoppingCart