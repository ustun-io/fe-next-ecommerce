import { CURRENCY_CODE } from '@/shared/component/Currency/constant'

import { decimalCount, isFloat } from '@shared/util'
import cx from 'classnames'

interface ICurrency {
  amount: number
  className?: string
}

const Currency = ({ amount, className }: ICurrency) => (
  <div className={cx(className)}>
    {!isFloat(amount)
      ? `${CURRENCY_CODE} ${amount}.-`
      : decimalCount(amount) === 1
      ? `${CURRENCY_CODE} ${amount}0`
      : `${CURRENCY_CODE} ${amount}`}
  </div>
)

Currency.defaultProps = {
  className: ''
}

export { Currency }
