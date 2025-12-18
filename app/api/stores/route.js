import { NextResponse } from 'next/server'
import { storesStore } from '@/lib/data-store'

// GET all stores
export async function GET() {
    try {
        const stores = storesStore.getAll()
        return NextResponse.json(stores, { status: 200 })
    } catch (error) {
        console.error('Error fetching stores:', error)
        return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 })
    }
}
