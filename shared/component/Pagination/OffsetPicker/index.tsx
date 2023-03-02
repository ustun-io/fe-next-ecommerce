import React from 'react'

import { useRouter } from 'next/router'

import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dropdown } from '@shared/component'
import { useOffsetOptions } from '@store/pagination/pagination.store'
import { FormattedMessage } from 'react-intl'

interface OffsetPickerArgs {
  className?: string
}

export const OffsetPicker = ({ className }: OffsetPickerArgs) => {
  const offsetList = useOffsetOptions()

  const router = useRouter()
  const { replace, query, pathname } = router

  const handleOffset = (offset: number) => {
    query.limit = String(offset)

    replace({
      pathname,
      query
    })
  }

  return (
    <Dropdown
      className={className}
      label={
        <>
          <FormattedMessage id={'data_recordsPerPage'} values={{ offset: router.query.limit }} />
          <FontAwesomeIcon icon={faCaretDown} width={20} height={20} className={'ml-0.5'} />
        </>
      }
      list={offsetList}
      onClick={handleOffset}
    />
  )
}

OffsetPicker.defaultProps = {
  className: ''
}
