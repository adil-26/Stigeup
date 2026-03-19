import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'

import './globals.css'
import { CookieBanner } from "@/components/cookie-banner"

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://stigeup.com"),
  title: {
    default: "STIGEUP - Digital Solutions That Matter",
    template: "%s | STIGEUP",
  },
  description:
    "We empower organizations with AI that turns complex challenges into real-world outcomes.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "STIGEUP",
    title: "STIGEUP - Digital Solutions That Matter",
    description:
      "We empower organizations with AI that turns complex challenges into real-world outcomes.",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "STIGEUP - Digital Solutions That Matter",
    description:
      "We empower organizations with AI that turns complex challenges into real-world outcomes.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        {children}
        <CookieBanner />
      </body>
    </html>
  )
}
