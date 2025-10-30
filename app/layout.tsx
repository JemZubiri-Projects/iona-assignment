import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: "Jem's PLP",
  description: 'Product Listing Page',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-neutral-900">
        <header className="bg-primary text-white shadow">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Jem's PLP</h1>
            <nav>
              <a href="/" className="mr-4 hover:text-accent transition-colors">
                Products
              </a>
            </nav>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8">{children}</main>

        <footer className="border-t border-neutral-200 mt-12 py-6 text-center text-sm text-neutral-500">
          Jem's PLP
        </footer>
      </body>
    </html>
  )
}
