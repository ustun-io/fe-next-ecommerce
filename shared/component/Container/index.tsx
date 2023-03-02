import { ReactNode } from 'react'

import cx from 'classnames'

interface IContainerProps {
  children: ReactNode | undefined
  className?: string | undefined
}

const Container = ({ children, className }: IContainerProps) => {
  return (
    <div className={'w-full py-3 px-1 sm:px-2 dark:bg-[#191c2e] shadow'}>
      <div className={cx('md:w-11/12 3xl:w-5/6 mx-auto min-h-[47rem]', className)}>{children}</div>
    </div>
  )
}

Container.defaultProps = {
  className: ''
}

export { Container }
