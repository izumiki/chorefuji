import React, { Dispatch, SetStateAction, useState } from 'react'
import ReactModal from 'react-modal'
import { Works } from './WorksManager'
import { SupabaseClient, User } from '@supabase/supabase-js'
import { Database } from '@/lib/database.types'
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react'
import AccountButton from './AccountButton'
import AccountTextarea from './AccountTextarea'
import { Header } from 'semantic-ui-react'
import { RemoveScroll } from 'react-remove-scroll'

type WorksDeleteModalProps = {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  works: Works | null
  fetchWorks: () => Promise<void>
}

const WorksDeleteModal = ({
  isOpen,
  setIsOpen,
  works,
  fetchWorks,
}: WorksDeleteModalProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const user: User | null = useUser()

  const deleteWorks = async (works: Works) => {
    try {
      setLoading(true)
      console.log('delete', works)
      if (!user) throw new Error('No user')
      const { error } = await supabase
        .from('works')
        .delete()
        .eq('works_id', works.works_id)

      if (error) throw error
    } catch (error) {
      console.error(error)
    } finally {
      fetchWorks()

      setLoading(false)
    }
  }

  return (
    <RemoveScroll enabled={isOpen} removeScrollBar={false}>
      <ReactModal
        isOpen={isOpen}
        // onRequestClose={() => setIsOpen(false)}
        contentLabel='Crop Modal'
        className='mx-auto mt-24 flex h-[360px] w-full flex-auto flex-col items-center justify-center bg-slate-50 sm:w-[640px] sm:rounded-3xl'
        overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
        ariaHideApp={false}
      >
        <div className='flex  flex-col justify-between'>
          <Header as='h3'>本当に削除しますか？</Header>
          <div className='flex  flex-col justify-between gap-4'>
            <AccountTextarea label='依頼者' text={works!.client || ''} />
            <AccountTextarea label='タイトル' text={works!.title || ''} />
            <AccountTextarea label='担当箇所' text={works!.department || ''} />
            <AccountTextarea label='url' text={works!.url || ''} />
          </div>
          <div className='mt-8 flex flex-row justify-between '>
            <AccountButton
              label='キャンセル'
              type='button'
              active={true}
              color='teal'
              className='flex w-32'
              onClick={() => setIsOpen(false)}
            />
            <AccountButton
              label='削除'
              type='button'
              active={true}
              color='red'
              className='flex w-32'
              onClick={() => {
                if (works) deleteWorks(works)
                fetchWorks()
                setIsOpen(false)
              }}
            />
          </div>
        </div>
      </ReactModal>
    </RemoveScroll>
  )
}

export default WorksDeleteModal
