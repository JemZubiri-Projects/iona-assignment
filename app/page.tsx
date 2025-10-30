import { fetchProducts } from '../lib/products'
import ProductGrid from '../components/ProductGrid'
import ProductControls from '../components/ProductControls'


export default async function Page() {
  const products = await fetchProducts(100)


  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <p className="text-sm text-slate-500">{products.length} items loaded</p>
      </div>
      <ProductControls initialProducts={products} />
    </section>
  )
}