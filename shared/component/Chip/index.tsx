import React, { ReactNode } from 'react'

import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

interface ChipProps {
  className?: string
  label: ReactNode | JSX.Element | string
  onClick?: any
  value?: string | number
}

export const Chip = ({ className, label, onClick, value }: ChipProps) => {
  return (
    <div className={cx('inline capitalize text-cool-gray-200 bg-blue-gray-500 py-1 px-2.5', className)}>
      <span className={'text-start select-none'}>{label}</span>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className={
          'ml-3 cursor-pointer active:text-cool-gray-400 hover:text-cool-gray-300 transition ease-in duration-200'
        }
        onClick={() => {
          onClick(value)
        }}
      />
    </div>
  )
}

Chip.defaultProps = {
  className: '',
  onClick: () => {}
}
