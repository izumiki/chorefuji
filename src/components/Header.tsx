import React from 'react'

type HeaderProps = {
  name: 'Profile' | 'Contact'
}

const Header = ({ name }: HeaderProps) => {
  return (
    <header className='flex h-10 w-full items-center justify-between font-Cinzel md:h-16 3xl:m-3'>
      <h1 className=' text-2xl md:text-5xl 3xl:text-5xl'>{name}</h1>
      <div className='flex justify-between gap-2 text-xs md:text-2xl'>
        <div>Profile</div>
        <div>Contact</div>
      </div>
    </header>
  )
}

export default Header
