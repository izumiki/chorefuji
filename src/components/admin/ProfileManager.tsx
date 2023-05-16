'use client'
import React, { useEffect, useState } from 'react'
import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '../../lib/database.types'
import { createPath, uploadStorage } from './uploadStorage'
import ProfileFormInput from './ProfileFormInput'
import { useForm } from 'react-hook-form'
import ProfileFormTextarea from './ProfileFormTextarea'
import AvatarManager from './AvatarManager'
import AccountButton from './AccountButton'
import { Header } from 'semantic-ui-react'
import deleteStorage from './deleteStorage'
import { useSupabase } from '@/app/supabase-provider'

type Accounts = Database['public']['Tables']['accounts']['Row']

export type ProfileFormValues = {
  email: string | null
  username: string | null
  profile: string | null
  softwareUsed: string | null
  twitterUrl: string | null
  tumblrUrl: string | null
  pixivUrl: string | null
  skebUrl: string | null
  avatarUrl: string | null
  avatarImage: Blob | File | null
}

const ProfileManager = ({ user }: { user: User }) => {
  const { supabase }: { supabase: SupabaseClient<Database> } = useSupabase()
  // const user: User | null = supabase.auth.getUser()
  const [account, setAccount] = useState<Accounts>()
  const [loading, setLoading] = useState<boolean>(true)
  const [completed, setIsCompleted] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { register, handleSubmit, formState, setValue } =
    useForm<ProfileFormValues>()

  // useEffect(() => {
  //   if (user) console.log(user)
  // }, [user])

  useEffect(() => {
    if (user) fetchAccount()
  }, [])

  useEffect(() => {
    if (account) {
      setValue('username', account.username)
      setValue('profile', account.profile)
      setValue('softwareUsed', account.software_used)
      setValue('twitterUrl', account.twitter_url)
      setValue('tumblrUrl', account.tumblr_url)
      setValue('pixivUrl', account.pixiv_url)
      setValue('skebUrl', account.skeb_url)
      setValue('avatarUrl', account.avatar_url)

      setLoading(false)
    }
  }, [account])

  const fetchAccount = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      const { data, error, status } = await supabase
        .from('accounts')
        .select(
          `
          id, 
          email, 
          username, 
          profile, 
          software_used, 
          avatar_url,
          twitter_url, 
          tumblr_url, 
          pixiv_url, 
          skeb_url,
          updated_at, 
          created_at
        `
        )
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) setAccount(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateAccount = async (data: ProfileFormValues) => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      const date: Date = new Date()
      const userEmail: string = user?.email || ''
      const userStorageDir: string = userEmail.split('@')[0]
      const filePath: string = `${userStorageDir}/${createPath()}`
      const avatarUrl: string | undefined | null = data?.avatarImage?.type
        ? await uploadStorage(supabase, 'avatars', filePath, data.avatarImage)
        : data.avatarUrl
      const { error } = await supabase
        .from('accounts')
        .update({
          email: data.email,
          username: data.username,
          profile: data.profile,
          software_used: data.softwareUsed,
          twitter_url: data.twitterUrl,
          tumblr_url: data.tumblrUrl,
          pixiv_url: data.pixivUrl,
          skeb_url: data.skebUrl,
          avatar_url: avatarUrl,
          updated_at: date.toISOString(),
        })
        .eq('id', user?.id)
      if (error) throw Error
      if (avatarUrl !== data.avatarUrl && data.avatarUrl !== null) {
        const key: string = data.avatarUrl.split('/').slice(-1)[0]
        deleteStorage(supabase, 'avatars', `${userStorageDir}/${key}`)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
      setIsError(true)
      setTimeout(() => setIsError(false), 5000)
    } finally {
      setTimeout(() => {
        setLoading(false)
        setIsCompleted(true)
      }, 1000)
      setTimeout(() => setIsCompleted(false), 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit(updateAccount)}>
      <div className='flex flex-col items-center'>
        <div className='flex flex-col items-start gap-24 sm:w-full sm:flex-row'>
          <div className='flex w-96 flex-col'>
            <AvatarManager
              avatarSrc={account?.avatar_url}
              avatarSide={384}
              register={register}
              setValue={setValue}
            />
          </div>
          <div className='flex w-96 flex-col'>
            <Header as='h2'>プロフィール</Header>
            <ProfileFormInput
              label='名前'
              type='text'
              helpText='必須'
              name='username'
              register={register}
              errors={formState.errors}
              options={{ required: '入力してください' }}
            />
            <ProfileFormTextarea
              label='プロフィール'
              name='profile'
              helpText='必須'
              register={register}
              errors={formState.errors}
              options={{
                required: '入力してください',
                maxLength: {
                  value: 3000,
                  message: '文字数が多すぎます',
                },
              }}
            />
            <ProfileFormInput
              label='使用ソフト'
              type='text'
              name='softwareUsed'
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
            <Header as='h2'>SNS</Header>

            <ProfileFormInput
              label='twitterURL'
              type='url'
              name='twitterUrl'
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
            <ProfileFormInput
              label='tumblrURL'
              type='url'
              name='tumblrUrl'
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
            <ProfileFormInput
              label='pixivURL'
              type='url'
              name='pixivUrl'
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
            <ProfileFormInput
              label='skebURL'
              type='url'
              name='skebUrl'
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
            <AccountButton
              label='更新'
              type='submit'
              active={loading}
              disabled={loading}
              loading={loading}
              isCompleted={completed}
              isError={isError}
              className='flex w-1/2 self-end'
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default ProfileManager
