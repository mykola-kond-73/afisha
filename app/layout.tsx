import '../styles/global.scss'
import type { Metadata } from 'next'
import { ApolloWrapper } from '@/lib/apolloWrapper'
import { Footer, HeaderContainer } from '@/components/globals'

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
            <HeaderContainer />
            {children}
            <Footer />
        </ApolloWrapper>
      </body>
    </html>
  )
}
