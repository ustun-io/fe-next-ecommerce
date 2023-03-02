import { MouseEventHandler, useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import cx from 'classnames'
import { FormattedMessage } from 'react-intl'

interface NavLinkProps {
  href: string
  intl: string
  liClassName: string
  linkClassName: string
  onClick: MouseEventHandler<HTMLAnchorElement>
  hamburgerMenu: boolean
}

const NavLink = ({ href, intl, liClassName, linkClassName, onClick, hamburgerMenu }: NavLinkProps) => {
  const router = useRouter()

  const classes = cx(liClassName, {
    'nav-item': !hamburgerMenu,
    'nav-item active': !hamburgerMenu && router.pathname === href,
    'hamburger-item': hamburgerMenu,
    'hamburger-item active': hamburgerMenu && router.pathname === href
  })

  return (
    <Link href={useMemo(() => href, [href])} onClick={onClick} className={linkClassName}>
      <li className={classes}>
        <FormattedMessage id={intl} />
      </li>
    </Link>
  )
}

NavLink.defaultProps = {
  href: '#',
  label: '',
  liClassName: '',
  linkClassName: '',
  onClick: () => {},
  hamburgerMenu: false
}

export { NavLink }
