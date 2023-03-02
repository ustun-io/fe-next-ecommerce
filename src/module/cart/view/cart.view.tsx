import { useCallback, useEffect } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { faCircleMinus, faCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ContinueBrowsing } from '@module/cart/component/ContinueBrowsing'
import { Button, Currency } from '@shared/component'
import useCartStore, { useCartItems, useCartTotal } from '@store/cart/cart.store'
import { FormattedMessage } from 'react-intl'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { shallow } from 'zustand/shallow'

const CartView = () => {
  const { cart, removeFromCart, increase, decrease, toggleCart, showCart } = useCartStore((state) => state, shallow)
  const cartTotal = useCartTotal()
  const cartItems = useCartItems()

  const router = useRouter()

  const handleCheckout = () => {
    toggleCart()
    router.push('/cart/checkout')
  }

  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        toggleCart()
      }
    },
    [toggleCart]
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
        ${showCart ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-40'}`}
    >
      <div className={'h-[80%] overflow-y-auto mt-3'}>
        <FontAwesomeIcon
          icon={faXmark}
          className={
            'absolute right-0 mr-6 mt-0.5 text-blue-600 hover:text-blue-700 active:text-blue-900 dark:text-blue-100 dark:hover:text-blue-300 dark:active:text-blue-700 text-3xl mx-auto cursor-pointer z-30'
          }
          onClick={toggleCart}
        />

        {cart.length > 0 && (
          <h5 className={'text-blue-700 dark:text-blue-100 text-2xl font-medium pl-3'}>
            <FormattedMessage id={'cart_title'} /> ({cartItems} <FormattedMessage id={'cart_title_products'} />)
          </h5>
        )}

        {cart.length === 0 && (
          <div className={'ml-14 md:ml-0 text-blue-700 dark:text-blue-50 text-center font-medium mt-[30%]'}>
            <ContinueBrowsing onExit={toggleCart} message={<FormattedMessage id={'cart_empty'} />} />
          </div>
        )}

        <TransitionGroup component={'div'}>
          {cart.map((cartItem, index) => (
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
                    src={cartItem.product?.thumbnail as string}
                    loading={'lazy'}
                    width={'512'}
                    height={'512'}
                  />{' '}
                  <FontAwesomeIcon
                    icon={faCircleMinus}
                    className={
                      'absolute right-0 top-0 -mt-6 mr-2 text-danger-400 hover:text-danger-600 active:text-danger-800 transition duration-200 ease-in text-2xl cursor-pointer z-30'
                    }
                    onClick={() => {
                      removeFromCart(cartItem.product.id as string)
                    }}
                  />
                </div>
                <div className={'pl-2 w-5/6 relative'}>
                  <h5 className={'text-blue-400 dark:text-blue-100 text-lg font-medium mb-1'}>
                    {cartItem.product?.name}
                  </h5>
                  <div className={'flex items-center space-x-3'}>
                    <FontAwesomeIcon
                      icon={faCircleMinus}
                      onClick={() => {
                        decrease(cartItem.product.id as string)
                      }}
                      className={
                        'text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-xl cursor-pointer select-none'
                      }
                    />
                    <h5 className={'text-blue-400 dark:text-blue-100 font-medium select-none'}>{cartItem.quantity}</h5>
                    <FontAwesomeIcon
                      icon={faCirclePlus}
                      onClick={() => {
                        increase(cartItem.product.id as string)
                      }}
                      className={
                        'text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-xl cursor-pointer select-none'
                      }
                    />
                  </div>
                  <Currency
                    amount={Math.round(cartItem.product?.price * cartItem.quantity)}
                    className={'absolute right-0 mr-5 text-xl text-danger-default font-bold'}
                  />
                </div>
              </div>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>

      {cart.length > 0 && (
        <>
          <div className={'max-h-[20%] w-3/6 absolute bottom-0 right-0 mr-4 mb-2 text-red-400'}>
            <ul className={'mb-12'}>
              <li className={'flex mb-2'}>
                <span className={'w-1/2 font-medium'}>
                  <FormattedMessage id={'cart_price_subTotal'} />
                </span>
                <span className={'w-1/2 text-right'}>
                  <Currency
                    amount={cartTotal - Math.round((cartTotal / 100) * 7.7)}
                    className={'text-danger-default font-bold'}
                  />
                </span>
              </li>
              <li className={'flex mb-2'}>
                <span className={'w-1/2 font-medium'}>
                  <FormattedMessage id={'cart_price_shippingEst'} />
                </span>
                <span className={'w-1/2 text-right'}>
                  <Currency amount={cartTotal > 0 ? 6.99 : 0} className={'text-danger-default font-bold'} />
                </span>
              </li>
              <li className={"flex mb-2 border-b border-red-400'"}>
                <span className={'w-1/2 font-medium'}>
                  <FormattedMessage id={'cart_price_tax'} />
                </span>
                <span className={'w-1/2 text-right'}>
                  <Currency amount={Math.round((cartTotal / 100) * 7.7)} className={'text-danger-default font-bold'} />
                </span>
              </li>
              <li className={'flex mb-2'}>
                <span className={'w-1/2 font-medium'}>
                  <FormattedMessage id={'cart_price_total'} />
                </span>
                <span className={'w-1/2 text-right'}>
                  <Currency
                    amount={Math.round(cartTotal + (cartTotal > 0 ? 6.99 : 0))}
                    className={'text-danger-default font-bold'}
                  />
                </span>
              </li>
            </ul>
          </div>
          <Button
            onClick={handleCheckout}
            className={
              'text-right mb-2 mr-3 absolute right-0 bottom-0 select-none w-28 py-1 font-semibold cursor-pointer dark:text-blue-50 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition duration-200 ease-in'
            }
          >
            <FormattedMessage id={'cart_checkout'} />
          </Button>
        </>
      )}
    </div>
  )
}

export { CartView }
