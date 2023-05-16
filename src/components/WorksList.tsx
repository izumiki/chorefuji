'use client'
import React, { useEffect } from 'react'
import { Database } from '@/lib/database.types'

type WorksList = Database['public']['Tables']['works']['Row']

const WorksList = ({ works }: { works: WorksList[] }) => {
  return (
    <div className='w-full items-center justify-center text-center'>
      <div className='text-base md:text-xl xl:text-2xl 3xl:text-3xl'>
        制作実績（敬称略）
      </div>
      {works.map((work: WorksList) => {
        return (
          <li
            className='flex list-none items-center justify-center py-1 text-center 3xl:py-2'
            key={work.works_id}
          >
            <a href={work.url!} target='_blank'>
              <div className='flex cursor-pointer items-center justify-center text-center text-xs text-susutake text-opacity-75 underline md:text-base xl:whitespace-pre-wrap xl:text-lg 3xl:text-xl'>
                {work.client}
                {'\n'}
                {work.title}
                {'\n'}
                {work.department}
              </div>
            </a>
          </li>
        )
      })}
    </div>
  )
}

export default WorksList
