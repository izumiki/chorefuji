import Contact from '@/components/Contact'
import Header from '@/components/Header'
import MailForm from '@/components/Mailform'
import Profile from '@/components/Profile'
import Login from '@/components/admin/Login'
import { Database } from '@/lib/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import Image from 'next/image'

export default async function Home() {
  const email: string = 'chorefuji@gmail.com'
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data: profile } = await supabase
    .from('accounts')
    .select('*')
    .eq('email', email)
    .single()

  const { data: works } = await supabase
    .from('works')
    .select('*')
    .eq('email', email)
    .order('created_at', { ascending: false })

  const { data: contacts } = await supabase
    .from('contacts')
    .select('*')
    .eq('email', email)
    .single()

  if (profile === null || works === null || contacts === null)
    return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='mt-12 flex h-full w-full justify-center text-3xl'>
          🚧工事中🚧
        </div>
      </main>
    )

  return (
    <main className='flex h-full w-full flex-col items-center justify-between'>
      {/* <Header /> */}
      <Profile accounts={profile} works={works} />
      <Contact contact={contacts} skebUrl={profile.skeb_url || ''} />
      <MailForm />
      {/* <div> */}
      {/* <Account /> */}
      {/* </div> */}
    </main>
  )
}
