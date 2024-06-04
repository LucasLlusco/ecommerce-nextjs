import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductCard.module.sass'

interface ProductCardInterface {
  product: ProductType
}

const ProductCard = ({product}: ProductCardInterface) => {
  return (
    <article className={styles.ProductCard}>
      <Link href={`/product/${product.handle}?id=${product.id}`} className={styles.ProductCard__link}>
        <Image
          src={product.image}
          alt={product.title}
          quality={80}
          loading="eager"
          fill
        />
      </Link>
      <div className={styles.ProductCard__info}>
        <h3>{product.title}</h3>
      </div>
      <span className={styles.ProductCard__priceTag}>${product.price} USD</span>
    </article>
  )
}

export default ProductCard