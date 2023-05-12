import React from 'react'
import Logout from './Logout'
import { Session } from '@supabase/supabase-js'

import ContactManager from './ContactManager'
import ProfileManager from './ProfileManager'
import WorksManager from './WorksManager'
import Spinner from './Spinner'
import { Header } from 'semantic-ui-react'

const Account = ({ session }: { session: Session }) => {
  if (!session) return <Spinner />
  return (
    <div className='mt-9 flex w-full flex-col items-center gap-16'>
      <Header as='h1'>管理ページ</Header>
      <ProfileManager session={session} />
      <WorksManager session={session} />
      <ContactManager session={session} />
      <Logout />
    </div>
  )
}

export default Account
