import React from 'react'
import styles from './ProductsWrapper.module.sass'
import ProductCard from '../ProductCard/ProductCard'

interface ProductsWrapperProps {
  products: ProductType[]
}

const ProductsWrapper = ({products}: ProductsWrapperProps) => {
  return (
    <div className={styles.ProductsWrapper}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product}/>
      ))}
    </div>
  )
}

export default ProductsWrapper