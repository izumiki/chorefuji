'use client'

import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Login from '../../components/Login'
import Account from '../../components/admin/Account'

const Admin = () => {
  const session = useSession()
  const supabase = useSupabaseClient()
  return <div>{!session ? <Login /> : <Account session={session} />}</div>
}

export default Admin
