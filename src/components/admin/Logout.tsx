import { useRouter } from 'next/router'
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Logout = () => {
  const router = useRouter()
  const supabase = useSupabaseClient()
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      router.push('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <button
      className='m-6 rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700'
      onClick={() => logout()}
    >
      Logout
    </button>
  )
}

export default Logout
