import React from 'react'

type HeaderProps = {
  name: 'Profile' | 'Contact' | 'MailForm'
}

const Header = ({ name }: HeaderProps) => {
  return (
    <header className='flex h-9 w-full items-center justify-between text-center align-bottom font-Cinzel md:h-12 xl:mt-3 xl:h-20 xl:w-[1280px] xl:px-6 3xl:w-[1600px]'>
      <h1 className='flex text-3xl md:text-5xl xl:text-6xl 3xl:text-7xl'>
        {name}
      </h1>
      <div className='flex justify-between gap-2 text-xs md:gap-4 md:text-xl xl:gap-8 xl:text-2xl 3xl:text-4xl'>
        <div>Profile</div>
        <div>Contact</div>
        <div>MailForm</div>
      </div>
    </header>
  )
}

export default Header
