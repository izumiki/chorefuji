'use client'
import React, { useEffect, useState } from 'react'
import Logout from './Logout'

import ContactManager from './ContactManager'
import ProfileManager from './ProfileManager'
import WorksManager from './WorksManager'
import Spinner from './Spinner'
import { Header } from 'semantic-ui-react'
import Login from './Login'
import { useSupabase } from '@/app/supabase-provider'
import { User } from '@supabase/supabase-js'

const Account = ({ user }: { user: User }) => {
  return (
    <div className='flex w-full flex-col items-center gap-16 bg-gradient-to-r from-slate-100 to-sky-50'>
      <Header as='h1'>管理ページ</Header>
      <ProfileManager user={user} />
      <WorksManager user={user} />
      <ContactManager user={user} />
      <Logout />
    </div>
  )
}

export default Account
