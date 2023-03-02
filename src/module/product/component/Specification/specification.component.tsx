import { IProduct } from '@/shared/interface/product.interface'

import { FormattedMessage } from 'react-intl'

export const SpecList = ({ product }: IProduct) => (
  <ul className={'inline-flex flex-col w-full list-none'}>
    <li className={'flex mb-2 border-b border-blue-400 dark:border-blue-700 pb-1 text-blue-400 dark:text-blue-100'}>
      <span className={'w-1/2 font-medium'}>
        <FormattedMessage id={'product_displaySize'} />
      </span>
      <span className={'w-1/2'}>{product.screen}</span>
    </li>
    <li className={'flex mb-2 border-b border-blue-400 dark:border-blue-700 pb-1 text-blue-400 dark:text-blue-100'}>
      <span className={'w-1/2 font-medium'}>
        <FormattedMessage id={'product_cpu'} />
      </span>
      <span className={'w-1/2'}>{product.cpu}</span>
    </li>
    <li className={'flex mb-2 border-b border-blue-400 dark:border-blue-700 pb-1 text-blue-400 dark:text-blue-100'}>
      <span className={'w-1/2 font-medium'}>
        <FormattedMessage id={'product_ram'} />
      </span>
      <span className={'w-1/2'}>{product.ram} GB</span>
    </li>
    <li className={'flex mb-2 border-b border-blue-400 dark:border-blue-700 pb-1 text-blue-400 dark:text-blue-100'}>
      <span className={'w-1/2 font-medium'}>
        <FormattedMessage id={'product_storage'} />
      </span>
      <span className={'w-1/2'}>{product.storage} GB</span>
    </li>
  </ul>
)
