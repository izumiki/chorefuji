import { Cinzel, Zen_Kurenaido } from 'next/font/google'
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

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='jp'
      className={`${cinzel.variable} ${ZenKurenaido.className} h-screen w-screen bg-sakura-pattern bg-repeat`}
    >
      <body>
        <SupabaseProvider>{children}</SupabaseProvider>
      </body>
    </html>
  )
}
