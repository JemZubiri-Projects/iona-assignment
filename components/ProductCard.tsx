'use client'

import Link from 'next/link'
import Image from 'next/image'
import type { Product } from '../lib/products'

export default function ProductCard({ product }: { product: Product }) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="group block rounded-2xl overflow-hidden bg-white border border-neutral-200 shadow-sm hover:shadow-md hover:border-primary-light transition-all duration-300 flex flex-col"
        >
            {/* Image section */}
            <div className="relative w-full aspect-[4/3] bg-neutral-100">
                {product.thumbnail ? (
                    <Image
                        src={product.thumbnail}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                ) : (
                    <div className="h-full w-full bg-neutral-200" />
                )}

                {/* subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
            </div>

            {/* Content section */}
            <div className="flex flex-col flex-1 p-4">
                <h3 className="text-base font-semibold line-clamp-2 text-neutral-800 group-hover:text-primary transition-colors">
                    {product.title}
                </h3>

                <p className="text-sm text-neutral-600 line-clamp-2 mt-1 flex-1">
                    {product.description}
                </p>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">${product.price}</span>
                    {product.rating && (
                        <span className="text-xs text-accent-dark flex items-center gap-1">
                            {product.rating.toFixed(1)}
                        </span>
                    )}
                </div>

                <div className="text-xs text-neutral-500 mt-2 truncate">
                    {product.brand} • {product.category}
                </div>

                {/* CTA Button */}
                <div className="mt-4">
                    <span className="inline-block bg-primary text-white text-sm font-medium py-2 px-4 rounded-lg text-center w-full group-hover:bg-primary-dark transition-colors">
                        View Details
                    </span>
                </div>
            </div>
        </Link>
    )
}
