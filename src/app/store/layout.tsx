import { getCollections } from "app/services/shopify/collections"
import Link from "next/link"
import styles from './storeLayout.module.sass'
import ChatLink from "app/components/store/ChatLink/ChatLink"

const Layout = async ({children}: {children:React.ReactNode}) => {
  const collections = await getCollections()

  return (
    <main className={styles.StoreLayout}>
      <h1>Explore</h1>
      <nav>
        <ul className={styles.StoreLayout__list}>
          {collections.map((collection: CollectionType) => (
            <Link key={collection.id} href={'/store/' + collection.handle} className={styles.StoreLayout__chip}>
              {collection.title}
            </Link>
          ))}          
        </ul>
        <ChatLink />
      </nav>
      {children}
    </main>
  )
}

export default Layout