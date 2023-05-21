import { Database } from '@/lib/database.types'
import React from 'react'
import Header from './Header'
import Image from 'next/image'

type Contacts = Database['public']['Tables']['contacts']['Row']

export type Contactprops = {
  contact: Contacts
  skebUrl: string
}

const Contact = ({ contact, skebUrl }: Contactprops) => {
  const date = contact.delivery_deadline
    ? new Date(contact.delivery_deadline)
    : null
  const replyDate = contact.reply_deadline ? contact.reply_deadline : '3'
  const skeb = (
    <a href={skebUrl} target='_blank' className='inline-flex'>
      skeb
    </a>
  )
  console.log('date', date)
  return (
    <div className='flex w-screen flex-col items-center text-susutake xl:flex-row 3xl:w-[1600px]'>
      {/* <Header name='Contact' /> */}
      <div className='mt-6 md:h-3/4 xl:h-[screen] xl:w-1/2 '>
        <Image
          src='/images/contact_image.jpg'
          width={1280}
          height={1280}
          alt='contact image'
          // priority={true}
          sizes='(max-width: 1280px) 100vw, 50vw'
          className='object-cover object-top drop-shadow-uSusutake  md:h-[75vw] xl:h-[600px] xl:w-[600px] xl:drop-shadow-urSusutake 3xl:h-[720px]  3xl:w-[720px]'
        />
      </div>
      
      <div className='flex w-screen flex-col items-center justify-between p-4 xl:w-[640px] xl:flex-row 3xl:w-[800px]'>
        <div className='flex w-full flex-col text-sm md:w-[480px] md:text-xl xl:w-[720px] xl:text-2xl'>
          <p className='flex w-full flex-col  whitespace-pre-wrap text-left'>
            {'現在、企業様のご依頼を募集しています。'}
            {date &&
              `\n${date.getFullYear()} 年 ${
                date.getMonth() + 1
              } 月以降に納品可能です。\n`}
            {'下記のメールフォームからご相談ください。\n\n'}
            {'業務経験は以下の通りです。'}
          </p>
          <ul className='list-outside list-circle p-2 pl-8'>
            <li>{'キャラクターデザイン'}</li>
            <li>{'キャラクターイラスト'}</li>
            <li>{'スチルイラスト'}</li>
          </ul>
          <p className='flex w-full flex-col  whitespace-pre-wrap text-left'>
            {'上記以外に関してもお気軽にご相談ください。\n\n'}
            {'線画や彩色などの分業可能です。\n'}
            {'また、絵柄寄せ可能です。\n\n'}
            {`ご依頼内容やご予算、ご希望納期から見積もり金額を ${replyDate} 日以内に Email 宛に返信いたします。\n\n`}
            <span className='flex-row'>
              {'個人様のご依頼は'}
              <a href={skebUrl} target='_blank' className='font-extrabold'>
                {' Skeb '}
              </a>
              {'にて承っております。'}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
