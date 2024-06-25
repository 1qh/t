import type { Metadata, Viewport } from 'next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Toaster } from 'sonner'

import { cn } from '@a/ui'
import { ThemeProvider, ThemeToggle } from '@a/ui/theme'

import { TRPCReactProvider } from '~/trpc/react'

import '~/app/globals.css'

import { env } from '~/env'

export const metadata: Metadata = {
  metadataBase: new URL(env.VERCEL_ENV === 'production' ? 'https://...' : 'http://localhost:3000'),
  title: '',
  description: 'Simple monorepo with shared backend for web & mobile apps',
  openGraph: {
    title: '',
    description: 'Simple monorepo with shared backend for web & mobile apps',
    url: 'https://t.vercel.app',
    siteName: ''
  },
  twitter: {
    card: 'summary_large_image',
    site: '@',
    creator: '@'
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans text-foreground antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <TRPCReactProvider>{props.children}</TRPCReactProvider>
          <div className='absolute bottom-2 right-2'>
            <ThemeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
