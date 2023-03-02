import React, { useCallback, useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from '@shared/component'
import usePaginationStore from '@store/pagination/pagination.store'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

interface SortPickerArgs {
  className?: string
}

export const SortPicker = ({ className }: SortPickerArgs) => {
  const { sort, setSort, currentSort } = usePaginationStore((state) => state, shallow)
  let list: any[] = useMemo(() => [], [])

  const router = useRouter()
  const { replace, query, pathname } = router

  const handleOffset = useCallback(
    (sort: { intl: string }) => {
      query.sort = String(`${sort.intl.split('_')[0]},${sort.intl.split('_')[1]}`)
      setSort(sort.intl)
      replace({
        pathname,
        query
      })
    },
    [pathname, query, replace, setSort]
  )

  const setCurrentSort = useCallback(
    (sort: string) => {
      let formattedSort = `${sort.split(',')[0]}_${sort.split(',')[1]}`
      setSort(formattedSort)
    },
    [setSort]
  )

  useEffect(() => {
    list.length < 1 &&
      sort?.sortBy?.map((sortItem: any) => {
        list.push({ intl: `${sort?.methods[0]}_${sortItem}` })
        list.push({ intl: `${sort?.methods[1]}_${sortItem}` })
      })
    !currentSort && setCurrentSort(query.sort as string)
  }, [currentSort, list, query.sort, setCurrentSort, sort])

  return (
    <Dropdown
      className={className}
      label={
        <div className={'max-w-[30rem]'}>
          <FormattedMessage id={currentSort} />
          <FontAwesomeIcon icon={faCaretDown} width={20} height={20} className={'ml-0.5'} />
        </div>
      }
      list={list && list}
      onClick={handleOffset}
    />
  )
}

SortPicker.defaultProps = {
  className: ''
}
