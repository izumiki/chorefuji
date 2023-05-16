import Image from 'next/image'
import React from 'react'
import TwitterIcon from '../../public/Twitter social icons - circle - blue.svg'
import SkebIcon from '../../public/icon.svg'

type LinksProps = {
  twitterUrl: string | null
  tumblrUrl: string | null
  pixivUrl: string | null
  skebUrl: string | null
  iconSize: number
}

const Links = ({
  twitterUrl,
  tumblrUrl,
  pixivUrl,
  skebUrl,
  iconSize,
}: LinksProps) => {
  return (
    <div className='flex w-full flex-row items-center justify-center gap-6 md:gap-9 lg:gap-12'>
      {twitterUrl !== null && (
        <div className='flex w-6  flex-row md:w-9 lg:w-16'>
          <a href={twitterUrl} target='_blank'>
            <Image
              src={TwitterIcon}
              width={iconSize}
              height={iconSize}
              alt='twitter'
            />
          </a>
        </div>
      )}
      {tumblrUrl !== null && (
        <div className='flex  w-6  flex-row md:w-9 lg:w-16'>
          <a href={tumblrUrl} target='_blank'>
            <Image
              src='/Tumblr_Logos_2018.03.06_Android Icon Blue.png'
              width={iconSize}
              height={iconSize}
              alt='tumblr'
            />
          </a>
        </div>
      )}
      {pixivUrl !== null && (
        <div className='flex  w-6  flex-row md:w-9 lg:w-16'>
          <a href={pixivUrl} target='_blank'>
            <Image
              src='/logo_icon_r.png'
              width={iconSize}
              height={iconSize}
              alt='pixiv'
            />
          </a>
        </div>
      )}
      {skebUrl !== null && (
        <div className='flex  w-6  flex-row rounded-full md:w-9 lg:w-16'>
          <a href={skebUrl} target='_blank'>
            <Image
              src={SkebIcon}
              width={iconSize}
              height={iconSize}
              alt='skeb'
            />
          </a>
        </div>
      )}
    </div>
  )
}

export default Links
