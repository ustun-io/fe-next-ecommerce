import { FC, useCallback, useEffect, useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { defaultClasses } from '@/shared/component/Input/constant'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FORGOT_PASSWORD,
  FORM_SIGN_IN,
  LOGIN,
  NO_ACCOUNT_YET,
  PASSWORD_CHANGED,
  SIGN_IN,
  TOKEN_INVALID,
  VALIDATION_EMAIL,
  VALIDATION_PASSWORD
} from '@module/auth/constant'
import { Alert, Button, Icon, Loader } from '@shared/component'
import { capitalName } from '@shared/util'
import useAuthStore, { useAuthenticated } from '@store/auth/auth.store'
import cx from 'classnames'
import { FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { shallow } from 'zustand/shallow'

const SignInForm: FC = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false)
  const togglePass = useCallback(() => {
    setPasswordVisibility(!isPasswordVisible)
  }, [isPasswordVisible])

  const { signIn, fetching, error } = useAuthStore((state) => state, shallow)
  const isAuthenticated = useAuthenticated()

  const router = useRouter()
  let tokenInvalid: string = router.query.tokenInvalid as string
  let passwordChanged: string = router.query.passwordChanged as string

  const validationSchema = Yup.object().shape({
    ...VALIDATION_EMAIL,
    ...VALIDATION_PASSWORD
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
    name: FORM_SIGN_IN,
    shouldUnregister: true
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    clearErrors,
    unregister
  } = useForm(formOptions)

  const onSubmit = async (data: FieldValues) => {
    clearErrors('apiError')
    const { email, password } = data

    return await signIn({ email, password }).catch((error: any) => {
      setError('apiError', { message: error })
    })
  }

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated, tokenInvalid, passwordChanged])

  return (
    <>
      <Loader loading={isSubmitting && fetching} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          'flex flex-col bg-transparent font-inter min-h-[16rem] mx-auto h-full md:justify-center md:w-[28rem]'
        }
      >
        <div className={'flex flex-col space-y-8'}>
          <h2 className={'dark:text-primary-200'}>{SIGN_IN}.</h2>
          <div className="flex flex-col space-y-2">
            <input
              type={'text'}
              placeholder={'E-Mail'}
              {...register('email')}
              className={cx(defaultClasses, 'dark:text-primary-200')}
              disabled={isSubmitting && fetching}
              autoFocus
            />
            {error && ['email', 'account'].some((i) => error?.toString().includes(i)) && (
              <p className="text-danger-default dark:text-danger-400">{capitalName(error)}</p>
            )}
            {errors && errors?.email?.message && (
              // @ts-ignore
              <p className="text-danger-default dark:text-danger-400">{capitalName(errors?.email?.message)}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2 relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder={'Password'}
              {...register('password')}
              className={cx(defaultClasses, 'dark:text-primary-200')}
              disabled={isSubmitting && fetching}
            />
            {!isPasswordVisible && (
              <Icon
                className={'absolute right-0 text-secondary-50'}
                color={'secondary'}
                icon={faEyeSlash}
                onClick={togglePass}
              />
            )}
            {isPasswordVisible && (
              <Icon
                className={'absolute right-0 text-secondary-50'}
                color={'secondary'}
                icon={faEye}
                onClick={togglePass}
              />
            )}
            {error && ['Invalid', 'password', 'Password'].some((i) => error?.toString().includes(i)) && (
              <p className="text-danger-default dark:text-danger-400">{capitalName(error)}</p>
            )}
            {errors && errors?.password?.message && (
              // @ts-ignore
              <p className="text-danger-default dark:text-danger-400">{capitalName(errors?.password?.message)}.</p>
            )}
            <Link
              href={'/auth/reset-password'}
              className={
                'text-primary-default self-end dark:text-primary-200 text-sm dark:hover:text-primary-100 dark:active:text-primary-400 hover:text-primary-300 active:text-primary-700 hover:underline cursor-pointer'
              }
            >
              {FORGOT_PASSWORD}
            </Link>
          </div>
        </div>
        <div className={'flex flex-col space-y-6'}>
          <Button form loading={isSubmitting && fetching}>
            {LOGIN}
          </Button>
          <a
            onClick={() => {
              unregister('email')
              unregister('password')
              router.push('/auth/sign-up')
            }}
            className={
              'text-primary-700 dark:text-primary-200 dark:hover:text-primary-100 dark:active:text-primary-400 hover:text-primary-300 active:text-primary-700 hover:underline cursor-pointer'
            }
          >
            {NO_ACCOUNT_YET}
          </a>
        </div>

        {passwordChanged === 'true' && <Alert message={PASSWORD_CHANGED} color={'success'} className={'mt-10'} />}
        {tokenInvalid === 'true' && <Alert message={TOKEN_INVALID} color={'danger'} className={'mt-10'} />}
      </form>
    </>
  )
}

export { SignInForm }
