import { Database } from '../lib/database.types'
import React, { useEffect, useState } from 'react'
import {
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import { useForm } from 'react-hook-form'
import WorksInputForm from './WorksFormInput'
import AccountButton from './AccountButton'
import { Icon } from 'semantic-ui-react'
import WorksDeleteModal from './WorksDeleteModal'

type Works = Database['public']['Tables']['works']['Row']

export type WorkFormValues = {
  client: string | null
  department: string | null
  title: string | null
  url: string | null
}

export type WorksEditorProps = {
  works: Works
  index: number
  fetchWorks: () => Promise<void>
}

const WorksEditor = ({ works, index, fetchWorks }: WorksEditorProps) => {
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const user: User | null = useUser()
  const [loading, setLoading] = useState<boolean>(false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isCompleted, setIsCompleted] = useState<boolean>(false)
  const [isError, setIsError] = useState<boolean>(false)
  const { register, handleSubmit, formState, setValue } =
    useForm<WorkFormValues>()

  useEffect(() => {
    if (works) {
      setValue('client', works.client)
      setValue('title', works.title)
      setValue('department', works.department)
      setValue('url', works.url)

      setLoading(false)
    }
  }, [works])

  const updateWorks = async (data: WorkFormValues) => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      console.log('update', data)
      const date: Date = new Date()
      const { error } = await supabase
        .from('works')
        .update({
          client: data.client,
          title: data.title,
          department: data.department,
          url: data.url,
          updated_at: date.toISOString(),
        })
        .eq('works_id', works.works_id)
        .eq('id', works.id)

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
      setTimeout(() => {
        setIsCompleted(false)
        fetchWorks()
      }, 2000)
    }
  }

  return (
    <form onSubmit={handleSubmit(updateWorks)}>
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
            type='text'
            name='url'
            helpText='必須'
            register={register}
            errors={formState.errors}
            options={{ required: '入力してください' }}
          />
        </div>
        <div className='flex h-8 w-full items-center justify-between py-4'>
          <button type='button' onClick={() => setIsOpen(true)} className='w-4'>
            <Icon name='trash' color='black' />
          </button>

          <label>{index + 1}</label>
        </div>
        <AccountButton
          label='更新'
          type='submit'
          active={loading}
          disabled={loading}
          loading={loading}
          isCompleted={isCompleted}
          isError={isError}
          color='teal'
          className='flex w-1/2'
        />
      </div>
      <WorksDeleteModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        works={works}
        fetchWorks={fetchWorks}
      />
    </form>
  )
}

export default WorksEditor
