import '../styles/global.scss'
import type { Metadata } from 'next'
import { ApolloWrapper } from '@/lib/apolloWrapper'
import { Footer, HeaderContainer } from '@/components/globals'
import { Grenze_Gotisch } from 'next/font/google'

const font=Grenze_Gotisch({
  subsets:['latin'],
  display:'swap'
})

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
    <html lang="en" >
      <body className={font.className}>
        <ApolloWrapper>
            <HeaderContainer />
            {children}
            <Footer />
        </ApolloWrapper>
      </body>
    </html>
  )
}
