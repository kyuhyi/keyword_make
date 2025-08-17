'use client'

import dynamic from 'next/dynamic'

const KeywordGenerator = dynamic(() => import('@/components/KeywordGenerator'), {
  ssr: false
})

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "키워드 조합 생성기",
    "description": "네이버, 구글 SEO에 최적화된 키워드 조합 생성기. 무료로 키워드를 조합하여 검색 트래픽을 늘려보세요.",
    "url": "https://keywordmake.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "creator": {
      "@type": "Organization",
      "name": "키워드메이커"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <KeywordGenerator />
    </>
  )
}
