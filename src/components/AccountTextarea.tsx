import React from 'react'

export type AccountTextareaprops = {
  label?: string
  text?: string
  helpText?: string
}

const AccountTextarea = ({ label, text, helpText }: AccountTextareaprops) => {
  return (
    <div className='flex w-96 flex-col justify-items-center'>
      <label className='text-sm font-bold text-slate-600'>
        {label}
        <span className=' text-teal-700'> {helpText}</span>
      </label>
      <div
        className={
          'flex h-8 w-full resize-none truncate rounded border px-2 align-middle text-slate-600 shadow'
        }
      >
        {text}
      </div>
    </div>
  )
}

export default AccountTextarea
