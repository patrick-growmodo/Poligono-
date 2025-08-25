import type { Metadata } from 'next'
import { Poppins , Inter, Roboto,Montserrat } from 'next/font/google'
import './globals.css'
import ClientHeader from '@/components/ClientHeader'
// import { Auth0 } from "./components/Auth0";
import { Auth0ProviderWrapper } from "@/components/AuthProvider";

const poppins = Poppins({       
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

const inter = Inter({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter'
}) 

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat'
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  title: 'Poligono',
  description: 'Next.js application built with App Router',
  icons: {
    icon: '/images/logo/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${inter.variable} ${roboto.variable} ${montserrat.variable} ${poppins.className} ${inter.className} ${roboto.className} ${montserrat.className}`}>
        <Auth0ProviderWrapper>
          <ClientHeader />
          {children}
        </Auth0ProviderWrapper>
      </body>
    </html> 
  )
} 