import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { Icon } from 'semantic-ui-react'

const Login = () => {
  const supabase = useSupabaseClient()

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    console.log(url)
    return url
  }

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://chorefuji.vercel.app/' + 'admin',
        },
      })
      console.log(data)
      console.error(error)
      if (error) throw error
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center p-6'>
      <button
        className='flex h-16 w-64 items-center justify-center rounded-full bg-teal-500 font-bold text-white hover:bg-teal-600'
        onClick={() => loginWithGoogle()}
      >
        <Icon name='google' />
        <span className='p-2 text-base'> Google を使ってログイン </span>
      </button>
    </div>
  )
}

export default Login
