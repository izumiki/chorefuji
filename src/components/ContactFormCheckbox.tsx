import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormState, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { ProfileFormInputProps } from './ProfileFormInput'
import { ContactFormInputProps } from './ContactFormInput'

export type ContactFormCheckboxProps = ContactFormInputProps & {
  checkboxLabel: string
  isChecked: boolean
  setIsChecked: Dispatch<SetStateAction<boolean>>
}

const ContactFormCheckbox = ({
  label,
  checkboxLabel,
  isChecked,
  setIsChecked,
  helpText,
  name,
  register,
  options,
}: ContactFormCheckboxProps) => {
  return (
    <div className='flex w-full flex-col py-2 '>
      <div className='flex w-2/3 justify-start'>
        <label htmlFor={name} className='flex text-sm font-bold text-slate-600'>
          {label}
          <span className=' text-teal-700'> {helpText}</span>
        </label>
      </div>

      <div className='flex w-full flex-col justify-between justify-items-center '>
        <div className='flex justify-center' key={label}>
          <input
            id={label}
            type='checkbox'
            checked={isChecked}
            onClick={() => {
              setIsChecked(!isChecked)
            }}
            className='accent-teal-300'
            {...register(name, options)}
          />
          <label
            htmlFor={label}
            className='px-2 text-sm font-bold text-slate-600'
          >
            {checkboxLabel}
          </label>
        </div>
      </div>
    </div>
  )
}

export default ContactFormCheckbox
