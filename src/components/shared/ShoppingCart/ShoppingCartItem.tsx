import { useShoppingCart } from 'app/hooks/useShoppingCart';
import Image from 'next/image'
import React from 'react'
import { FaRegTrashCan } from 'react-icons/fa6'
import styles from './ShoppingCartItem.module.sass'
import Link from 'next/link';


interface ShoppingCartItemProps {
  item: CartItem
}

const ShoppingCartItem = ({ item }: ShoppingCartItemProps)  => {
  const { removeCartItem } = useShoppingCart();

  return (
    <div className={styles.ShoppingCartItem}>
      <Image src={item.image} alt={item.title} width={48} height={48} />
      <div className={styles.ShoppingCartItem__itemInfo}>
        <Link href={`/product/${item.handle}?id=${item.id}`}>
          <p className={styles.ShoppingCartItem__title}>{item?.title}</p>
        </Link>
        <span className={styles.ShoppingCartItem__quantity}>x{item.quantity}</span>
      </div>
      <button onClick={() => removeCartItem(item)} className={styles.ShoppingCartItem__removeButton} aria-label='trash'>
        <FaRegTrashCan />
      </button>
    </div>
  )
}

export default ShoppingCartItem