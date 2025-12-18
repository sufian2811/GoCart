import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all stores
export async function GET() {
    try {
        const stores = await prisma.store.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return NextResponse.json(stores, { status: 200 })
    } catch (error) {
        console.error('Error fetching stores:', error)
        return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 })
    }
}

