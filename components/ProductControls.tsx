'use client'


import React, { useMemo, useState } from 'react'
import ProductGrid from './ProductGrid'
import type { Product } from '../lib/products'


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
        // search
        if (query.trim()) {
            const q = query.toLowerCase()
            items = items.filter(p => p.title.toLowerCase().includes(q) || (p.brand || '').toLowerCase().includes(q))
        }
        // category
        if (category !== 'all') items = items.filter(p => p.category === category)


        // sort
        if (sort === 'price-asc') items.sort((a, b) => a.price - b.price)
        else if (sort === 'price-desc') items.sort((a, b) => b.price - a.price)
        else if (sort === 'rating') items.sort((a, b) => (b.rating || 0) - (a.rating || 0))


        return items
    }, [initialProducts, query, category, sort])


    return (
        <div>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    aria-label="Search products"
                    placeholder="Search by title or brand"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="px-3 py-2 rounded border"
                />


                <select value={category} onChange={e => setCategory(e.target.value)} className="px-3 py-2 rounded border">
                    {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>


                <select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 rounded border">
                    <option value="featured">Featured</option>
                    <option value="price-asc">Price: low → high</option>
                    <option value="price-desc">Price: high → low</option>
                    <option value="rating">Top rated</option>
                </select>


                <div className="flex items-center gap-2">
                    <div className="text-sm text-slate-500">Showing</div>
                    <div className="font-medium">{filtered.length}</div>
                    <div className="text-sm text-slate-500">results</div>
                </div>
            </div>


            <ProductGrid products={filtered} />
        </div>
    )
}