import React from 'react'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

import { RegisterOptions } from 'react-hook-form'
import { ProfileFormValues } from './ProfileManager'
import { ContactFormValues } from './ContactManager'

export type ContactFormInputProps = {
  label: string
  type?: string
  helpText?: string
  disabled?: boolean
  name: 'emailSender' | 'isAccepted' | 'deliveryDeadline' | 'replyDeadline'
  register: UseFormRegister<ContactFormValues>
  errors: FieldErrors<ContactFormValues>
  options: RegisterOptions
}

const ContactFormInput = ({
  label,
  type,
  helpText,
  disabled,
  name,
  register,
  errors,
  options,
}: ContactFormInputProps) => {
  const error = errors[name]

  return (
    <div className='flex h-20 w-full flex-col py-2'>
      <label htmlFor={name} className='text-sm font-bold text-slate-600'>
        {label}
        <span className=' text-teal-700'> {helpText}</span>
      </label>
      <input
        id={name}
        type={type}
        disabled={disabled}
        className={`h-8 w-full rounded border px-2 text-slate-600 shadow 
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

export default ContactFormInput
