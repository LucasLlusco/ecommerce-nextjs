"use client"
import React, { useState } from 'react'
import { FaShoppingCart } from 'react-icons/fa';
import styles from './ShoppingCart.module.sass'
import { useShoppingCart } from 'app/hooks/useShoppingCart';
import { handleCreateCart } from 'app/actions';
import ShoppingCartItem from './ShoppingCartItem';


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
    <button className={styles.ShoppingCart} onClick={handleOpen}>
      {hasItems && (
        <span className={styles.ShoppingCart__counter}>
          {cart.length}
        </span>
      )}
      <FaShoppingCart />
      {isOpen && hasItems && (
        <div className={styles.ShoppingCart__items}>
          {cart.map(item => (
            <ShoppingCartItem key={item.id} item={item} />
          ))}
          <button onClick={handleBuy}  className={styles.ShoppingCart__buyButton} disabled={isBuying}>
            Buy
          </button>
        </div>
      )}
    </button>
  )
}

export default ShoppingCart