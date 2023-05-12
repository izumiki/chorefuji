import { useEffect, useState } from 'react'
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PercentCrop,
} from 'react-image-crop'
import Modal from 'react-modal'
import Image from 'next/image'

export type CropModalProps = {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  newSrc: string
  setSrc: (src: string) => void
  setImg: (img: Blob | File) => void
  imageWidth: number
  imageHeight: number
  cropAspect: number
  cropCircle?: boolean
}

const CropModal = ({
  isOpen,
  setIsOpen,
  newSrc,
  setSrc,
  setImg,
  imageWidth,
  imageHeight,
  cropAspect,
  cropCircle = false,
}: CropModalProps) => {
  const cropCenter = (
    percent: number,
    width: number,
    height: number,
    aspect: number
  ) => {
    const crop = centerCrop(
      makeAspectCrop(
        {
          unit: '%',
          width: percent,
        },
        aspect,
        width,
        height
      ),
      width,
      height
    )
    return crop
  }

  const [crop, setCrop] = useState<PercentCrop>(
    cropCenter(100, imageWidth, imageHeight, cropAspect)
  )
  const [completedCrop, setCompletedCrop] = useState<PercentCrop>(
    cropCenter(100, imageWidth, imageHeight, cropAspect)
  )

  useEffect(() => {
    setCrop(cropCenter(100, imageWidth, imageHeight, cropAspect))
    setCompletedCrop(cropCenter(100, imageWidth, imageHeight, cropAspect))
  }, [imageWidth, imageHeight, cropAspect])

  const cropImage = (
    src: string,
    setSrc: (src: string) => void,
    setImg: (img: Blob | File) => void,
    completedCrop: PercentCrop
  ) => {
    const image: HTMLImageElement = document.createElement('img')
    image.src = src
    const croppedImageWidth: number = (completedCrop.width * image.width) / 100
    const croppedImageHeight: number =
      (completedCrop.height * image.height) / 100
    const croppedImageX = (completedCrop.x * image.width) / 100
    const croppedImageY = (completedCrop.y * image.height) / 100
    const canvas: HTMLCanvasElement = document.createElement('canvas')
    // console.log('crossOrigin', image.crossOrigin) // crossOrigin設定 なんとかする.
    canvas.width = croppedImageWidth
    canvas.height = croppedImageHeight
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d')!
    ctx.drawImage(
      image,
      croppedImageX,
      croppedImageY,
      croppedImageWidth,
      croppedImageHeight,
      0,
      0,
      croppedImageWidth,
      croppedImageHeight
    )

    canvas.toBlob(
      (blob: Blob | null) => {
        if (!blob) return
        const newSrc = URL.createObjectURL(blob)
        setSrc(newSrc)
        setImg(blob)
      },
      'image/jpeg',
      0.85
    )
  }

  return (
    <Modal
      isOpen={isOpen}
      // onRequestClose={() => setIsOpen(false)}
      contentLabel='Crop Modal'
      className='flex h-full w-full flex-auto flex-col items-center justify-center gap-6 bg-white/0 
      py-12'
      overlayClassName='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
      ariaHideApp={false}
    >
      <ReactCrop
        crop={crop}
        aspect={cropAspect}
        onChange={(_, percentCrop) => {
          setCrop(percentCrop)
        }}
        onComplete={(_, percentCrop) => {
          setCompletedCrop(percentCrop)
        }}
        circularCrop={cropCircle}
      >
        <Image
          src={newSrc}
          alt='cropImage'
          width={540}
          height={540}
          className={`${imageWidth >= imageHeight ? 'w-[540]' : 'h-[540]'}`}
        />
      </ReactCrop>
      <div className='flex flex-auto flex-row  justify-between gap-36'>
        <button
          onClick={() => {
            setIsOpen(false)
          }}
          className={`
            flex h-10 w-24 cursor-pointer justify-center 
            rounded bg-red-400 p-2 
            font-bold text-white
            hover:bg-red-600 focus:outline-none
          `}
        >
          Cancel
        </button>
        <button
          onClick={() => {
            cropImage(newSrc, setSrc, setImg, completedCrop)
            setIsOpen(false)
          }}
          className={`
            flex h-10 w-24 cursor-pointer justify-center 
            rounded bg-teal-500 p-2 
            font-bold text-white
            hover:bg-teal-700 focus:outline-none
          `}
        >
          OK
        </button>
      </div>
    </Modal>
  )
}

export default CropModal
