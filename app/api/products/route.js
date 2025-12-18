import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all products
export async function GET() {
    try {
        const products = await prisma.product.findMany({
            include: {
                store: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
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

        const product = await prisma.product.create({
            data: {
                name,
                description,
                mrp: parseFloat(mrp),
                price: parseFloat(price),
                images: images || [],
                category,
                storeId,
                inStock: inStock !== undefined ? inStock : true
            },
            include: {
                store: {
                    select: {
                        name: true,
                        username: true
                    }
                }
            }
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

