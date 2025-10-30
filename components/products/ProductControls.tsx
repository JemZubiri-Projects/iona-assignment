'use client'

import React, { useMemo, useState } from 'react'
import ProductGrid from './ProductGrid'
import type { Product } from '../../lib/products'

export default function ProductControls({ initialProducts }: { initialProducts: Product[] }) {
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState('featured')

    const categories = useMemo(() => {
        const set = new Set(initialProducts.map(p => p.category || 'uncategorized'))
        return ['all', ...Array.from(set)]
    }, [initialProducts])

    const filtered = useMemo(() => {
        let items = initialProducts.slice()

        // Filter by search
        if (query.trim()) {
            const q = query.toLocaleLowerCase()
            items = items.filter(
                p =>
                    p.title.toLocaleLowerCase().includes(q) ||
                    (p.brand || '').toLocaleLowerCase().includes(q)
            )
        }

        // Sort by category
        if (category !== 'all') items = items.filter(p => p.category === category)

        // Sort by 
        if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
        else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
        else if (sort === 'rating') items.sort((a, b) => (b.rating || 0) - (a.rating || 0))

        return items
    }, [initialProducts, query, category, sort])

    return (
        <div>
            <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                <input
                    aria-label="Search products"
                    placeholder="Search by title or brand"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all outline-none text-sm"
                />

                <select
                    aria-label="Filter by category"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                >
                    {categories.map(c => (
                        <option key={c} value={c}>
                            {c === 'all' ? 'All categories' : c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                    ))}
                </select>

                <select
                    aria-label="Sort products"
                    value={sort}
                    onChange={e => setSort(e.target.value)}
                    className="px-4 py-2 rounded-xl border border-neutral-200 bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="rating">Top rated</option>
                </select>

                <div className="flex items-center justify-center sm:justify-end gap-1 text-sm text-neutral-600">
                    <span>Showing</span>
                    <span className="font-medium text-primary">{filtered.length}</span>
                    <span>results</span>
                </div>
            </div>

            <ProductGrid products={filtered} />
        </div>
    )
}
