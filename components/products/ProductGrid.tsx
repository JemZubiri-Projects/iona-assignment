'use client'


import React from 'react'
import type { Product } from '../../lib/products'
import ProductCard from './ProductCard'


export default function ProductGrid({ products }: { products: Product[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => (
                <ProductCard key={p.id} product={p} />
            ))}
        </div>
    )
}