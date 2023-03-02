import React from 'react'

import Image from 'next/image'
import Link from 'next/link'

import Rating from '@/shared/component/Rating'
import { IProduct } from '@/shared/interface/product.interface'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faBookmark as FaBookmark } from '@fortawesome/free-regular-svg-icons'
import { faBookmark, faCheck, faShoppingCart, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Name } from '@module/product/component/Name/name.component'
import { Button, Currency } from '@shared/component'
import useCartStore from '@store/cart/cart.store'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

export const Card = ({ product }: IProduct) => {
  const { addToCart, toggleCart, addToWishlist, toggleWishlist, favorites, removeFromWishlist } = useCartStore(
    (store) => store,
    shallow
  )
  const foundInWishlist = favorites.find((wishlistItem) => wishlistItem.product.id === product.id)

  return (
    <Link
      key={product.id}
      className="w-80 mb-5 mx-auto sm:w-[17rem] sm:mb-1 bg-secondary-300 dark:bg-[#2A2D3D] transition duration-200 ease-in cursor-pointer shadow-lg rounded-xl"
      href={`/products/${product.id}`}
    >
      <div className={'relative overflow-hidden py-2 px-2 hover:opacity-75 transition duration-200 ease-in'}>
        <Image
          alt={'product image'}
          src={product.thumbnail as string}
          className={'focus:outline-none w-full sm:w-full h-72 object-cover rounded'}
          loading={'lazy'}
          width={'512'}
          height={'512'}
        />
      </div>
      <div className={`flex flex-row py-2 px-1.5 ${product.stock >= 0 && 'relative'}`}>
        <div className={'flex-1 relative min-h-[9rem]'}>
          <div className={'flex justify-between items-center'}>
            <Currency className={'text-lg text-danger-default font-bold'} amount={product.price} />
            {product.stock > 0 && (
              <div className={'flex items-center text-primary-light dark:text-success-400 px-1 py-0.5 rounded -mt-2'}>
                <FormattedMessage id={'product_available'} /> <FontAwesomeIcon icon={faCheck} className={'ml-2'} />
              </div>
            )}
            {product.stock === 0 && (
              <div className={'flex items-center text-primary-light dark:text-danger-500 px-1 py-0.5 rounded -mt-2'}>
                <FormattedMessage id={'product_outOfStock'} /> <FontAwesomeIcon icon={faXmark} className={'ml-2'} />
              </div>
            )}
          </div>
          <Name productName={product.name} />
          {product.stock > 0 && (
            <div className={'flex items-center justify-start mt-2'}>
              <Button
                className={'min-w-[11rem] flex justify-evenly'}
                onClick={(e: { preventDefault: () => void }) => {
                  e.preventDefault()
                  addToCart(product)
                  toggleCart()
                }}
              >
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className={
                    'text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-lg cursor-pointer pr-2'
                  }
                />
                <FormattedMessage id={'product_addToCart'} />
              </Button>
              <FontAwesomeIcon
                icon={foundInWishlist ? faBookmark : (FaBookmark as IconProp)}
                className={
                  'ml-5 text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-lg cursor-pointer'
                }
                onClick={(e) => {
                  e.preventDefault()
                  if (foundInWishlist) {
                    removeFromWishlist(product.id as string)
                  } else {
                    addToWishlist(product)
                    toggleWishlist()
                  }
                }}
              />
            </div>
          )}
          {product.ratingAverage && (
            <div className={'mt-3 px-1'}>
              <Rating rating={product.ratingAverage} />
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
