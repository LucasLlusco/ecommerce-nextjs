import Chat from 'app/components/chat/Chat'
import { getProducts } from 'app/services/shopify/products'
import { createAgent } from 'app/utils/google/createAgent'
import React from 'react'

const ChatPage = async () => {
  const products = await getProducts()
  const productTitles = products.map((product: ProductType) => product.title)
  const flatProductTitles = productTitles.join("\n");
  const agent = createAgent(flatProductTitles)
 
  return (  
    <Chat agent={agent} /> 
  )
}

export default ChatPage