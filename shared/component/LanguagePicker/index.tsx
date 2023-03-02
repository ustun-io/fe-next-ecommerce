import React from 'react'

import { useRouter } from 'next/router'

import { Dropdown } from '@/shared/component'

import { faLanguage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import useIntlStore from '@store/intl/intl.store'
import cx from 'classnames'
import { shallow } from 'zustand/shallow'

interface LanguagePickerProps {
  className?: string
}

const LanguagePicker = ({ className }: LanguagePickerProps) => {
  const router = useRouter()
  const { pathname, asPath, query, push } = router

  const { language, set, languageList } = useIntlStore((state) => state, shallow)

  const handleLangChange = (item: { intl: string }) => {
    set(item.intl)
    push({ pathname, query }, asPath, { locale: item.intl })
  }

  return (
    <Dropdown
      className={cx('mt-1 -mr-1', className)}
      label={
        <>
          {language && language}
          <FontAwesomeIcon icon={faLanguage} width={20} height={20} className={'ml-2'} />
        </>
      }
      list={languageList}
      onClick={handleLangChange}
    />
  )
}

LanguagePicker.defaultProps = {
  className: ''
}

export { LanguagePicker }
