'use client'

import { useEffect, useState } from 'react'
import Account from '../../components/admin/Account'
import { useSupabase } from '../supabase-provider'
import { Session, User } from '@supabase/supabase-js'
import Login from '@/components/admin/Login'

const Admin = () => {
  const { supabase } = useSupabase()
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  useEffect(() => {
    getSession()
    console.log('session', session)
  }, [])

  useEffect(() => {
    getUser()
    console.log('user', user)
  }, [session])

  const getSession = async () => {
    const { data } = await supabase.auth.getSession()
    if (data) setSession(data.session)
    console.log('data', data)
  }

  const getUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (data) setUser(data.user)
    console.log('data', data)
  }

  return <div>{session && user ? <Account user={user} /> : <Login />}</div>
}

export default Admin
