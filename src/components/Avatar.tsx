import Image from 'next/image'
import React from 'react'

const Avatar = ({ avatarUrl }: { avatarUrl: string | null }) => {
  if (avatarUrl === null)
    return (
      <div className='h-24 w-24 rounded-full border-susutake bg-red-100 md:h-36 md:w-36 xl:h-48 xl:w-48' />
    )
  return (
    <div>
      <Image
        src={avatarUrl}
        alt='avatar'
        width={384}
        height={384}
        className='h-24 w-24 rounded-full border-2 border-susutake md:h-36 md:w-36 3xl:h-48 3xl:w-48'
      />
    </div>
  )
}

export default Avatar
