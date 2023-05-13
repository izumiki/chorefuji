'use client'

import { Database } from '@/lib/database.types'
import { SupabaseClient, useSupabaseClient } from '@supabase/auth-helpers-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Header } from 'semantic-ui-react'

type Accounts = Database['public']['Tables']['accounts']['Row']

const Profile = ({ data }: { data: Accounts }) => {
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const email: string = 'izumiki514@gmail.com'
  console.log(data)

  if (data === null) return <div>not avatar</div>
  return (
    <div>
      {data.avatar_url && (
        <Image src={data.avatar_url} alt='avatar' width={384} height={384} />
      )}
      <Header as='h2'>{data.username}</Header>
      <Header as='h2'>{data.profile}</Header>
    </div>
  )
}

export default Profile
