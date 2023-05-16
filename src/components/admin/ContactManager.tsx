import React, { useEffect, useState } from 'react'
import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import { Database } from '../../lib/database.types'
import { useForm } from 'react-hook-form'
import ContactFormCheckbox from './ContactFormCheckbox'
import ContactFormInput from './ContactFormInput'
import AccountButton from './AccountButton'

type Contacts = Database['public']['Tables']['contacts']['Row']

export type ContactFormValues = {
  emailSender: string | null
  isAccepted: boolean | null
  deliveryDeadline: string | null
  replyDeadline: string | null
}

const ContactManager = ({ session }: { session: Session }) => {
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const user: User | null = useUser()
  const [contact, setContact] = useState<Contacts>()
  const [isChecked, setIsChecked] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const [isCompleted, SetIsCompleted] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { register, handleSubmit, formState, setValue } =
    useForm<ContactFormValues>()

  useEffect(() => {
    if (session) fetchContact()
  }, [session])

  useEffect(() => {
    if (contact) {
      setValue('isAccepted', contact.is_accepted)
      setValue('deliveryDeadline', contact.delivery_deadline)
      setValue('replyDeadline', contact.reply_deadline)
      setIsChecked(contact.is_accepted ? true : false)
      setLoading(false)
    }
  }, [contact])

  const fetchContact = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      const { data, error, status } = await supabase
        .from('contacts')
        .select(
          `
          id, 
          email,
          is_accepted,
          delivery_deadline,
          reply_deadline, 
          email_sender, 
          updated_at, 
          created_at
        `
        )
        .eq('id', user.id)
        .single()

      if (error && status !== 406) throw error

      if (data) setContact(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const updateContact = async (data: ContactFormValues) => {
    try {
      setLoading(true)
      console.log('data', data)
      const updateDate: Date = new Date()
      const { error } = await supabase
        .from('contacts')
        .update({
          email_sender: data.emailSender,
          is_accepted: data.isAccepted,
          delivery_deadline: data.deliveryDeadline,
          reply_deadline: data.replyDeadline,
          updated_at: updateDate.toISOString(),
        })
        .eq('id', user?.id)
      if (error) throw error
    } catch (error) {
      console.error(error)
      setLoading(false)
      setIsError(true)
      setTimeout(() => setIsError(false), 5000)
    } finally {
      setTimeout(() => {
        setLoading(false)
        SetIsCompleted(true)
      }, 1000)
      setTimeout(() => SetIsCompleted(false), 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit(updateContact)}>
      <div className='flex w-full flex-col items-center '>
        <div className='flex w-full flex-col'>
          <h1 className='text-xl'>メールフォーム設定</h1>
          <ContactFormCheckbox
            label='依頼受付について'
            name='isAccepted'
            checkboxLabel='受付する'
            isChecked={isChecked}
            setIsChecked={setIsChecked}
            register={register}
            errors={formState.errors}
            options={{ required: false }}
          />
          {isChecked && (
            <ContactFormInput
              label='希望納期'
              type='date'
              name='deliveryDeadline'
              helpText='未入力の場合は希望納期を明記しません。'
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
          )}
          {isChecked && (
            <ContactFormInput
              label='返信日数'
              type='text'
              helpText='日数を 1~14 の半角数字で入力してください。'
              name='replyDeadline'
              register={register}
              errors={formState.errors}
              options={{
                required: false,
                pattern: {
                  value: /[1-9]|1[0-4]+$/,
                  message: '1~14 の半角数字で入力',
                },
              }}
            />
          )}
          {isChecked && (
            <ContactFormInput
              label='送信先メールアドレス'
              type='email'
              name='emailSender'
              helpText=''
              register={register}
              errors={formState.errors}
              options={{ required: false }}
            />
          )}
        </div>
        <AccountButton
          label='更新'
          type='submit'
          active={loading}
          disabled={loading}
          loading={loading}
          isCompleted={isCompleted}
          isError={isError}
          className='flex w-1/2'
        />
      </div>
    </form>
  )
}

export default ContactManager
