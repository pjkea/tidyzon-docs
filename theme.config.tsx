import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  logo: (
    <span style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: '-0.02em' }}>
      Tidyzon
    </span>
  ),
  project: {
    link: 'https://github.com/pjkea/tidyzon-docs',
  },
  docsRepositoryBase: 'https://github.com/pjkea/tidyzon-docs/tree/main',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Tidyzon API Docs',
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Tidyzon API Documentation" />
    </>
  ),
  footer: {
    text: (
      <span>
        © {new Date().getFullYear()} Tidyzon. All rights reserved.
      </span>
    ),
  },
  primaryHue: 215,
  primarySaturation: 80,
  sidebar: {
    titleComponent({ title, type }) {
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  toc: {
    backToTop: true,
  },
  navigation: {
    prev: true,
    next: true,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'light',
  },
}

export default config
