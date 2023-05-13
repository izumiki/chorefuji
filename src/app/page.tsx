import Profile from '@/components/Profile'
import { Database } from '@/lib/database.types'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import Image from 'next/image'
import { Header } from 'semantic-ui-react'

export default async function Home() {
  const email: string = 'izumiki514@gmail.com'
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data } = await supabase
    .from('accounts')
    .select('*')
    .eq('email', email)
    .single()

  if (data === null)
    return (
      <main className='flex min-h-screen flex-col items-center justify-between p-24'>
        <div className='mt-12 flex h-full w-full justify-center text-3xl'>
          🚧工事中🚧
        </div>
      </main>
    )

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='mt-12 flex h-full w-full justify-center text-3xl'>
        🚧工事中🚧
        <Profile data={data} />
        {/* <Header as='h2'>{data?.username}</Header> */}
      </div>
    </main>
  )
}
