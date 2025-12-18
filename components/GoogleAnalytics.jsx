'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Suspense } from 'react'

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function GoogleAnalyticsContent() {
    const pathname = usePathname()

    useEffect(() => {
        if (!GA_MEASUREMENT_ID) return

        // Track page views using pathname only (search params handled separately if needed)
        if (typeof window !== 'undefined' && window.gtag) {
            const url = pathname + (window.location.search || '')
            window.gtag('config', GA_MEASUREMENT_ID, {
                page_path: url,
            })
        }
    }, [pathname])

    if (!GA_MEASUREMENT_ID) {
        return null
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            page_path: window.location.pathname,
                        });
                    `,
                }}
            />
        </>
    )
}

export default function GoogleAnalytics() {
    if (!GA_MEASUREMENT_ID) {
        return null
    }

    return (
        <Suspense fallback={null}>
            <GoogleAnalyticsContent />
        </Suspense>
    )
}

