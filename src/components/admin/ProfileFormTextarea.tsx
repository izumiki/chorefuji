import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { RegisterOptions } from 'react-hook-form'
import { ProfileFormInputProps } from './ProfileFormInput'

const ProfileFormTextarea = ({
  label,
  helpText,
  name,
  register,
  errors,
  options,
}: ProfileFormInputProps) => {
  const error = errors[name]

  return (
    <div className='flex h-64 w-full flex-col py-2'>
      <label htmlFor={name} className='text-sm font-bold text-slate-600'>
        {label}
        <span className=' text-teal-700'> {helpText}</span>
      </label>
      <textarea
        id={name}
        className={`h-48 w-full resize-none rounded border px-2 text-gray-800 shadow 
        ${
          error
            ? 'border-red-400 focus:outline-none focus:ring focus:ring-red-400'
            : 'focus:outline-none focus:ring focus:ring-teal-200'
        }`}
        {...register(name, options)}
      />
      <div className='text-right text-red-500'>{error && error.message}</div>
    </div>
  )
}

export default ProfileFormTextarea
