import { MouseEventHandler } from 'react'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cx from 'classnames'

import { danger, defaultClasses, primary, secondary, success, warning } from '@/shared/component/Icon/cosntant'

interface IconProps {
  icon: IconProp
  color: 'primary' | 'success' | 'warning' | 'danger' | 'secondary'
  width: number
  height: number
  onClick: MouseEventHandler<SVGSVGElement>
  className: string
}

const Icon = ({ color, icon, width, onClick, height, className }: IconProps) => {
  const iconStyle =
    color === 'primary'
      ? primary.default
      : color === 'success'
      ? success.default
      : color === 'warning'
      ? warning.default
      : color === 'secondary'
      ? secondary.default
      : color === 'danger'
      ? danger.default
      : ''

  return (
    <FontAwesomeIcon
      icon={icon}
      width={width}
      height={height}
      className={`${cx(defaultClasses, iconStyle)} ${className}`}
      onClick={onClick}
    />
  )
}

Icon.defaultProps = {
  icon: false,
  width: 24,
  height: 24,
  onClick: () => {},
  className: '',
  color: ''
}

export { Icon }
