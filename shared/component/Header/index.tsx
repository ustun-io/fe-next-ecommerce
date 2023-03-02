import React, { useCallback, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { ACCOUNT_OPTIONS } from '@/shared/component/Header/account-dropdown-options.constant'
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@/shared/constant'

import { faBars, faBookmark, faShoppingBag, faUser, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { CartView } from '@module/cart/view/cart.view'
import { FILTER } from '@module/product/component/Sidebar/constant'
import { WishlistView } from '@module/wishlist/view/wishlist.view'
import { Icon, LanguagePicker, NavLink, ProductSearch } from '@shared/component'
import { navigateTo, useRouterParams } from '@shared/util'
import useAuthStore, { useAuthenticated } from '@store/auth/auth.store'
import useCartStore, { useCartItems, useWishlistItems } from '@store/cart/cart.store'
import { DEFAULT_SORT } from '@store/pagination/pagination.constant'
import useProductStore from '@store/product/product.store'
import { FormattedMessage } from 'react-intl'
import { shallow } from 'zustand/shallow'

export const Header = () => {
  const signOut = useAuthStore((state) => state.signOut, shallow)
  const { categories, fetchCategories } = useProductStore((state) => state, shallow)
  const isAuthenticated = useAuthenticated()

  const router = useRouter()
  const [isDropdownSelected, setDropdown] = useState(false)
  const [isCategorySelected, setCategoryDropdown] = useState(false)
  const [hamburgerMenu, setHamburgerMenu] = useState(false)

  const navigateToCallback = useCallback(
    (url: string) => {
      navigateTo(router, url)
    },
    [router]
  )

  const { addParam } = useRouterParams()

  const handleCategory = (categoryName: string) => {
    addParam(FILTER.CATEGORY, categoryName)
    setCategoryDropdown(!isCategorySelected)
  }

  const escFunction = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      setDropdown(false)
    }
  }, [])

  useEffect(() => {
    !categories && fetchCategories()
    document.addEventListener('keydown', escFunction, false)

    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [isDropdownSelected, escFunction, categories, fetchCategories])

  const { toggleCart, toggleWishlist } = useCartStore((store) => store, shallow)
  const cartItemsN = useCartItems()
  const wishlistItemsN = useWishlistItems()

  return (
    <div
      className={
        'py-5 bg-secondary-300 border-b-secondary-500 border-b shadow dark:bg-blue-gray-900 dark:border-b-blue-gray-700 dark:border-b-2'
      }
      id={'header-container'}
    >
      <div className={'md:w-5/6 3xl:w-4/6 mx-auto mx-auto flex items-center justify-between py-2 px-4 md:px-0 md:py-4'}>
        <div className={'flex items-center'}>
          <div className={'flex justify-start relative'}>
            <Link href={'/'}>
              <div className={'footer-logo block hidden'}></div>
              <div className={'header-logo block'}></div>
            </Link>
          </div>

          <nav className={'hidden md:block w-2/5 flex items-center justify-between h-full flex-1 ml-3'}>
            <ul className={'flex space-x-5'}>
              <p
                className={'nav-item cursor-pointer select-none'}
                onClick={() => setCategoryDropdown(!isCategorySelected)}
              >
                <FormattedMessage id={'navigation_categories'} />
              </p>
            </ul>
          </nav>
          {/* Dropdown */}
          <div
            className={`bg-secondary-500 dark:bg-[#2e334f] shadow dark:shadow-lg rounded absolute w-32 top-16 z-20 left-80 mt-2 transform-gpu transition duration-200 ease-in-out ${
              isCategorySelected ? 'translate-x-0 opacity-100' : '-translate-x-[20rem] opacity-0 -z-10'
            }`}
          >
            {Array.isArray(categories) &&
              categories.map((item, i) => (
                <div
                  key={item.name}
                  className={`hover:bg-secondary-400 dark:hover:bg-blue-gray-800 ${i === 0 && 'rounded-t'} ${
                    i + 1 !== categories.length && 'border-b border-b-cool-gray-500'
                  }`}
                  // @ts-ignore
                  onClick={() => handleCategory(item.name)}
                >
                  <li
                    className={`px-3 py-2 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer list-none`}
                  >
                    <FormattedMessage id={`Category_${item.name}`} />
                  </li>
                </div>
              ))}
          </div>
        </div>

        <div className="w-full text-cool-gray-100 font-inter pr-5 pl-4">
          <ProductSearch />
        </div>

        <div className="flex space-x-4 md:space-x-6 md:space-x-5 justify-center items-center pl-2">
          <LanguagePicker className={'hidden xl:block'} />
          <div className={'flex relative cursor-pointer peer'} onClick={() => toggleWishlist()}>
            <div
              className={
                'animate-scale-down text-blue-50 select-none text-sm font-medium absolute right-0 top-0 flex items-center justify-center -mt-3 -mr-4 opacity-90 text-center bg-blue-800 rounded-full w-6 h-6'
              }
            >
              <span>{wishlistItemsN}</span>
            </div>
            <FontAwesomeIcon
              icon={faBookmark}
              className={
                'text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-2xl mx-auto cursor-pointer select-none'
              }
            />
          </div>

          <div className={'flex relative cursor-pointer peer'} onClick={() => toggleCart()}>
            <div
              className={
                'animate-scale-down text-blue-50 select-none text-sm font-medium absolute right-0 top-0 flex items-center justify-center -mt-3 -mr-4 opacity-90 text-center bg-blue-800 rounded-full w-6 h-6'
              }
            >
              <span>{cartItemsN}</span>
            </div>
            <FontAwesomeIcon
              icon={faShoppingBag}
              className={
                'text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-2xl mx-auto cursor-pointer select-none'
              }
            />
          </div>

          <div className={'relative flex items-center select-none'}>
            <FontAwesomeIcon
              icon={faUser}
              className={
                'text-blue-400 hover:text-blue-500 active:text-blue-700 transition duration-200 ease-in text-2xl mx-auto cursor-pointer'
              }
              onClick={() => {
                if (isAuthenticated) {
                  setDropdown(!isDropdownSelected)
                } else {
                  navigateToCallback('/auth/sign-in')
                }
              }}
            />

            {/* Dropdown */}
            <div
              className={`bg-secondary-500 dark:bg-blue-gray-700 shadow dark:shadow-lg rounded absolute w-32 top-10 right-0 mt-2 transform-gpu transition duration-200 ease-in-out ${
                isDropdownSelected ? 'translate-x-0 opacity-100' : '-translate-x-[5rem] opacity-0 -z-10'
              }`}
            >
              {ACCOUNT_OPTIONS.map((option, i) => (
                <div
                  key={option.intl}
                  className={`hover:bg-secondary-400 dark:hover:bg-blue-gray-800 ${i === 0 && 'rounded-t-md'} ${
                    i + 1 === ACCOUNT_OPTIONS.length && 'rounded-b-md'
                  }`}
                >
                  <Link href={option.href as string}>
                    <li
                      className={`px-3 py-2 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer list-none`}
                    >
                      <FormattedMessage id={option.intl} />
                    </li>
                    <div className={'h-0.5 w-full bg-secondary-300 dark:bg-blue-gray-600'} />
                  </Link>
                </div>
              ))}
              <div className={'h-0.5 w-full bg-secondary-300 dark:bg-blue-gray-600'} />
              <div className={'hover:bg-secondary-400 dark:hover:bg-blue-gray-800 rounded-b-md'}>
                <li
                  className={
                    'px-3 py-2 text-primary-600 dark:text-blue-gray-100 active:text-blue-gray-50 select-none cursor-pointer list-none'
                  }
                  onClick={() => {
                    signOut()
                    setDropdown(false)
                  }}
                >
                  <FormattedMessage id={'account_dropdown_signOut'} />
                </li>
              </div>
            </div>
          </div>

          <div className={'block md:hidden flex justify-center items-center z-50'}>
            {!hamburgerMenu ? (
              <Icon
                icon={faBars}
                onClick={() => {
                  setHamburgerMenu(!hamburgerMenu)
                }}
                className={'text-blue-500 hover:text-primary-900'}
              />
            ) : (
              <Icon
                icon={faXmark}
                onClick={() => {
                  setHamburgerMenu(!hamburgerMenu)
                }}
                width={30}
                height={30}
                className={`${
                  hamburgerMenu && 'absolute top-5 right-5 text-3xl text-secondary-50 hover:text-secondary-400'
                }`}
              />
            )}
          </div>
          {hamburgerMenu && (
            <div className={'block md:hidden bg-primary-light absolute h-full bottom-0 right-0 w-3/4 z-10'}>
              <ul className={'space-y-5 mt-4'}>
                <NavLink onClick={() => setHamburgerMenu(false)} href={'/'} intl={'navigation_home'} hamburgerMenu />
                <NavLink
                  onClick={() => setHamburgerMenu(false)}
                  href={`/products?page=${DEFAULT_PAGE}&limit=${DEFAULT_PAGE_LIMIT}&sort=${
                    DEFAULT_SORT.split('_')[0]
                  },${DEFAULT_SORT.split('_')[1]}`}
                  intl={'navigation_products'}
                  hamburgerMenu
                />
                <hr className={'text-primary-400 border-b-2'} />
                {isAuthenticated && (
                  <NavLink
                    onClick={() => {
                      signOut()
                      setHamburgerMenu(false)
                    }}
                    href={'/auth?opt=login'}
                    intl={'account_dropdown_signOut'}
                    hamburgerMenu
                  />
                )}
                {!isAuthenticated && (
                  <div>
                    <NavLink
                      onClick={() => {
                        setHamburgerMenu(false)
                      }}
                      href={'/auth?opt=login'}
                      intl={'Login'}
                      hamburgerMenu
                    />
                    <NavLink
                      onClick={() => {
                        setHamburgerMenu(false)
                      }}
                      href={'/auth?opt=register'}
                      intl={'Sign up'}
                      hamburgerMenu
                    />
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <CartView />
      <WishlistView />
    </div>
  )
}
