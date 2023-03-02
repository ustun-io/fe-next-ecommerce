import React, { ReactNode, useState } from 'react'

import Link from 'next/link'

import { FormattedMessage } from 'react-intl'

interface DropdownProps {
  className?: string
  label: ReactNode | JSX.Element
  list: any[]
  onClick: any
  dropDownOnClick?: any
}

export const Dropdown = ({ className, label, list, onClick, dropDownOnClick }: DropdownProps) => {
  const [dropdown, setDropdown] = useState(false)

  return (
    <div className={`${className} relative block`}>
      <div
        onClick={() => {
          dropDownOnClick ? dropDownOnClick() : setDropdown(!dropdown)
        }}
        className={'dropdown-button'}
      >
        {label}
      </div>
      <div
        className={`z-10 bg-secondary-500 dark:bg-blue-gray-700 shadow dark:shadow-lg rounded absolute right-0 mt-2 transform-gpu transition duration-200 ease-in-out ${
          dropdown ? 'translate-x-0 opacity-100' : '-translate-x-[5rem] opacity-0 -z-10'
        }`}
      >
        {list &&
          list.map((item, i) => (
            <div
              key={item.intl ? item.intl : item}
              className={`hover:bg-secondary-400 dark:hover:bg-blue-gray-800 ${i === 0 && 'rounded-t-md'} ${
                i + 1 === list.length && 'rounded-b-md'
              }`}
            >
              {item.href ? (
                <Link href={item.href as string}>
                  <p
                    className={`text-sm px-3 py-2 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer`}
                  >
                    <FormattedMessage id={item.intl} />
                  </p>
                  <div className={'h-0.5 w-full bg-secondary-300 dark:bg-primary-600'} />
                </Link>
              ) : (
                <p
                  className={`text-sm px-3 py-2 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer`}
                  onClick={() => {
                    setDropdown(false)
                    item.onClick ? item.onClick(item) : onClick(item)
                  }}
                >
                  {item.intl ? <FormattedMessage id={item.intl} /> : <>{item}</>}
                </p>
              )}
              {i + 1 !== list.length && <div className={'h-0.5 w-full dark:bg-blue-gray-600'} />}
            </div>
          ))}
      </div>
    </div>
  )
}

Dropdown.defaultProps = {
  className: ''
}
