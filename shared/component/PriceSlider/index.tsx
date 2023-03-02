import React, { useCallback, useEffect, useState } from 'react'

import { Button } from '@/shared/component'

import { FILTER } from '@module/product/component/Sidebar/constant'
import Slider from '@mui/material/Slider'
import { useRouterParams } from '@shared/util'
import useProductStore from '@store/product/product.store'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

const PriceSlider = () => {
  const { setParam, getParamValue } = useRouterParams()
  const priceLowQuery = Number(getParamValue(FILTER.PRICE_MIN))
  const priceHighQuery = Number(getParamValue(FILTER.PRICE_MAX))

  const { fetchPricesForFilter, lowestPrice, highestPrice } = useProductStore((state) => state, shallow)

  const [sliderRange, setSliderRange] = useState([
    priceLowQuery ? priceLowQuery : Number(lowestPrice),
    priceHighQuery ? priceHighQuery : Number(highestPrice)
  ])

  useEffect(() => {
    !lowestPrice && !highestPrice && fetchPricesForFilter()
  }, [lowestPrice, highestPrice, fetchPricesForFilter])

  const formatSliderValue = (value: number) => `${value}.-`

  const onPriceChange = (event: Event, newRange: number | number[]) => setSliderRange(newRange as number[])

  const onApply = useCallback(() => {
    let min = sliderRange[0] as number
    let max = sliderRange[1] as number

    if (min > max) {
      let tempMax = max
      max = min
      min = tempMax
    }

    min !== priceLowQuery && setParam(FILTER.PRICE_MIN, min)
    max !== priceHighQuery && setParam(FILTER.PRICE_MAX, max)
  }, [priceHighQuery, priceLowQuery, setParam, sliderRange])

  const onReset = useCallback(() => {
    lowestPrice !== priceLowQuery && setParam(FILTER.PRICE_MIN, lowestPrice)
    highestPrice !== priceHighQuery && setParam(FILTER.PRICE_MAX, highestPrice)
  }, [highestPrice, lowestPrice, priceHighQuery, priceLowQuery, setParam])

  return (
    <div className={'flex flex-col px-3'}>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={sliderRange}
        onChange={onPriceChange}
        valueLabelDisplay="auto"
        getAriaValueText={formatSliderValue}
        min={lowestPrice}
        max={highestPrice}
        valueLabelFormat={formatSliderValue}
      />
      <div className={'flex justify-between my-2 font-light dark:text-cool-gray-200 text-sm'}>
        <span className={'-mt-2 -ml-2'}>{formatSliderValue(lowestPrice as number)}</span>
        <span className={'-mt-2 -mr-2'}>{formatSliderValue(highestPrice as number)}</span>
      </div>
      <div className={'flex justify-between items-end mb-2'}>
        <span
          className={'text-sm font-light mr-2 dark:text-blue-gray-100 dark:hover:underline cursor-pointer'}
          onClick={onReset}
        >
          <FormattedMessage id={'filter_priceReset'} />
        </span>
        <Button className={'self-end min-w-[4rem]'} onClick={onApply}>
          <FormattedMessage id={'filter_priceApply'} />
        </Button>
      </div>
    </div>
  )
}

export { PriceSlider }
