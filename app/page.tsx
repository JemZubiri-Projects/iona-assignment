import { fetchProducts } from '../lib/products'
import ProductGrid from '../components/products/ProductGrid'
import ProductControls from '../components/products/ProductControls'


export default async function Page() {
  const products = await fetchProducts(200)
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
      </div>
      <ProductControls initialProducts={products} />
    </section>
  )
}