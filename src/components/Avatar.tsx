import Image from 'next/image'
import React from 'react'

const Avatar = ({ avatarUrl }: { avatarUrl: string | null }) => {
  if (avatarUrl === null)
    return (
      <div className='h-24 w-24 rounded-full bg-red-100 md:h-36 md:w-36 3xl:h-64 3xl:w-64' />
    )
  return (
    <div>
      <Image
        src={avatarUrl}
        alt='avatar'
        width={384}
        height={384}
        className='h-24 w-24 md:h-36 md:w-36 3xl:h-64 3xl:w-64'
      />
    </div>
  )
}

export default Avatar
