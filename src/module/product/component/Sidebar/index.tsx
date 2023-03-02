import { useEffect } from 'react'

import { useRouter } from 'next/router'

import { ExpandableList } from '@/shared/component/ExpandbaleList'
import { useFilterPrams } from '@/shared/hook/filter.hook'

import { FILTER } from '@module/product/component/Sidebar/constant'
import { PriceSlider } from '@shared/component'
import { useRouterParams } from '@shared/util'
import useLayoutStore, {
  useBrandExpanded,
  useCategoryExpanded,
  usePriceExpanded,
  useSpecsExpanded
} from '@store/layout/layout.store'
import useProductStore from '@store/product/product.store'
import cx from 'classnames'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

interface SidebarProps {
  className?: string
}

export const Sidebar = ({ className }: SidebarProps) => {
  const {
    fetchCategories,
    categories,
    fetchBrands,
    brands,
    ramList,
    fetchGroupedRam,
    storageList,
    fetchGroupedStorage
  } = useProductStore((state) => state)

  const router = useRouter()

  const { toggleBrands, toggleCategories, toggleSpecs, togglePrice } = useLayoutStore((state) => state, shallow)
  const expandedBrands = useBrandExpanded()
  const expandedCategories = useCategoryExpanded()
  const expandedSpec = useSpecsExpanded()
  const expandedPrice = usePriceExpanded()

  const { getParamValue, toggleParam, setParam, removeParam } = useRouterParams()

  const { query } = router
  const filterArgs = useFilterPrams(query)

  const handleBrandChange = (brand: { name: string }) => {
    toggleParam(FILTER.BRAND, brand.name)
  }

  const handleCategoryChange = (category: { name: string }) => {
    getParamValue(FILTER.CATEGORY) === category.name
      ? removeParam(FILTER.CATEGORY)
      : setParam(FILTER.CATEGORY, category.name)
  }

  const handleRamChange = (ram: { value: string }) => {
    toggleParam(FILTER.RAM, ram.value)
  }

  const handleStorageChange = (storage: { value: string }) => {
    toggleParam(FILTER.STORAGE, storage.value)
  }

  useEffect(() => {
    !categories && fetchCategories()
    !brands && fetchBrands()
    !ramList && fetchGroupedRam()
    !storageList && fetchGroupedStorage()
  }, [brands, categories, fetchBrands, fetchCategories, fetchGroupedRam, fetchGroupedStorage, ramList, storageList])

  return (
    <div className={cx(className, 'mr-4')}>
      <ExpandableList
        expanded={expandedPrice}
        toggleExpanded={togglePrice}
        label={<FormattedMessage id={'filter_price'} />}
        className={'mb-3'}
      >
        <PriceSlider />
      </ExpandableList>
      <ExpandableList
        label={<FormattedMessage id={'navigation_brands'} />}
        list={brands as []}
        onClick={handleBrandChange}
        expanded={expandedBrands}
        toggleExpanded={toggleBrands}
        activeList={filterArgs.brand}
        withCheckMark
      />
      <ExpandableList
        label={<FormattedMessage id={'navigation_categories'} />}
        list={categories as []}
        onClick={handleCategoryChange}
        expanded={expandedCategories}
        toggleExpanded={toggleCategories}
        activeList={filterArgs.category}
        typenameWithinIntl
      />
      <ExpandableList
        label={[
          <FormattedMessage id={'filter_specs'} key={'specs'} />,
          <FormattedMessage id={'filter_specs_ram'} key={'specs-ram'} />,
          <FormattedMessage id={'filter_specs_storage'} key={'specs-storage'} />
        ]}
        subList={[ramList as [], storageList as []]}
        onClick={[handleRamChange, handleStorageChange]}
        expanded={expandedSpec}
        toggleExpanded={toggleSpecs}
        activeList={[
          ...(filterArgs?.ram ? filterArgs?.ram : ([] as number[])),
          ...(filterArgs?.storage ? filterArgs?.storage : ([] as number[]))
        ]}
        withCheckMark
      />
    </div>
  )
}

Sidebar.defaultProps = {
  className: ''
}
