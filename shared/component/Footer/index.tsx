import Link from 'next/link'

import { Icon } from '@/shared/component'

import { faSquareFacebook, faSquareInstagram, faSquareTwitter } from '@fortawesome/free-brands-svg-icons'
import { FormattedMessage } from 'react-intl'

const Footer = () => {
  let date = new Date()

  return (
    <div className="flex flex-col w-full bg-secondary-200 dark:bg-blue-gray-900 shadow py-12 md:py-4 font-inter text-blue-900 dark:text-secondary-200 border-t border-t-2 border-cool-gray-600">
      {/* lg:px-10 md:px-6 px-4 py-5 */}
      <div className={'py-8 md:py-10 flex items-center w-full justify-center'}>
        <Link href={'/'}>
          <div className={'footer-logo mx-auto'}></div>
        </Link>
      </div>

      <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-600'}></div>

      <ul className="flex flex-wrap items-center justify-center gap-5 md:gap-10 py-8 md:py-8">
        <Link href={'/'}>
          <li className={'nav-item-container uppercase'}>
            <FormattedMessage id={'footer_home'} />
            {/*px-3 py-2 text-secondary-800 dark:text-secondary-400 hover:bg-secondary-default opacity-90 hover:text-secondary-900 tracking-wide cursor-pointer font-medium transition ease-in-out duration-300*/}
          </li>
        </Link>
        <Link href={'/about'}>
          <li className={'nav-item-container uppercase'}>
            <FormattedMessage id={'footer_about'} />
            {/*px-3 py-2 text-secondary-800 dark:text-secondary-400 hover:bg-secondary-default opacity-90 hover:text-secondary-900 tracking-wide cursor-pointer font-medium transition ease-in-out duration-300*/}
          </li>
        </Link>
        <Link href={'/careers'}>
          <li className={'nav-item-container uppercase'}>
            <FormattedMessage id={'footer_career'} />
            {/*px-3 py-2 text-secondary-800 dark:text-secondary-400 hover:bg-secondary-default opacity-90 hover:text-secondary-900 tracking-wide cursor-pointer font-medium transition ease-in-out duration-300*/}
          </li>
        </Link>
        <Link href={'/support'}>
          <li className={'nav-item-container uppercase'}>
            <FormattedMessage id={'footer_support'} />
            {/*px-3 py-2 text-secondary-800 dark:text-secondary-400 hover:bg-secondary-default opacity-90 hover:text-secondary-900 tracking-wide cursor-pointer font-medium transition ease-in-out duration-300*/}
          </li>
        </Link>
        <Link href={'/contact'}>
          <li className={'nav-item-container uppercase'}>
            <FormattedMessage id={'footer_contact'} />
            {/*px-3 py-2 text-secondary-800 dark:text-secondary-400 hover:bg-secondary-default opacity-90 hover:text-secondary-900 tracking-wide cursor-pointer font-medium transition ease-in-out duration-300*/}
          </li>
        </Link>
      </ul>

      <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-600'}></div>

      <div className="flex flex-wrap items-center justify-center gap-4 py-7 md:py-6">
        <Icon className={'text-4xl'} color={'primary'} icon={faSquareFacebook} width={48} />
        <Icon className={'text-4xl'} color={'primary'} icon={faSquareInstagram} width={48} />
        <Icon className={'text-4xl'} color={'primary'} icon={faSquareTwitter} width={48} />
      </div>

      <div className={'h-[1px] w-full bg-secondary-300 dark:bg-cool-gray-600'}></div>

      <div className="flex items-center md:flex-nowrap flex-wrap justify-center gap-3 py-5 md:py-5">
        <p className="text-secondary-800 dark:text-secondary-default text-sm">
          &copy; {date.getFullYear()} <FormattedMessage id={'footer_copyright'} />
        </p>
        <p className="text-secondary-800 dark:text-secondary-default text-sm cursor-pointer select-none">
          <FormattedMessage id={'footer_termsAndConditions'} />
        </p>
        <p className="text-secondary-800 dark:text-secondary-default text-sm cursor-pointer select-none">
          <FormattedMessage id={'footer_blogs'} />
        </p>
        <p className="text-secondary-800 dark:text-secondary-default text-sm cursor-pointer select-none">
          <FormattedMessage id={'footer_customerService'} />
        </p>
      </div>
    </div>
  )
}

export { Footer }
