'use client'
import { useForm } from 'react-hook-form'
// import { MailFormValues } from '../../types/mail'
// import MailFormInput from './components/MailFormInput'
// import { sendMail } from './sendMail'
// import MailFormTextarea from './components/MailFormTextarea'
// import MailFormRadio from './components/MailFormRadio'
// import ConfirmModal from './components/ConfirmModal'
import { useEffect, useState } from 'react'
import { RemoveScroll } from 'react-remove-scroll'
import MailFormInput from './MailFormInput'
import MailFormTextarea from './MailFormTextarea'
import Image from 'next/image'
import Header from './Header'

export type MailFormValues = {
  client: string
  clientEmail: string
  clientCompany: string
  clientWebsite: string
  title: string
  details: string
  budget: string
  deliveryDate: string
  isPublic: boolean | string
}

const MailForm = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<MailFormValues>()

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [mailParams, setMailParams] = useState<MailFormValues>()

  return (
    <div className='flex h-screen w-screen flex-col items-center text-susutake'>
      {/* <Header name='MailForm' /> */}
      <div className='flex w-screen flex-col items-center justify-between xl:flex-row 3xl:w-[1600px] '>
        <div className='flex items-center justify-center md:h-3/4 xl:mt-9 xl:h-[screen] xl:w-1/2 '>
          <Image
            src='/images/mailform_image.jpg'
            width={1280}
            height={1280}
            alt='profile image'
            priority={true}
            sizes='(max-width: 1280px) 100vw, 50vw'
            className='object-cover object-top drop-shadow-uSusutake  md:h-[75vw] xl:h-[600px] xl:w-[600px] xl:drop-shadow-urSusutake 3xl:h-[720px]  3xl:w-[720px]'
          />
        </div>

        <div className='flex items-center justify-center'>
          <div className='m-9 flex w-screen flex-col items-center bg-gradient-to-br from-stone-50	via-stone-100 to-stone-200 p-4 shadow-xl md:w-[640px]'>
            <h1 className='mb-8 font-Cinzel text-4xl font-bold underline decoration-suou decoration-double decoration-1 underline-offset-2'>
              MailForm
            </h1>

            <form onSubmit={handleSubmit(() => setIsOpen(true))}>
              <div className='flex w-full flex-col justify-center gap-3 md:w-[540px]'>
                <MailFormInput
                  label='お名前 / name'
                  type='text'
                  helpText=''
                  name='client'
                  register={register}
                  errors={errors}
                  options={{
                    required: '入力してください',
                    maxLength: {
                      value: 15,
                      message: '文字数が多すぎます',
                    },
                  }}
                />
                <MailFormInput
                  label='email'
                  type='email'
                  name='clientEmail'
                  register={register}
                  errors={errors}
                  options={{
                    required: '入力してください',
                    pattern: {
                      value: /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/,
                      message: 'メールアドレスを入力してください',
                    },
                  }}
                />
                <MailFormInput
                  label='会社名 / company'
                  type='text'
                  name='clientCompany'
                  register={register}
                  errors={errors}
                  options={{
                    required: '入力してください',
                    maxLength: {
                      value: 30,
                      message: '文字数が多すぎます',
                    },
                  }}
                />
                <MailFormInput
                  label='website'
                  type='url'
                  name='clientWebsite'
                  register={register}
                  errors={errors}
                  options={{
                    required: false,
                    pattern: {
                      value:
                        /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g,
                      message: 'URLを入力してください',
                    },
                  }}
                />
                <MailFormInput
                  label='件名 / title'
                  type='text'
                  helpText='最大30文字'
                  name='title'
                  register={register}
                  errors={errors}
                  options={{
                    required: '入力してください',
                    maxLength: {
                      value: 30,
                      message: '文字数が多すぎます',
                    },
                  }}
                />
                <MailFormTextarea
                  label='詳細 / details'
                  helpText='最大3000文字'
                  name='details'
                  register={register}
                  errors={errors}
                  options={{
                    required: '入力してください',
                    maxLength: {
                      value: 3000,
                      message: '文字数が多すぎます',
                    },
                  }}
                />
                <MailFormInput
                  label='ご予算 / budget'
                  type='text'
                  unit='円'
                  helpText='数字入力'
                  name='budget'
                  register={register}
                  errors={errors}
                  options={{
                    required: false,
                    pattern: {
                      value: /^[0-9]+$/,
                      message: '数字で入力してください',
                    },
                  }}
                />
                <MailFormInput
                  label='ご希望納期 / deadline'
                  type='date'
                  name='deliveryDate'
                  helpText='日付入力'
                  register={register}
                  errors={errors}
                  options={{ required: false }}
                />
                <button
                  type='submit'
                  className='mt-9 w-36 items-center justify-center self-center rounded bg-suou px-4 py-2 text-xl font-bold text-white hover:bg-suou-dark
    focus:outline-none xl:self-end'
                >
                  確認
                </button>
                {/* <RemoveScroll removeScrollBar={false} enabled={isOpen}>
        <ConfirmModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          getValues={getValues}
        />
      </RemoveScroll> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MailForm
