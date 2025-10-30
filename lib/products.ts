export type Product = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage?: number;
    rating?: number;
    stock?: number;
    brand?: string;
    category?: string;
    thumbnail?: string;
    images?: string[];
};


const BASE = 'https://dummyjson.com';


export async function fetchProducts(limit = 100): Promise<Product[]> {
    const res = await fetch(`${BASE}/products?limit=${limit}`, { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch products');
    const json = await res.json();
    return json.products as Product[];
}


export async function fetchProductById(id: string | number): Promise<Product> {
    const res = await fetch(`${BASE}/products/${id}`, { cache: 'force-cache' });
    if (!res.ok) throw new Error('Failed to fetch product');
    return (await res.json()) as Product;
}


export async function fetchProductsByCategory(category: string): Promise<Product[]> {
    const res = await fetch(`${BASE}/products/category/${encodeURIComponent(category)}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    const json = await res.json();
    return json.products as Product[];
}