import { ReactNode, useEffect, useState } from 'react'
import cx from 'classnames'

import { danger, defaultClasses, success, warning } from '@/shared/component/Alert/constant'

interface AlertProps {
  color: 'success' | 'warning' | 'danger'
  message: string | ReactNode
  // eslint-disable-next-line react/require-default-props
  seconds?: number
  className: string
}

const Alert = ({ color, message, seconds, className }: AlertProps) => {
  const [showAlert, setShowAlert] = useState(true)

  const alertStyle =
    color === 'success'
      ? success.default
      : color === 'warning'
      ? warning.default
      : color === 'danger'
      ? danger.default
      : ''

  useEffect(() => {
    if (typeof seconds !== 'undefined') {
      setTimeout(() => {
        setShowAlert(false)
      }, seconds * 1000)
    }
  }, [seconds])

  const mountStyle = { animation: 'fadeIn 250ms ease-in' }
  const unmountStyle = { animation: 'fadeOut 1000ms ease-out', animationFillMode: 'forwards' }

  return (
    <div
      className={`${cx(defaultClasses, alertStyle, className)} ${showAlert ? 'alert-shown' : 'alert-hidden'}`}
      style={showAlert ? mountStyle : unmountStyle}
      onTransitionEnd={() => setShowAlert(false)}
    >
      {message}
      <div className="absolute right-0 top-0 mr-2.5 mt-0.5 cursor-pointer" onClick={() => setShowAlert(false)}>
        x
      </div>
    </div>
  )
}
Alert.defaultProps = {
  color: 'success',
  message: ''
}
export { Alert }
