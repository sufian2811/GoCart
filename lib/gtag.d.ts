// Type definitions for Google Analytics gtag

interface Window {
    gtag: (
        command: 'config' | 'event' | 'js' | 'set',
        targetId: string | Date,
        config?: {
            page_path?: string
            event_category?: string
            event_label?: string
            value?: number
            transaction_id?: string
            currency?: string
            items?: Array<{
                item_id: string
                item_name: string
                price: number
                quantity: number
            }>
        }
    ) => void
    dataLayer: any[]
}

