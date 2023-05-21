import { Database } from '@/lib/database.types'
import Image from 'next/image'
import React from 'react'
import Links from './Links'
import WorksList from './WorksList'
import Header from './Header'
import Avatar from './Avatar'

type Accounts = Database['public']['Tables']['accounts']['Row']
type Works = Database['public']['Tables']['works']['Row']

export type Profileprops = {
  accounts: Accounts
  works: Works[]
}

const Profile = ({ accounts, works }: Profileprops) => {
  if (accounts === null) return <div>not avatar</div>
  else
    return (
      <div className='flex w-screen flex-col items-center text-susutake'>
        {/* <Header name='Profile' /> */}
        <div className='flex w-screen flex-col xl:w-[1280px] xl:flex-row 3xl:w-[1600px] '>
          <div className='md:h-3/4 xl:mt-9 xl:h-[screen] xl:w-1/2 '>
            <Image
              src='/images/profile_image.png'
              width={1280}
              height={1280}
              alt='profile image'
              priority={true}
              sizes='(max-width: 1280px) 100vw, 50vw'
              className='object-cover object-top drop-shadow-uSusutake  md:h-[75vw] xl:h-[600px] xl:w-[600px] xl:drop-shadow-urSusutake 3xl:h-[720px]  3xl:w-[720px]'
            />
          </div>

          <div className='my-6 flex flex-col items-center gap-4 text-sm  md:text-xl xl:w-1/2 xl:gap-6 3xl:gap-9'>
            <div className='flex flex-row items-center justify-between gap-9 md:gap-12 xl:gap-[72px]'>
              <Avatar avatarUrl={accounts.avatar_url} />
              <div className='text-3xl md:text-4xl xl:text-5xl 3xl:text-7xl'>
                {accounts.username}
              </div>
            </div>
            <div className=' flex flex-col items-center justify-center gap-4 xl:gap-6 xl:text-2xl 3xl:gap-9 3xl:text-3xl'>
              <div className='flex whitespace-pre-line'>{accounts.profile}</div>
              <div className='flex'>使用ソフト：{accounts.software_used}</div>
              <div className='flex'>
                <WorksList works={works} />
              </div>
              <div className='flex'>
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
      </div>
    )
}

export default Profile
