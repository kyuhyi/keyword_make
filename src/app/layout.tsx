import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from '@/components/ThemeProvider'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "키워드 조합 생성기 - SEO 최적화 도구",
  description: "네이버, 구글 SEO에 최적화된 키워드 조합 생성기. 무료로 키워드를 조합하여 검색 트래픽을 늘려보세요.",
  keywords: "키워드 생성기, SEO 도구, 키워드 조합, 네이버 SEO, 구글 SEO, 검색 최적화, 롱테일 키워드, 검색어 조합",
  authors: [{ name: "키워드메이커" }],
  creator: "키워드메이커",
  publisher: "키워드메이커",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "키워드 조합 생성기 - SEO 최적화 도구",
    description: "네이버, 구글 SEO에 최적화된 키워드 조합 생성기",
    type: "website",
    locale: "ko_KR",
    url: "https://keywordmake.vercel.app",
    siteName: "키워드메이커",
  },
  twitter: {
    card: "summary_large_image",
    title: "키워드 조합 생성기 - SEO 최적화 도구",
    description: "네이버, 구글 SEO에 최적화된 키워드 조합 생성기",
  },
  verification: {
    google: "google-site-verification-code",
    other: {
      "naver-site-verification": "naver-verification-code",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
