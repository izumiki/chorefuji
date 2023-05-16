import { Database } from '@/lib/database.types'
import Image from 'next/image'
import React from 'react'
import Links from './Links'
import WorksList from './WorksList'
import Header from './Header'
import Avatar from './Avatar'

type Accounts = Database['public']['Tables']['accounts']['Row']
type Works = Database['public']['Tables']['works']['Row']
type Profileprops = {
  accounts: Accounts
  works: Works[]
}
const Profile = ({ accounts, works }: Profileprops) => {
  if (accounts === null) return <div>not avatar</div>
  else
    return (
      <div className='flex h-screen w-screen flex-col items-center text-susutake'>
        <Header name='Profile' />
        <div className='flex w-screen flex-col justify-center lg:w-[960px] lg:flex-row 3xl:w-[1600px]'>
          <div className='drop-shadow-uSusutake md:h-3/4 lg:h-screen lg:drop-shadow-urSusutake'>
            <Image
              src='/images/profile_image.png'
              width={960}
              height={960}
              alt='profile image'
              priority={true}
              className='w-screen object-cover object-top md:h-[75vw] lg:h-[480px] lg:w-[480px] 3xl:h-[800px]  3xl:w-[800px]'
            />
          </div>

          <div className='mt-12 flex flex-col items-center gap-6 text-center text-sm  md:text-xl  lg:w-1/2 3xl:gap-12'>
            <div className='flex flex-row items-center justify-between gap-9 md:gap-12 3xl:text-3xl'>
              <Avatar avatarUrl={accounts.avatar_url} />
              <div className='text-3xl md:text-4xl 3xl:text-6xl'>
                {accounts.username}
              </div>
            </div>
            <div className=' flex w-screen flex-col items-center justify-center gap-4 md:gap-6'>
              <div className='w-full whitespace-pre-line '>
                {accounts.profile}
              </div>
              <div className='w-screen '>
                使用ソフト：{accounts.software_used}
              </div>
              <WorksList works={works} />
              <Links
                twitterUrl={accounts.twitter_url}
                tumblrUrl={accounts.tumblr_url}
                pixivUrl={accounts.pixiv_url}
                skebUrl={accounts.skeb_url}
                iconSize={64}
              />
            </div>
          </div>
        </div>
      </div>
    )
}

export default Profile
