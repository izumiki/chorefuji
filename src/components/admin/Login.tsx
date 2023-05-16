'use client'

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { useSupabase } from '../../app/supabase-provider'
import { Button, Icon } from 'semantic-ui-react'

const Login = () => {
  const { supabase } = useSupabase()

  const loginWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'http://chorefuji.vercel.app/admin',
        },
      })
      console.log('data', data)
      console.error(error)
      if (error) throw error
    } catch (error) {
      alert(error)
      console.error(error)
    }
  }

  return (
    <div className='flex w-full flex-col items-center justify-center p-6'>
      <button
        className='flex h-16 w-64 items-center justify-center rounded-full bg-teal-500 font-bold text-white hover:bg-teal-600'
        // color='teal'
        onClick={() => loginWithGoogle()}
      >
        <Icon name='google' />
        <span className='p-2 text-base'> Google を使ってログイン </span>
      </button>
    </div>
  )
}

export default Login
