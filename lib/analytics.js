// Utility functions for Google Analytics event tracking

export const pageview = (url) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
            page_path: url,
        })
    }
}

export const event = ({ action, category, label, value }) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    }
}

// E-commerce specific events
export const addToCart = (product) => {
    event({
        action: 'add_to_cart',
        category: 'ecommerce',
        label: product.name || product.id,
        value: product.price,
    })
}

export const removeFromCart = (product) => {
    event({
        action: 'remove_from_cart',
        category: 'ecommerce',
        label: product.name || product.id,
        value: product.price,
    })
}

export const viewProduct = (product) => {
    event({
        action: 'view_item',
        category: 'ecommerce',
        label: product.name || product.id,
        value: product.price,
    })
}

export const beginCheckout = (cartValue) => {
    event({
        action: 'begin_checkout',
        category: 'ecommerce',
        value: cartValue,
    })
}

export const purchase = (transactionId, value, items = []) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
            transaction_id: transactionId,
            value: value,
            currency: 'USD',
            items: items.map(item => ({
                item_id: item.id,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
        })
    }
}

export const search = (searchTerm) => {
    event({
        action: 'search',
        category: 'engagement',
        label: searchTerm,
    })
}

