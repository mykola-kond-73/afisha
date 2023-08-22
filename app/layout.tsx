import '../styles/global.scss'
import type { Metadata } from 'next'
import { ApolloWrapper } from '@/lib/apolloWrapper'
import { Footer, Header } from '@/components/globals'

export const metadata: Metadata = {
  title: 'afisha',
  description: 'description afisha',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
            <Header />
            {children}
            <Footer />
        </ApolloWrapper>
      </body>
    </html>
  )
}
