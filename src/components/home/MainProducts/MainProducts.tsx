import React from 'react'
import styles from './MainProducts.module.sass'
import Image from 'next/image';
import { getMainProducts } from 'app/services/shopify/products';

interface Product {
  id: string,
  title: string,
  images: {src: string}[]; 
}

const MainProducts = async () => { 
  const products = await getMainProducts();

  return (
    <section className={styles.MainProducts}>
      <h3>✨ New products released!</h3>
      <div className={styles.MainProducts__grid}>
        {products?.map((product: Product) => {
          const imageSrc = product.images[0].src;
          return (
            <article key={product.id}>
              <p>{product.title}</p>
              <Image src={imageSrc} fill alt={product.title} loading="eager" />
            </article>
          )
        })}
      </div>
    </section>  
  )
}

export default MainProducts