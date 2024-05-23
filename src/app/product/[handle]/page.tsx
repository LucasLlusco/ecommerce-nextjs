import ProductView from 'app/components/product/ProductView/ProductView'
import { getProductById } from 'app/services/shopify/products'
import { redirect } from 'next/navigation'
import React from 'react'

interface ProductPageProps { 
  searchParams: {
    id: string
  }
}

export async function generateMetadata({ searchParams }: ProductPageProps) { 
  const id = searchParams.id
  const product = await getProductById(id);

  return { 
    title: product.title,
    description: product.description,
    keywords: product.tags,
    openGraph: { 
      images: [product.image] 
    }
  }
}

const ProductPage = async ({searchParams} : ProductPageProps) => {
  const id = searchParams.id;
  const product = await getProductById(id);

  if(!id) { 
    redirect("/")
  }

  return (
    <ProductView product={product} />
  )
}

export default ProductPage