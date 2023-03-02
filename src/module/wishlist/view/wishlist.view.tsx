import { useCallback, useEffect } from 'react'

import Image from 'next/image'

import { faTrashCan, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContinueBrowsing } from '@module/cart/component/ContinueBrowsing'
import { Currency } from '@shared/component'
import useCartStore, { useWishlistItems } from '@store/cart/cart.store'
import { FormattedMessage } from 'react-intl'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { shallow } from 'zustand/shallow'

const WishlistView = () => {
  const { favorites, toggleWishlist, showWishlist, removeFromWishlist } = useCartStore((state) => state, shallow)
  const wishlistItems = useWishlistItems()

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        toggleWishlist()
      }
    },
    [toggleWishlist]
  )

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [escFunction])

  return (
    <div
      className={`font-inter fixed w-[30rem] top-0 right-0 h-screen pt-2 bg-primary-light z-50 transform-gpu transition duration-500 ease-in-out
        ${showWishlist ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-40'}`}
    >
      <div className={'h-[80%] overflow-y-auto mt-3'}>
        <FontAwesomeIcon
          icon={faXmark}
          className={
            'absolute right-0 mr-6 mt-0.5 text-blue-600 hover:text-blue-700 active:text-blue-900 dark:text-blue-100 dark:hover:text-blue-300 dark:active:text-blue-700 text-3xl mx-auto cursor-pointer z-30'
          }
          onClick={toggleWishlist}
        />

        {favorites.length > 0 && (
          <h5 className={'text-blue-700 dark:text-blue-100 text-2xl font-medium pl-3'}>
            <FormattedMessage id={'wishlist_title'} /> ({wishlistItems}{' '}
            <FormattedMessage id={'wishlist_title_products'} />)
          </h5>
        )}

        {favorites.length === 0 && (
          <div className={'ml-14 md:ml-0 text-blue-700 dark:text-blue-50 text-center font-medium mt-[30%]'}>
            <ContinueBrowsing
              onExit={toggleWishlist}
              message={<FormattedMessage id={'wishlist_empty'} />}
              mode={'wishlist'}
            />
          </div>
        )}

        <TransitionGroup component={'div'}>
          {favorites.map((wishlistItem, index) => (
            <CSSTransition key={index} timeout={700} classNames="item">
              <div
                key={index}
                className={
                  'relative flex min-h-[10rem] mt-10 border-b border-secondary-200 dark:border-blue-400 px-4 flex'
                }
              >
                <div className={'w-40 min-w-[6rem]'}>
                  <Image
                    alt={''}
                    src={wishlistItem.product?.thumbnail as string}
                    loading={'lazy'}
                    width={'512'}
                    height={'512'}
                  />{' '}
                </div>
                <div className={'pl-2 w-5/6 relative'}>
                  <h5 className={'text-blue-400 dark:text-blue-100 text-lg font-medium mb-1'}>
                    {wishlistItem.product?.name}
                  </h5>
                  <div className={'flex justify-between mt-2'}>
                    <Currency
                      amount={Math.round(wishlistItem.product?.price)}
                      className={'mr-5 text-xl text-danger-default font-bold'}
                    />
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      className={
                        'mr-2 text-danger-400 hover:text-danger-600 active:text-danger-800 transition duration-200 ease-in text-xl cursor-pointer'
                      }
                      onClick={() => {
                        removeFromWishlist(wishlistItem.product.id as string)
                      }}
                    />
                  </div>
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  )
}

export { WishlistView }
