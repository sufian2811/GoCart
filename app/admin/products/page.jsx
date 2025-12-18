'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import Link from "next/link"
import { PlusIcon } from "lucide-react"

export default function AdminProducts() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products')
            if (response.ok) {
                const data = await response.json()
                setProducts(data)
            } else {
                toast.error('Failed to fetch products')
            }
        } catch (error) {
            console.error('Error fetching products:', error)
            toast.error('Failed to fetch products')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <>
            <div className="flex items-center justify-between mb-5">
                <h1 className="text-2xl text-slate-500">Manage <span className="text-slate-800 font-medium">Products</span></h1>
                <Link href="/admin/products/add" className="bg-slate-800 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-slate-900 transition">
                    <PlusIcon size={18} />
                    Add Product
                </Link>
            </div>
            
            {products.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                    <p className="text-lg">No products found</p>
                    <Link href="/admin/products/add" className="text-slate-600 hover:text-slate-800 underline mt-2 inline-block">
                        Add your first product
                    </Link>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full max-w-6xl text-left ring ring-slate-200 rounded overflow-hidden text-sm">
                        <thead className="bg-slate-50 text-gray-700 uppercase tracking-wider">
                            <tr>
                                <th className="px-4 py-3">Image</th>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3 hidden md:table-cell">Category</th>
                                <th className="px-4 py-3 hidden md:table-cell">Store</th>
                                <th className="px-4 py-3 hidden md:table-cell">MRP</th>
                                <th className="px-4 py-3">Price</th>
                                <th className="px-4 py-3">Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-slate-700">
                            {products.map((product) => (
                                <tr key={product.id} className="border-t border-gray-200 hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        {product.images && product.images.length > 0 ? (
                                            <Image 
                                                width={50} 
                                                height={50} 
                                                className='p-1 shadow rounded object-cover' 
                                                src={product.images[0]} 
                                                alt={product.name}
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-slate-200 rounded flex items-center justify-center text-slate-400 text-xs">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-4 py-3 font-medium">{product.name}</td>
                                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">{product.category}</td>
                                    <td className="px-4 py-3 text-slate-600 hidden md:table-cell">
                                        {product.store?.name || 'N/A'}
                                    </td>
                                    <td className="px-4 py-3 hidden md:table-cell">{currency} {product.mrp.toLocaleString()}</td>
                                    <td className="px-4 py-3 font-semibold">{currency} {product.price.toLocaleString()}</td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded text-xs ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </>
    )
}

