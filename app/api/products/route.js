import { NextResponse } from 'next/server'
import { productsStore } from '@/lib/data-store'

// GET all products
export async function GET() {
    try {
        const products = productsStore.getAll()
        return NextResponse.json(products, { status: 200 })
    } catch (error) {
        console.error('Error fetching products:', error)
        return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
    }
}

// POST create a new product
export async function POST(request) {
    try {
        const body = await request.json()
        const { name, description, mrp, price, images, category, storeId, inStock } = body

        // Validate required fields
        if (!name || !description || !mrp || !price || !category || !storeId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            )
        }

        const product = productsStore.create({
            name,
            description,
            mrp: parseFloat(mrp),
            price: parseFloat(price),
            images: images || [],
            category,
            storeId,
            inStock: inStock !== undefined ? inStock : true
        })

        return NextResponse.json(product, { status: 201 })
    } catch (error) {
        console.error('Error creating product:', error)
        return NextResponse.json(
            { error: 'Failed to create product', details: error.message },
            { status: 500 }
        )
    }
}
