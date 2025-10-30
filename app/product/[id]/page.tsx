import { fetchProductById } from '../../../lib/products'
import Image from 'next/image'

interface Props {
    params: Promise<{ id: string }>
}

export default async function ProductPage({ params }: Props) {
    // Next.js 15 — params are now async
    const id = (await params).id
    const product = await fetchProductById(id)
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Image Section */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-neutral-100">
                {product.thumbnail ? (
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        width={800}
                        height={600}
                        className="object-cover w-full h-auto hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="bg-neutral-100 h-96 rounded" />
                )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col space-y-6">
                <div>
                    <h1 className="text-3xl font-semibold text-neutral-900">{product.title}</h1>
                    <p className="text-sm text-neutral-500 mt-1">
                        {product.brand} • {product.category}
                    </p>
                </div>

                <p className="text-base leading-relaxed text-neutral-700 border-t border-neutral-200 pt-4">
                    {product.description}
                </p>

                <div className="flex items-center justify-between border-t border-neutral-200 pt-6">
                    <div className="flex flex-col">
                        <span className="text-2xl font-bold text-primary">${product.price}</span>
                        <span className="text-xs text-neutral-500 mt-1">In stock: {product.stock}</span>
                    </div>

                    {product.rating && (
                        <span className="text-sm text-neutral-500">
                            ★ {product.rating.toFixed(1)}
                        </span>
                    )}
                </div>

                <button className="mt-6 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary/90 transition">
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
