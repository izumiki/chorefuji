import { FieldError, FormState, UseFormRegister } from 'react-hook-form'
import RequiredLabel from './RequiredLabel'
import { MailFormInputProps } from './MailFormInput'

const MailFormTextarea = ({
  label,
  helpText,
  name,
  register,
  errors,
  options,
}: MailFormInputProps) => {
  const error: FieldError | undefined = errors[name]

  return (
    <div className='flex h-28 w-full justify-center font-KleeOne md:h-52'>
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

      <div className='line-clamp-4 flex h-28 w-full flex-col items-start md:h-48 md:w-5/6 xl:h-52'>
        <textarea
          id={name}
          rows={4}
          // value={name}
          defaultValue=''
          className={`flex h-24 w-[90%] resize-none items-center border-b-[1.5px] bg-transparent font-sans text-gray-800 md:h-48 md:w-5/6
        ${
          !error
            ? 'border-black  focus:outline-none'
            : ' border-red-600  focus:border-black  focus:outline-none'
        }`}
          {...register(name, options)}
        />

        <div className='flex h-4 w-[90%] flex-wrap md:w-5/6'>
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

export default MailFormTextarea
