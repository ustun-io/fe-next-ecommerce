import { ReactNode } from 'react'

import { danger, defaultClasses, primary, secondary, success, warning } from '@/shared/component/Button/constant'

import cx from 'classnames'

interface ButtonProps {
  color: 'primary' | 'success' | 'secondary' | 'warning' | 'danger'
  style: 'fill' | 'outline'
  className?: string
  children: ReactNode
  onClick?: any
  disabled?: boolean
  form?: boolean
  loading?: boolean
}

const Button = ({ color, style, className, children, onClick, disabled, form, loading }: ButtonProps) => {
  const buttonStyle =
    style === 'fill'
      ? color === 'primary'
        ? primary.default
        : color === 'success'
        ? success.default
        : color === 'warning'
        ? warning.default
        : color === 'danger'
        ? danger.default
        : color === 'secondary'
        ? secondary.default
        : ''
      : style === 'outline'
      ? color === 'primary'
        ? primary.alternative
        : color === 'success'
        ? success.alternative
        : color === 'warning'
        ? warning.alternative
        : color === 'danger'
        ? danger.alternative
        : color === 'secondary'
        ? secondary.alternative
        : ''
      : ''

  return !form ? (
    <div className={`${cx(defaultClasses, className, buttonStyle)}`} onClick={onClick}>
      {loading && <LoaderIcon />}
      {children && children}
    </div>
  ) : (
    <button disabled={disabled} className={`${cx(defaultClasses, className, buttonStyle)}`} type={'submit'}>
      {loading && <LoaderIcon />}
      {children && children}
    </button>
  )
}

Button.defaultProps = {
  color: 'primary',
  style: 'fill',
  className: '',
  children: <></>,
  onClick: () => {},
  disabled: false,
  form: false,
  loading: false
}

const LoaderIcon = () => (
  <div role="status">
    <svg
      aria-hidden="true"
      className="mr-2 w-4 h-4 text-blue-gray-200 animate-spin dark:text-blue-gray-600 fill-secondary-dark"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  </div>
)

export { Button }
