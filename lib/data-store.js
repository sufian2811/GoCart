// Simple in-memory data store for products and stores
// This replaces Prisma for the admin panel

let products = []
let stores = [
    {
        id: 'store_1',
        name: 'Default Store',
        username: 'default',
        email: 'store@example.com',
        contact: '+1234567890',
        logo: '',
        description: 'Default store for admin products',
        address: '123 Main St',
        status: 'approved',
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    }
]

// Products store
export const productsStore = {
    getAll: () => {
        return products.map(product => ({
            ...product,
            store: stores.find(s => s.id === product.storeId) || null
        }))
    },
    
    create: (productData) => {
        const newProduct = {
            id: `prod_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...productData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        products.push(newProduct)
        return {
            ...newProduct,
            store: stores.find(s => s.id === newProduct.storeId) || null
        }
    },
    
    findById: (id) => {
        return products.find(p => p.id === id)
    },
    
    update: (id, updates) => {
        const index = products.findIndex(p => p.id === id)
        if (index !== -1) {
            products[index] = {
                ...products[index],
                ...updates,
                updatedAt: new Date().toISOString(),
            }
            return {
                ...products[index],
                store: stores.find(s => s.id === products[index].storeId) || null
            }
        }
        return null
    },
    
    delete: (id) => {
        const index = products.findIndex(p => p.id === id)
        if (index !== -1) {
            products.splice(index, 1)
            return true
        }
        return false
    }
}

// Stores store
export const storesStore = {
    getAll: () => {
        return stores
    },
    
    create: (storeData) => {
        const newStore = {
            id: `store_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            ...storeData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }
        stores.push(newStore)
        return newStore
    },
    
    findById: (id) => {
        return stores.find(s => s.id === id)
    }
}

