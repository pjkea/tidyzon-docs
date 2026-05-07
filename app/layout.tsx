import React from 'react'
import type { Metadata, Viewport } from 'next'
import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s – Tidyzon API Docs',
    default: 'Tidyzon API Docs',
  },
  description: 'Tidyzon API Documentation',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={
                <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
                  Tidyzon
                </span>
              }
              projectLink="https://github.com/pjkea/tidyzon-docs"
            />
          }
          footer={
            <Footer>
              <span>© {new Date().getFullYear()} Tidyzon. All rights reserved.</span>
            </Footer>
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/pjkea/tidyzon-docs/tree/main"
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
