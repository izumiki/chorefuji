import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return (
    <div className='mt-12 flex h-full w-full justify-center text-3xl'>
      🚧工事中🚧
    </div>
  )
}

export default Home
