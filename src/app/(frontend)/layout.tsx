import React from 'react'
import './styles.css'
import Header from '@/components/Header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        <Header />
        <main className="container">{children}</main>
      </body>
    </html>
  )
}
