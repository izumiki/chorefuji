import Image from 'next/image'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css'
import Spinner from './Spinner'
import { ProfileFormValues } from './ProfileManager'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form'
import CropModal from './CropModal'

export type AvatarManagerProps = {
  avatarSrc: string | null | undefined
  avatarSide: number
  // setAvatarSrc: () => void
  register: UseFormRegister<ProfileFormValues>
  setValue: UseFormSetValue<ProfileFormValues>
}

export type AvatarImage = {
  src: string
  name: string
  size: string
  width: number
  height: number
}

const AvatarManager = ({
  avatarSrc,
  avatarSide,
  register,
  setValue,
}: AvatarManagerProps) => {
  const [src, setSrc] = useState<string>(avatarSrc || '')
  const [newSrc, setNewSrc] = useState<string>(avatarSrc || '')
  const [img, setImg] = useState<Blob | File>()
  const [imageWidth, setImageWidth] = useState<number>(384)
  const [imageHeight, setImageHeight] = useState<number>(384)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>()
  const side: number = avatarSide

  useCallback(() => {
    if (img) setValue('avatarImage', img)
  }, [img])

  useEffect(() => {
    if (avatarSrc) {
      setLoading(false)
      setSrc(avatarSrc)
    }
  }, [avatarSrc])

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || !event.target.files.length) {
      event.preventDefault()
      return
    }
    const avatarFile: FileList = event.target.files

    if (avatarFile[0].size > 1000000) {
      alert('ファイルサイズは 1MB 以下にしてください.')
      event.preventDefault()
      throw Error
    }
    // const url: string = URL.createObjectURL(avatarFile)
    const image = await loadRegisterImage(avatarFile)
    setImageWidth(image.width)
    setImageHeight(image.height)
    setNewSrc(image.src)
    event.target.value = ''
  }

  const loadRegisterImage = async (fileList: FileList | File[]) => {
    const file = fileList[0]
    const fileName: string = file.name
    const fileSize: string = convertFileSize(file.size)
    const imageFile: HTMLImageElement = await getAvatarImage(file)

    const image: AvatarImage = {
      src: imageFile.src,
      name: fileName,
      size: fileSize,
      width: imageFile.width,
      height: imageFile.height,
    }
    return image
  }

  const getAvatarImage = async (file: File): Promise<HTMLImageElement> => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = document.createElement('img')
      image.onload = () => {
        URL.revokeObjectURL
        resolve(image)
      }
      image.onerror = (error) => reject(error)

      image.src = URL.createObjectURL(file)
    })
  }

  const convertFileSize = (size: number): string => {
    if (0 < size && size <= 1024) return `${size} B`
    else if (1024 < size && size < 1024 ** 2)
      return `${Math.floor(size / 1024)} KB`
    else if (1024 ** 2 < size && size < 1024 ** 3)
      return `${Math.floor(size / 1024 ** 2)} MB`
    else return 'error'
  }

  if (loading) return <Spinner />

  return (
    <div className='flex w-96 flex-col items-center'>
      <CropModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setSrc={setSrc}
        setImg={setImg}
        newSrc={newSrc}
        imageWidth={imageWidth}
        imageHeight={imageHeight}
        cropAspect={1 / 1}
        cropCircle={true}
      />
      {src ? (
        <Image
          src={src}
          alt='avatar'
          width={side}
          height={side}
          className={`mb-4 h-96 w-96 rounded-full border-slate-700`}
        />
      ) : (
        <div className={`mb-4 h-96 w-96 rounded-full bg-slate-700`} />
      )}

      <label
        htmlFor={'avatarImage'}
        className={`
          flex h-12 w-64  cursor-pointer items-start justify-center 
          rounded bg-teal-500 p-3 
          font-bold text-white
          hover:bg-teal-700 focus:outline-none
         `}
      >
        Upload File
        <input
          type='file'
          id={'avatarImage'}
          multiple={false}
          className='hidden'
          accept='image/*'
          // ref={useRef<Blob | File>()}
          {...register('avatarImage', {
            // value:  File,
            onChange: (e: ChangeEvent<HTMLInputElement>) => {
              handleFile(e).then(() => setIsOpen(true))
            },
          })}
        />
      </label>
    </div>
  )
}

export default AvatarManager
