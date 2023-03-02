import { ReactNode } from 'react'

import Link from 'next/link'

import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@/shared/constant'

import { FormattedMessage } from 'react-intl'

interface IContinueBrowsing {
  onExit: any
  message: string | ReactNode
  mode?: 'cart' | 'wishlist'
}

export const ContinueBrowsing = ({ onExit, message, mode = 'cart' }: IContinueBrowsing) => (
  <div className={'flex flex-col space-y-3'}>
    <span>{message}</span>
    <Link href={`/products?page=${DEFAULT_PAGE}&limit=${DEFAULT_PAGE_LIMIT}`} onClick={onExit}>
      <FormattedMessage
        id={mode === 'cart' ? 'cart_empty_continueBrowsing' : 'wishlist_empty_continueBrowsing'}
        values={{
          b: (chunks) => <p className={'font-bold underline inline'}>{chunks}</p>
        }}
      />
      .
    </Link>
  </div>
)
