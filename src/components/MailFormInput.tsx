import React from 'react'
import {
  FieldError,
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form'
import { MailFormValues } from './Mailform'
import RequiredLabel from './RequiredLabel'

export type MailFormInputProps = {
  label: string
  type?: string
  helpText?: string
  unit?: string
  disabled?: boolean
  name:
    | 'client'
    | 'clientEmail'
    | 'clientWebsite'
    | 'clientCompany'
    | 'title'
    | 'details'
    | 'budget'
    | 'deliveryDate'
    | 'isPublic'
  register: UseFormRegister<MailFormValues>
  errors: FieldErrors<MailFormValues>
  options: RegisterOptions
}

const MailFormInput = ({
  label,
  type,
  helpText,
  unit,
  name,
  register,
  errors,
  options,
}: MailFormInputProps) => {
  const error: FieldError | undefined = errors[name]

  return (
    <div className='flex h-16 w-full justify-center font-KleeOne md:h-[40px]'>
      <div className='flex w-auto items-start'>
        <div className='flex h-6 w-9 items-center'>
          {options.required && <RequiredLabel />}
        </div>
        <div className='flex h-12 w-24 flex-wrap md:h-6 md:w-48'>
          <label
            htmlFor={name}
            className='flex h-12 w-24 items-start text-base font-bold md:h-6 md:w-48 md:px-2'
          >
            {label}
          </label>

          <label
            htmlFor={name}
            className='flex h-4 w-24 items-center text-xs md:w-48 md:px-2'
          >
            {helpText}
          </label>
        </div>
      </div>

      <div className='flex h-16 w-full flex-wrap items-start md:h-9'>
        <input
          id={name}
          type={type}
          className={`flex h-6 w-[90%] items-center border-b-[1.5px] bg-transparent font-sans text-gray-800 md:h-6 md:w-5/6
        ${
          !error
            ? 'border-black  focus:outline-none'
            : ' border-red-600  focus:outline-none'
        }`}
          {...register(name, options)}
        />
        <label
          htmlFor={name}
          className='flex h-6 w-4 items-center md:w-8 md:px-2'
        >
          {unit}
        </label>

        <div className='flex h-4 w-[90%] flex-wrap items-start md:w-5/6'>
          {error && (
            // {error.type === 'required' &&
            <label
              className='flex w-full justify-end text-right text-xs text-red-600'
              htmlFor={name}
            >
              {error.message}
            </label>
          )}
        </div>
      </div>
    </div>
  )
}

export default MailFormInput
