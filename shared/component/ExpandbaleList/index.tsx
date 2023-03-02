// TODO: find solution for ts-ignore comment
import React, { ReactNode } from 'react'

import Link from 'next/link'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faCheckCircle as faCircle, faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AnimateHeight, { Height } from 'react-animate-height'
import { FormattedMessage } from 'react-intl'

interface ListProps {
  intl?: string
  name?: string
  value?: number
  label?: string
  href?: string
  onClick?: any
  __typename?: string
}

interface ExpandableListProps {
  className?: string
  label: ReactNode | JSX.Element | string | ReactNode[] | JSX.Element[] | string[]
  list?: ListProps[]
  subList?: ListProps[][]
  onClick?: any
  expanded: any
  toggleExpanded: any
  children?: ReactNode | JSX.Element | string
  activeList?: string[] | number[]
  withCheckMark?: boolean
  typenameWithinIntl?: boolean
}

export const ExpandableList = ({
  className,
  label,
  list,
  subList,
  onClick,
  expanded,
  toggleExpanded,
  children,
  activeList,
  withCheckMark = false,
  typenameWithinIntl = false
}: ExpandableListProps) => {
  const hasValue = list?.some((listItem: object) => listItem.hasOwnProperty('value'))
  const hasName = list?.some((listItem: object) => listItem.hasOwnProperty('name'))
  const hasIntl = list?.some((listItem: object) => listItem.hasOwnProperty('intl'))
  const hasLabel = list?.some((listItem: object) => listItem.hasOwnProperty('label'))
  const hasHref = list?.some((listItem: object) => listItem.hasOwnProperty('href'))

  const sortedList = list
    ? hasValue // @ts-ignore
      ? list?.sort((a, b) => a.value - b.value)
      : hasName // @ts-ignore
      ? list?.sort((a, b) => a.name - b.name)
      : list
    : undefined // @ts-ignore

  const sortedSublist = subList ? subList?.map((list) => list?.sort((a, b) => a.value - b.value)) : undefined

  return (
    <div
      className={`${className} mb-4 border-b-2 py-0.5 ${
        expanded === 'auto' ? 'border-b-cool-gray-500' : 'border-b-cool-gray-700'
      }`}
    >
      <div className={'list-label relative'} onClick={toggleExpanded}>
        <span className={'hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in'}>
          {!Array.isArray(label) ? label : label[0]}
        </span>
        <FontAwesomeIcon
          icon={expanded === 'auto' ? faMinusCircle : faPlusCircle}
          className={
            'absolute right-0 -mr-2 text-cool-gray-200 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-lg cursor-pointer select-none'
          }
        />
      </div>
      <AnimateHeight duration={250} height={expanded as Height} delay={50} animateOpacity={true}>
        {!children
          ? list && sortedList
            ? sortedList?.map((item, i) => (
                <div
                  key={hasIntl ? item.intl : hasName ? item.name : hasLabel ? item.label : item.value}
                  className={`${i === 0 && 'rounded-t-md'} ${i + 1 === list.length && 'rounded-b-md'}`}
                >
                  {hasHref ? (
                    <Link href={item.href as string}>
                      <p
                        className={`text-sm py-2.5 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer`}
                      >
                        {' '}
                        {item.intl ? (
                          typenameWithinIntl ? (
                            <FormattedMessage id={`${item.__typename}_${item.name}`} />
                          ) : (
                            <FormattedMessage id={item.intl} />
                          )
                        ) : (
                          <span>{item.label && item.label}</span>
                        )}
                      </p>
                      <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-600'} />
                    </Link>
                  ) : (
                    <p
                      className={`text-sm py-2.5 capitalize text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer flex justify-between items-center`}
                      onClick={() => {
                        item.onClick ? item.onClick(item) : onClick(item)
                      }}
                    >
                      {typenameWithinIntl ? (
                        <FormattedMessage id={`${item.__typename}_${item.name}`} />
                      ) : item.intl ? (
                        <FormattedMessage id={item.intl} />
                      ) : item.name ? (
                        item.name
                      ) : (
                        item.label
                      )}
                      {/*@ts-ignore*/}
                      {activeList && activeList.includes(hasValue ? item.value : hasName ? item.name : item) && (
                        <FontAwesomeIcon icon={faCircle} width={20} height={20} className={'ml-2 text-success-200'} />
                      )}
                      {activeList &&
                        withCheckMark &&
                        // @ts-ignore
                        !activeList.includes(hasValue ? item.value : hasName ? item.name : item) && (
                          <FontAwesomeIcon
                            icon={faCheckCircle as IconProp}
                            width={20}
                            height={20}
                            className={'ml-2 text-cool-gray-500'}
                          />
                        )}
                      {!activeList && withCheckMark && (
                        <FontAwesomeIcon
                          icon={faCheckCircle as IconProp}
                          width={20}
                          height={20}
                          className={'ml-2 text-cool-gray-500'}
                        />
                      )}
                    </p>
                  )}
                  {i + 1 < list.length && <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-700'} />}
                </div>
              ))
            : subList &&
              sortedSublist &&
              sortedSublist?.map((subList, subListIndex) => (
                <div key={`subList-${subListIndex}`} className={'mb-5'}>
                  <span
                    className={'sublist-label hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in'}
                  >
                    {Array.isArray(label) && label[subListIndex + 1]}
                  </span>
                  {subList?.map((item, i) => (
                    <div
                      key={item.intl ? item.intl : item.name ? item.name : hasLabel ? item.label : item.value}
                      className={`${i === 0 && 'rounded-t-md'} ${i + 1 === subList.length && 'rounded-b-md'}`}
                    >
                      {item.href ? (
                        <Link href={item.href as string}>
                          <p
                            className={`text-sm py-2.5 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer`}
                          >
                            {' '}
                            {item.intl ? <FormattedMessage id={item.intl} /> : <span>{item.label && item.label}</span>}
                          </p>
                          <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-600'} />
                        </Link>
                      ) : (
                        <p
                          className={`text-sm py-2.5 capitalize text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer flex justify-between items-center`}
                          onClick={() => onClick[subListIndex](item)}
                        >
                          {item.intl ? <FormattedMessage id={item.intl} /> : item.name ? item.name : item.label}
                          {activeList &&
                            // @ts-ignore
                            activeList.includes(item.value ? item.value : item.name ? item.name : item) && (
                              <FontAwesomeIcon
                                icon={faCircle}
                                width={20}
                                height={20}
                                className={'ml-2 text-success-200'}
                              />
                            )}
                          {activeList &&
                            withCheckMark &&
                            // @ts-ignore
                            !activeList.includes(item.value ? item.value : item.name ? item.name : item) && (
                              <FontAwesomeIcon
                                icon={faCheckCircle as IconProp}
                                width={20}
                                height={20}
                                className={'ml-2 text-cool-gray-500'}
                              />
                            )}
                          {!activeList && withCheckMark && (
                            <FontAwesomeIcon
                              icon={faCheckCircle as IconProp}
                              width={20}
                              height={20}
                              className={'ml-2 text-cool-gray-500'}
                            />
                          )}
                        </p>
                      )}
                      {i + 1 < subList.length && (
                        <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-700'} />
                      )}
                    </div>
                  ))}
                </div>
              ))
          : children}
      </AnimateHeight>
    </div>
  )
}

ExpandableList.defaultProps = {
  className: '',
  onClick: () => {}
}
