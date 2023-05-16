import Image from 'next/image'
import React from 'react'
import TwitterIcon from '../../public/images/Twitter social icons - circle - blue.svg'
import TumblrIcon from '../../public/images/Tumblr_Logos_2018.03.06_Android Icon Blue.png'
import PixivIcon from '../../public/images/logo_icon_r.png'
import SkebIcon from '../../public/images/icon.svg'

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
    <div className='flex w-full flex-row items-center justify-center gap-6 md:gap-9 xl:gap-12'>
      {twitterUrl !== null && (
        <div className='flex w-6  flex-row md:w-9 xl:w-12 3xl:w-16'>
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
        <div className='flex  w-6  flex-row md:w-9 xl:w-12 3xl:w-16'>
          <a href={tumblrUrl} target='_blank'>
            <Image
              src={TumblrIcon}
              width={iconSize}
              height={iconSize}
              alt='tumblr'
            />
          </a>
        </div>
      )}
      {pixivUrl !== null && (
        <div className='flex  w-6  flex-row md:w-9 xl:w-12 3xl:w-16'>
          <a href={pixivUrl} target='_blank'>
            <Image
              src={PixivIcon}
              width={iconSize}
              height={iconSize}
              alt='pixiv'
            />
          </a>
        </div>
      )}
      {skebUrl !== null && (
        <div className='flex  w-6  flex-row rounded-full md:w-9 xl:w-12 3xl:w-16'>
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
