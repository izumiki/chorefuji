import React, { useEffect, useState } from 'react'
import { Database } from '../../lib/database.types'
import {
  Session,
  SupabaseClient,
  User,
  useSupabaseClient,
  useUser,
} from '@supabase/auth-helpers-react'
import WorksList from './WorksEditor'
import WorksRegister from './WorksRegister'
import { Button, Header, Icon } from 'semantic-ui-react'
import ReactModal from 'react-modal'
import AccountButton from './AccountButton'
import WorksDeleteModal from './WorksDeleteModal'
export type Works = Database['public']['Tables']['works']['Row']

const WorksManager = ({ session }: { session: Session }) => {
  const [loading, setLoading] = useState<boolean>(true)
  const supabase: SupabaseClient<Database> = useSupabaseClient<Database>()
  const user: User | null = useUser()
  const [works, setWorks] = useState<Works[]>()
  const [isRegister, setIsRegister] = useState<boolean>(true)
  const [worksIndex, setWorksIndex] = useState<number>(0)
  const [maxIndex, setMaxIndex] = useState<number>(0)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  useEffect(() => {
    if (session) fetchWorks()
  }, [session])

  useEffect(() => {
    setLoading(true)
    if (works) {
      setMaxIndex(works.length)
      setLoading(false)
    }
  }, [works])

  const fetchWorks = async () => {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')
      const { data, error, status } = await supabase
        .from('works')
        .select(
          `
          id,
          email,
          works_id,
          client, 
          title,
          department,
          url,
          updated_at, 
          created_at
        `
        )
        .eq('id', user.id)
        .order('created_at', { ascending: false })

      if (error && status !== 406) throw error

      if (data) setWorks(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex w-full flex-col items-center'>
      {isRegister || !works ? (
        <div className='flex flex-col items-center'>
          <Header as='h2'>Works 登録</Header>
          <div className='flex w-full flex-row justify-between'>
            <div className='flex flex-row justify-between gap-2'>
              <button onClick={() => setIsRegister(true)}>
                <Icon name='plus circle' color='teal' />
              </button>
              <button onClick={() => setIsRegister(false)}>
                <Icon name='edit' color='teal' disabled={!works} />
              </button>
            </div>

            <div className='flex flex-row justify-between'>
              <div>
                <button
                  onClick={() => setWorksIndex(worksIndex - 1)}
                  disabled={true}
                >
                  <Icon name='arrow left' color='teal' disabled={true} />
                </button>
                <button
                  onClick={() => setWorksIndex(worksIndex + 1)}
                  disabled={true}
                >
                  <Icon name='arrow right' color='teal' disabled={true} />
                </button>
              </div>
            </div>
          </div>
          <WorksRegister />
        </div>
      ) : (
        <div className='flex flex-col items-center'>
          <Header as='h2'>Works 編集</Header>
          <div className='flex w-full flex-row justify-between'>
            <div className='flex flex-row justify-between gap-2'>
              <button onClick={() => setIsRegister(true)}>
                <Icon name='plus circle' color='teal' />
              </button>
              <button onClick={() => setIsRegister(false)}>
                <Icon name='edit' color='teal' disabled={!works} />
              </button>
            </div>

            <div className='flex flex-row justify-between'>
              <div>
                <button
                  onClick={() => setWorksIndex(worksIndex - 1)}
                  disabled={worksIndex === 0}
                >
                  <Icon
                    name='arrow left'
                    color='teal'
                    disabled={worksIndex === 0}
                  />
                </button>
                <button
                  onClick={() => setWorksIndex(worksIndex + 1)}
                  disabled={worksIndex === maxIndex - 1}
                >
                  <Icon
                    name='arrow right'
                    color='teal'
                    disabled={worksIndex === maxIndex - 1}
                  />
                </button>
              </div>
            </div>
          </div>
          <WorksList
            works={works[worksIndex]}
            index={worksIndex}
            fetchWorks={fetchWorks}
          />
        </div>
      )}
    </div>
  )
}

export default WorksManager
