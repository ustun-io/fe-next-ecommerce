import { useState } from 'react'

import Image from 'next/image'

import { Image as IImage } from '@/shared/model/image.entity'

import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { Icon } from '@shared/component'

interface ISlider {
  images: IImage[] | undefined
}

const ImageGallery = ({ images = [] }: ISlider) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1
    const newIndex = isLastSlide ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <div className={'w-full h-full flex justify-between select-none'}>
      <div
        className={`text-secondary-200 w-2/12 overflow-x-hidden ${
          images.length >= 5 ? 'overflow-y-auto' : 'overflow-y-hidden' // for thumbnails: only show scrollbar if more or equal 5 images
        }`}
      >
        {images.map((productImage: IImage, index: number) => (
          <Image
            key={index}
            src={productImage.url as string}
            className={`cursor-pointer mb-3 p-1.5 rounded ${index === currentIndex ? 'border border-primary-200' : ''}`}
            alt={'thumbnail'}
            loading={'lazy'}
            onClick={() => setCurrentIndex(index)}
            width={'100'}
            height={'100'}
          />
        ))}
      </div>
      <div className={'relative w-10/12 h-full ml-2'}>
        {currentIndex !== 0 && (
          <div
            className={'absolute left-1/2 top-0 mt-5 z-10 cursor-pointer'}
            style={{ transform: 'translate(0, -50%)' }}
          >
            <Icon
              icon={faChevronUp}
              onClick={prevSlide}
              width={30}
              height={30}
              className={'text-3xl text-blue-300 hover:text-blue-600'}
            />
          </div>
        )}
        <Image
          src={images[currentIndex].url as string}
          className={'h-full w-full absolute top-0 object-contain rounded-lg'}
          alt={'product image'}
          loading={'lazy'}
          width={'512'}
          height={'512'}
        ></Image>
        {currentIndex !== images?.length - 1 && (
          <div className={'absolute left-1/2 bottom-0 z-10 cursor-pointer'} style={{ transform: 'translate(0, -50%)' }}>
            <Icon
              icon={faChevronDown}
              onClick={nextSlide}
              width={30}
              height={30}
              className={'text-3xl text-blue-300 hover:text-blue-600'}
            />
          </div>
        )}
      </div>
    </div>
  )
}

ImageGallery.defaultProps = {
  images: []
}

export { ImageGallery }
