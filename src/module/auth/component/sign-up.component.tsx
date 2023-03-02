import { FC, useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { defaultClasses } from '@/shared/component/Input/constant'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  ALREADY_HAS_ACCOUNT,
  FORM_SIGN_UP,
  SIGN_UP,
  VALIDATION_EMAIL,
  VALIDATION_PASSWORD,
  VALIDATION_PASSWORD_REPEAT
} from '@module/auth/constant'
import { Button, Icon, Loader } from '@shared/component'
import { capitalName } from '@shared/util'
import useAuthStore, { useAuthenticated } from '@store/auth/auth.store'
import cx from 'classnames'
import { FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { shallow } from 'zustand/shallow'

const SignUpForm: FC = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false)
  const [isPasswordRepeatVisible, setPasswordRepeatVisibility] = useState(false)

  const togglePass = useCallback(() => {
    setPasswordVisibility(!isPasswordVisible)
  }, [isPasswordVisible])
  const togglePassRepeat = useCallback(() => {
    setPasswordRepeatVisibility(!isPasswordRepeatVisible)
  }, [isPasswordRepeatVisible])

  const { signUp, fetching, error } = useAuthStore((state) => state, shallow)
  const isAuthenticated = useAuthenticated()

  const router = useRouter()

  const validationSchema = Yup.object().shape({
    ...VALIDATION_EMAIL,
    ...VALIDATION_PASSWORD,
    ...VALIDATION_PASSWORD_REPEAT
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
    name: FORM_SIGN_UP,
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
    const { email, password, phone } = data

    return await signUp(router, { email, password, phone }).catch((error: any) => {
      setError('apiError', { message: error })
    })
  }

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated])

  return (
    <>
      <Loader loading={isSubmitting && fetching} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          'flex flex-col space-y-6 bg-transparent font-inter min-h-[16rem] mx-auto h-full md:justify-center md:w-[28rem]'
        }
      >
        <div className={'flex flex-col space-y-8'}>
          <h2 className={'dark:text-primary-200'}>{SIGN_UP}.</h2>
          <div className="flex flex-col space-y-2">
            <input
              type={'text'}
              placeholder={'E-Mail'}
              {...register('email')}
              className={cx(defaultClasses, 'dark:text-primary-200')}
              autoFocus
            />
            {error && error?.toString().includes('Account') && (
              <p className="text-danger-default dark:text-danger-400">{capitalName(error)}</p>
            )}
            {errors?.email?.message && (
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
          </div>
          <div className="flex flex-col space-y-2 relative">
            <input
              type={isPasswordRepeatVisible ? 'text' : 'password'}
              placeholder={'Repeat password'}
              {...register('passwordConfirm')}
              className={cx(defaultClasses, 'dark:text-primary-200')}
            />
            {!isPasswordRepeatVisible && (
              <Icon
                className={'absolute right-0 text-secondary-50'}
                color={'secondary'}
                icon={faEyeSlash}
                onClick={togglePassRepeat}
              />
            )}
            {isPasswordRepeatVisible && (
              <Icon
                className={'absolute right-0 text-secondary-50'}
                color={'secondary'}
                icon={faEye}
                onClick={togglePassRepeat}
              />
            )}
            {errors?.passwordConfirm?.message && (
              <p className="text-danger-default dark:text-danger-400">
                {/*@ts-ignore*/}
                {capitalName(errors?.passwordConfirm?.message)}.
              </p>
            )}
          </div>
        </div>
        <div className={'flex flex-col space-y-6'}>
          <Button form loading={isSubmitting && fetching}>
            {SIGN_UP}
          </Button>
          <a
            onClick={() => {
              unregister('email')
              unregister('password')
              unregister('passwordConfirm')
              router.push('/auth/sign-in')
            }}
            className={
              'text-primary-700 dark:text-primary-200 dark:hover:text-primary-100 dark:active:text-primary-400 hover:text-primary-300 active:text-primary-700 hover:underline cursor-pointer'
            }
          >
            {ALREADY_HAS_ACCOUNT}
          </a>
        </div>
      </form>
    </>
  )
}

export { SignUpForm }
