import ProductsWrapper from "app/components/store/ProductsWrapper/ProductsWrapper"
import { getCollectionProducts, getCollections } from "app/services/shopify/collections"
import { getProducts } from "app/services/shopify/products"

interface CategoriesProps { 
  params: { 
    categories: string[],
  },
  searchParams?: string
}

const Category = async ({params}: CategoriesProps) => {
  const categories = params.categories; 
  let products = [];
  const collections = await getCollections(); 

  if(categories?.length > 0) { 
    const selectedCollectionId = collections.find((collection: CollectionType) => collection.handle === categories[0]).id;
    products = await getCollectionProducts(selectedCollectionId);
  } else { 
    products = await getProducts();
  }

  return (
    <ProductsWrapper products={products} />
  )
}

export default Category