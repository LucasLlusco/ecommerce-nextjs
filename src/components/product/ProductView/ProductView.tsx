import React from 'react'
import styles from './ProductView.module.sass'
import Image from 'next/image'
import ProductViewItemsOrder from './ProductViewItemsOrder'
import SanitizeHTML from 'app/components/shared/SanitizeHTML/SanitizeHTML'

interface ProductViewProps {
  product: ProductType
}

const ProductView = ({product}: ProductViewProps) => {
  return (
    <main className={styles.ProductView}>
      <section className={styles.ProductView__images}>
        <Image
          src={product.image}
          alt={product.title}
          quality={80}
          loading="eager"
          fill
        />
      </section>
      <section className={styles.ProductView__info}>
        <h1 className={styles.ProductView__info__title}>{product.title}</h1>
        <p className={styles.ProductView__info__category}>{product.tags}</p>
        <SanitizeHTML tag='p' className={styles.ProductView__info__description}>
          {product.description}
        </SanitizeHTML>
        <span className={styles.ProductView__info__price}>
          $ {product.price}
        </span>
        <ProductViewItemsOrder maxQuantity={product.quantity} product={product} />
      </section>
    </main>
  )
}

export default ProductView