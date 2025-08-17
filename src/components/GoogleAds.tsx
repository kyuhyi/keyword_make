'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: unknown[]
  }
}

interface GoogleAdsProps {
  className?: string
  format?: string
}

export default function GoogleAds({ className = "", format = "auto" }: GoogleAdsProps) {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    } catch (error) {
      console.error('AdSense error:', error)
    }
  }, [])

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-6884566372095161"
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  )
}