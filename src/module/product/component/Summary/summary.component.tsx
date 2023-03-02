import { IProduct } from '@/shared/interface/product.interface'

import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import { Button, Currency, Icon, ImageGallery } from '@shared/component'
import useCartStore from '@store/cart/cart.store'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

export const Summary = ({ product }: IProduct) => {
  const { addToCart } = useCartStore((state) => state, shallow)

  return (
    <div className={'flex w-full pt-2 px-4 relative bg-secondary-500 dark:bg-blue-900 min-h-[23rem] rounded-lg'}>
      <div className={'w-6/12 h-auto'}>
        <ImageGallery images={product.image} />
      </div>
      <div className={'w-6/12 px-4 mt-0.5'}>
        <h3 className={'font-medium text-blue-400 dark:text-blue-50'}>{product.name}</h3>
        <ul className={'inline-flex flex-col w-full list-none mt-3 text-blue-300 dark:text-blue-200'}>
          <li className={'flex mb-2'}>
            <span className={'w-1/2 font-medium'}>
              <FormattedMessage id={'product_displaySize'} />
            </span>
            <span className={'w-1/2'}>{product.screen}</span>
          </li>
          <li className={'flex mb-2'}>
            <span className={'w-1/2 font-medium'}>
              <FormattedMessage id={'product_cpu'} />
            </span>
            <span className={'w-1/2'}>{product.cpu}</span>
          </li>
          <li className={'flex mb-2'}>
            <span className={'w-1/2 font-medium'}>
              <FormattedMessage id={'product_ram'} />
            </span>
            <span className={'w-1/2'}>{product.ram} GB</span>
          </li>
          <li className={'flex mb-2'}>
            <span className={'w-1/2 font-medium'}>
              <FormattedMessage id={'product_storage'} />
            </span>
            <span className={'w-1/2'}>{product.storage} GB</span>
          </li>
        </ul>
        <Button
          className={'mt-2 py-2 text-secondary-400'}
          onClick={(e: Event) => {
            e.preventDefault()
            addToCart(product)
          }}
        >
          <Icon className={'mr-2'} color={'secondary'} icon={faCartPlus} />
          <FormattedMessage id={'product_addToCart'} />
        </Button>
        <Currency
          className={'text-2xl text-danger-400 dark:text-danger-500 font-bold absolute bottom-0 mb-2'}
          amount={product.price}
        />
      </div>
    </div>
  )
}
