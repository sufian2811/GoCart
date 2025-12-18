'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState, useEffect } from "react"
import { toast } from "react-hot-toast"
import { useRouter } from "next/navigation"
import Loading from "@/components/Loading"

export default function AdminAddProduct() {

    const router = useRouter()
    const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
        storeId: "",
        inStock: true,
    })
    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchingStores, setFetchingStores] = useState(true)

    useEffect(() => {
        const fetchStores = async () => {
            try {
                const response = await fetch('/api/stores')
                if (response.ok) {
                    const data = await response.json()
                    setStores(data)
                    if (data.length > 0) {
                        setProductInfo(prev => ({ ...prev, storeId: data[0].id }))
                    }
                } else {
                    toast.error('Failed to fetch stores')
                }
            } catch (error) {
                console.error('Error fetching stores:', error)
                toast.error('Failed to fetch stores')
            } finally {
                setFetchingStores(false)
            }
        }
        fetchStores()
    }, [])

    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const uploadImage = async (imageFile) => {
        // For now, we'll convert to base64. In production, you'd upload to a cloud service
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(imageFile)
        })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Upload images
            const imageUrls = []
            for (const key in images) {
                if (images[key]) {
                    const base64 = await uploadImage(images[key])
                    imageUrls.push(base64)
                }
            }

            if (imageUrls.length === 0) {
                toast.error('Please add at least one product image')
                setLoading(false)
                return
            }

            // Create product
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...productInfo,
                    images: imageUrls,
                    mrp: parseFloat(productInfo.mrp),
                    price: parseFloat(productInfo.price),
                }),
            })

            if (response.ok) {
                toast.success('Product added successfully!')
                router.push('/admin/products')
            } else {
                const error = await response.json()
                toast.error(error.error || 'Failed to add product')
            }
        } catch (error) {
            console.error('Error adding product:', error)
            toast.error('Failed to add product')
        } finally {
            setLoading(false)
        }
    }

    if (fetchingStores) return <Loading />

    return (
        <form onSubmit={e => onSubmitHandler(e)} className="text-slate-500 mb-28">
            <h1 className="text-2xl">Add New <span className="text-slate-800 font-medium">Product</span></h1>
            <p className="mt-7">Product Images</p>

            <div className="flex gap-3 mt-4">
                {Object.keys(images).map((key) => (
                    <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
                        <Image 
                            width={120} 
                            height={120} 
                            className='h-28 w-28 border border-slate-200 rounded object-cover' 
                            src={images[key] ? URL.createObjectURL(images[key]) : assets.upload_area} 
                            alt="" 
                        />
                        <input 
                            type="file" 
                            accept='image/*' 
                            id={`images${key}`} 
                            onChange={e => setImages({ ...images, [key]: e.target.files[0] })} 
                            hidden 
                        />
                    </label>
                ))}
            </div>

            <label htmlFor="" className="flex flex-col gap-2 my-6">
                Store
                <select 
                    name="storeId" 
                    onChange={onChangeHandler} 
                    value={productInfo.storeId} 
                    className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded" 
                    required
                >
                    <option value="">Select a store</option>
                    {stores.map((store) => (
                        <option key={store.id} value={store.id}>{store.name} ({store.username})</option>
                    ))}
                </select>
            </label>

            <label htmlFor="" className="flex flex-col gap-2 my-6">
                Name
                <input 
                    type="text" 
                    name="name" 
                    onChange={onChangeHandler} 
                    value={productInfo.name} 
                    placeholder="Enter product name" 
                    className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded" 
                    required 
                />
            </label>

            <label htmlFor="" className="flex flex-col gap-2 my-6">
                Description
                <textarea 
                    name="description" 
                    onChange={onChangeHandler} 
                    value={productInfo.description} 
                    placeholder="Enter product description" 
                    rows={5} 
                    className="w-full max-w-sm p-2 px-4 outline-none border border-slate-200 rounded resize-none" 
                    required 
                />
            </label>

            <div className="flex gap-5">
                <label htmlFor="" className="flex flex-col gap-2">
                    Actual Price ({process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'})
                    <input 
                        type="number" 
                        name="mrp" 
                        onChange={onChangeHandler} 
                        value={productInfo.mrp} 
                        placeholder="0" 
                        step="0.01"
                        min="0"
                        className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded" 
                        required 
                    />
                </label>
                <label htmlFor="" className="flex flex-col gap-2">
                    Offer Price ({process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'})
                    <input 
                        type="number" 
                        name="price" 
                        onChange={onChangeHandler} 
                        value={productInfo.price} 
                        placeholder="0" 
                        step="0.01"
                        min="0"
                        className="w-full max-w-45 p-2 px-4 outline-none border border-slate-200 rounded" 
                        required 
                    />
                </label>
            </div>

            <select 
                name="category"
                onChange={onChangeHandler} 
                value={productInfo.category} 
                className="w-full max-w-sm p-2 px-4 my-6 outline-none border border-slate-200 rounded" 
                required
            >
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <div className="flex items-center gap-3 my-6">
                <input 
                    type="checkbox" 
                    name="inStock" 
                    id="inStock"
                    checked={productInfo.inStock}
                    onChange={(e) => setProductInfo({ ...productInfo, inStock: e.target.checked })} 
                    className="w-4 h-4"
                />
                <label htmlFor="inStock" className="cursor-pointer">In Stock</label>
            </div>

            <br />

            <button 
                disabled={loading} 
                className="bg-slate-800 text-white px-6 mt-7 py-2 hover:bg-slate-900 rounded transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {loading ? 'Adding Product...' : 'Add Product'}
            </button>
        </form>
    )
}

