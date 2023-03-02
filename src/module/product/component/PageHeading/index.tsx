import React, { useEffect } from 'react'

import { useRouter } from 'next/router'

import { OffsetPicker } from '@/shared/component/Pagination/OffsetPicker'
import { SortPicker } from '@/shared/component/Pagination/Sort'
import { DEFAULT_PAGE_LIMIT } from '@/shared/constant'
import { useFilterPrams } from '@/shared/hook/filter.hook'

import { FILTER } from '@module/product/component/Sidebar/constant'
import { Chip } from '@shared/component'
import { useRouterParams } from '@shared/util'
import useProductStore from '@store/product/product.store'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

interface PageHeadingProps {
  count: number
}

export const PageHeading = ({ count }: PageHeadingProps) => {
  const router = useRouter()

  const {
    pathname,
    query: { page, limit, q },
    query
  } = router

  const pageRecordCount =
    parseInt(limit as string) <= count
      ? parseInt(limit as string) || DEFAULT_PAGE_LIMIT * parseInt(page as string)
      : count

  const filterArgs = useFilterPrams(query)
  const { removeParam } = useRouterParams()

  const removeBrandFilter = (value: string) => {
    removeParam(FILTER.BRAND, value)
  }

  const removeCategoryFilter = (value: string) => {
    removeParam(FILTER.CATEGORY, value)
  }

  const removeRamFilter = (value: string) => {
    removeParam(FILTER.RAM, value)
  }

  const removeStorageFilter = (value: string) => {
    removeParam(FILTER.STORAGE, value)
  }

  const removePriceMinFilter = (value: string) => {
    removeParam(FILTER.PRICE_MIN, value)
  }

  const removePriceMaxFilter = (value: string) => {
    removeParam(FILTER.PRICE_MAX, value)
  }

  const navigationTree =
    pathname && pathname === '/products'
      ? ['navigation_home', 'navigation_products']
      : pathname === '/products/brands/[brand]'
      ? ['navigation_home', 'navigation_products', 'navigation_brands']
      : pathname === '/products/categories/[category]'
      ? ['navigation_home', 'navigation_products', 'navigation_categories']
      : ['navigation_home']

  const { fetchPricesForFilter, lowestPrice, highestPrice } = useProductStore((state) => state, shallow)

  useEffect(() => {
    !lowestPrice && !highestPrice && fetchPricesForFilter()
  }, [lowestPrice, highestPrice, fetchPricesForFilter])

  return (
    <div className={'mb-1 col-span-full'}>
      <div className="flex flex-col items-start space-y-4 justify-between mt-2">
        <p className="text-xs md:text-sm text-gray-600 cursor-default">
          {navigationTree.map((item, index) => (
            <span key={item}>
              <span className={index + 1 === navigationTree.length ? 'font-medium' : ''}>
                <FormattedMessage id={item} />{' '}
              </span>
              {index + 1 !== navigationTree.length && <span>/ </span>}
            </span>
          ))}
        </p>
        <p className="text-2xl capitalize md:text-3xl lg:text-4xl font-semibold tracking-wide text-cool-gray-100">
          <FormattedMessage id={'navigation_products'} />
        </p>
      </div>
      <div className={'flex flex-col md:flex-row mt-3 mb-1 justify-between'}>
        <div className={'w-2/5'}>
          {pathname === '/products/search' && (
            <p className={'w-full text-sm font-inter text-blue-gray-200 order-2'}>
              <FormattedMessage id={'data_showingOfSearch'} values={{ pageRecordCount, count, q }} />
            </p>
          )}
          {pathname === '/products' && (
            <p className={'w-full text-sm font-inter text-blue-gray-200 order-2 md:order-1'}>
              <FormattedMessage id={'data_showingOf'} values={{ pageRecordCount, count }} />
            </p>
          )}
        </div>
        <div
          className={'w-full flex flex-col md:flex-row space-y-2 justify-end md:space-y-0 space-x-3 order-1 md:order-3'}
        >
          <SortPicker />
          <OffsetPicker className={'self-start'} />
        </div>
      </div>
      {filterArgs && (
        <div className={'flex flex-wrap items-center space-x-2 space-y-1 w-full mb-4 mt-2'}>
          {filterArgs.brand &&
            Array.isArray(filterArgs.brand) &&
            filterArgs.brand.map((brandItem: string) => (
              <Chip key={brandItem} label={brandItem} value={brandItem} onClick={removeBrandFilter} />
            ))}
          {filterArgs.category &&
            Array.isArray(filterArgs.category) &&
            filterArgs.category.map((categoryItem: string) => (
              <Chip key={categoryItem} label={categoryItem} value={categoryItem} onClick={removeCategoryFilter} />
            ))}
          {filterArgs.ram &&
            Array.isArray(filterArgs.ram) &&
            filterArgs.ram.map((ramItem: number) => (
              <Chip
                key={ramItem}
                label={<FormattedMessage id={'filter_tagsRam'} values={{ amount: ramItem }} />}
                value={ramItem}
                onClick={removeRamFilter}
              />
            ))}
          {filterArgs.storage &&
            Array.isArray(filterArgs.storage) &&
            filterArgs.storage.map((storageItem: number) => (
              <Chip
                key={storageItem}
                label={<FormattedMessage id={'filter_tagsStorage'} values={{ amount: storageItem }} />}
                value={storageItem}
                onClick={removeStorageFilter}
              />
            ))}
          {filterArgs.priceMin && filterArgs.priceMin !== (lowestPrice as number) && (
            <Chip
              key={filterArgs.priceMin}
              label={<FormattedMessage id={'filter_tagsMinPrice'} values={{ amount: filterArgs.priceMin }} />}
              value={filterArgs.priceMin}
              onClick={removePriceMinFilter}
            />
          )}
          {filterArgs.priceMax && filterArgs.priceMax !== (highestPrice as number) && (
            <Chip
              key={filterArgs.priceMax}
              label={<FormattedMessage id={'filter_tagsMaxPrice'} values={{ amount: filterArgs.priceMax }} />}
              value={filterArgs.priceMax}
              onClick={removePriceMaxFilter}
            />
          )}
        </div>
      )}
    </div>
  )
}
