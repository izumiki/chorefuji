'use client'
import React, { useEffect } from 'react'
import { Database } from '@/lib/database.types'

type WorksList = Database['public']['Tables']['works']['Row']

const WorksList = ({ works }: { works: WorksList[] }) => {
  return (
    <div className='w-full items-center justify-center text-center'>
      <div className='text-base md:text-xl'>制作実績（敬称略）</div>
      {works.map((work: WorksList) => {
        return (
          <li
            className='flex list-none items-center justify-center py-1 3xl:py-2'
            key={work.works_id}
          >
            <a href={work.url!} target='_blank'>
              <div className='flex cursor-pointer text-xs md:text-base lg:whitespace-pre-line 3xl:text-xl'>
                {work.client}
                {'  '}
                {work.title}
                {'  '}
                {work.department}{' '}
              </div>
            </a>
          </li>
        )
      })}
    </div>
  )
}

export default WorksList
