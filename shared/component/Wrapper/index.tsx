import { ReactNode } from 'react'

interface WrapperProps {
  title: string | JSX.Element | ReactNode
  description: string | JSX.Element | ReactNode
}

const Wrapper = ({ title, description }: WrapperProps) => (
  <div className={'mt-10 space-y-4 py-4 px-1 sm:px-2 md:px-4 xl:px-5 bg-secondary-500 dark:bg-blue-900 rounded-lg'}>
    <h2 className={'dark:text-blue-50 text-blue-400'}>{title}</h2>
    <p className={'dark:text-blue-100 text-blue-400'}>{description}</p>
  </div>
)

Wrapper.defaultProps = {}

export { Wrapper }
