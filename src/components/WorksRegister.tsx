import { Database } from '../types/database.types'
import React, { useState } from 'react'
import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { useForm } from 'react-hook-form'
import { v4 as uuidv4 } from 'uuid'
import WorksInputForm from './WorksFormInput'
import AccountButton from './AccountButton'
import { Icon } from 'semantic-ui-react'

type Works = Database['public']['Tables']['works']['Row']

export type WorkFormValues = {
  client: string | null
  department: string | null
  title: string | null
  url: string | null
}

const WorksRegister = () => {
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const user: User | null = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { register, handleSubmit, formState } = useForm<WorkFormValues>()

  const insertWorks = async (data: WorkFormValues) => {
    try {
      setLoading(true)
      console.log('data', data)
      const uuid: string = uuidv4()
      if (!user) throw new Error('No user')
      const date: Date = new Date()
      const { error } = await supabase
        .from('works')
        .insert({
          id: user.id,
          email: user.email,
          works_id: uuid,
          client: data.client,
          title: data.title,
          department: data.department,
          url: data.url,
          created_at: date.toISOString(),
          updated_at: date.toISOString(),
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
        setIsCompleted(true)
      }, 1000)
      setTimeout(() => setIsCompleted(false), 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit(insertWorks)}>
      <div className='flex w-96 flex-col items-center'>
        <div className='flex w-full flex-col'>
          <WorksInputForm
            label='依頼者'
            type='text'
            name='client'
            helpText='必須'
            register={register}
            errors={formState.errors}
            options={{ required: '入力してください' }}
          />
          <WorksInputForm
            label='タイトル'
            type='text'
            name='title'
            helpText='必須'
            register={register}
            errors={formState.errors}
            options={{ required: '入力してください' }}
          />
          <WorksInputForm
            label='担当箇所'
            type='text'
            name='department'
            helpText='必須'
            register={register}
            errors={formState.errors}
            options={{ required: '入力してください' }}
          />
          <WorksInputForm
            label='url'
            type='url'
            name='url'
            helpText='必須'
            register={register}
            errors={formState.errors}
            options={{ required: '入力してください' }}
          />
        </div>
        <div className='flex h-8 w-full items-center justify-start'></div>
        <AccountButton
          label='登録'
          type='submit'
          active={loading}
          loading={loading}
          isCompleted={isCompleted}
          isError={isError}
          color='teal'
          className='flex w-1/2'
        />
      </div>
    </form>
  )
}
export default WorksRegister
