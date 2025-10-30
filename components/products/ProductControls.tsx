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

        // Search
        if (query.trim()) {
            const q = query.toLowerCase()
            items = items.filter(p =>
                p.title.toLowerCase().includes(q) ||
                (p.brand || '').toLowerCase().includes(q)
            )
        }

        // Category
        if (category !== 'all') items = items.filter(p => p.category === category)

        // Sort
        if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
        else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
        else if (sort === 'rating') items.sort((a, b) => (b.rating || 0) - (a.rating || 0))

        return items
    }, [initialProducts, query, category, sort])

    const resetFilters = () => {
        setQuery('')
        setCategory('all')
        setSort('featured')
    }

    return (
        <div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                <input
                    aria-label="Search products"
                    placeholder="Search by title or brand"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-300 focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                />
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-300 bg-white appearance-none focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%2300B2A9\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 7l3 3 3-3\"/></svg>')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                >
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-300 bg-white appearance-none focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none transition-all"
                    style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"%2300B2A9\" height=\"20\" viewBox=\"0 0 20 20\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 7l3 3 3-3\"/></svg>')", backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1em' }}
                >
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low → high</option>
                    <option value="price-desc">Price: high → low</option>
                    <option value="rating">Top rated</option>
                </select>
                <button
                    onClick={resetFilters}
                    className="px-4 py-2 rounded-lg border border-primary text-primary font-medium hover:bg-primary hover:text-white transition-colors"
                >
                    Reset Filters
                </button>
                <div className="flex items-center justify-center md:justify-end gap-2 text-sm text-neutral-500">
                    <span>Showing</span>
                    <span className="font-semibold text-neutral-700">{filtered.length}</span>
                    <span>results</span>
                </div>
            </div>

            <ProductGrid products={filtered} />
        </div>
    )
}
