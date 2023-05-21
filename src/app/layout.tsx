import { Cinzel, Zen_Kurenaido, Klee_One, Alegreya } from 'next/font/google'
import './globals.css'
import SupabaseProvider from './supabase-provider'

export const metadata = {
  title: 'chorefuji',
  description: 'chorefuji',
}

const ZenKurenaido = Zen_Kurenaido({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const KleeOne = Klee_One({
  weight: ['400', '600'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='jp'
      className={`${cinzel.variable} ${alegreya.variable} ${ZenKurenaido.className} ${KleeOne.className} h-screen w-screen bg-sakura-pattern bg-repeat`}
    >
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  )
}
