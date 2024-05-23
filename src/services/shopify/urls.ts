import { env } from "app/config/env"

export const shopifyUrls = {
  products: {
    'all': `https://${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/products.json`,
    'byId': (id:string) => `https://${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/products.json?ids=${id}`,
    'mainProducts': `https://${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/collections/473914507557/products.json`,

  },
  collections: {
    'all': `https://${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/smart_collections.json`,
    'products': (id:string) => `https://${env.SHOPIFY_HOSTNAME}/admin/api/2023-10/collections/${id}/products.json`
  }
}
