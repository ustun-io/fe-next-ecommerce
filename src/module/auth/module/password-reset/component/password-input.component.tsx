import { FC, useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { defaultClasses } from '@/shared/component/Input/constant'

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  FORM_PASSWORD_RESET,
  NEW_PASSWORD,
  RESET_PASSWORD,
  VALIDATION_PASSWORD,
  VALIDATION_PASSWORD_REPEAT
} from '@module/auth/constant'
import { Button, Icon, Loader } from '@shared/component'
import { capitalName } from '@shared/util'
import useAuthStore from '@store/auth/auth.store'
import cx from 'classnames'
import { FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { shallow } from 'zustand/shallow'

interface IInputPasswordForm {
  password: string
  passwordConfirm: string
  apiError?: string
  token?: string
}

export const InputPassword: FC = () => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false)
  const [isPasswordRepeatVisible, setPasswordRepeatVisibility] = useState(false)
  const togglePass = useCallback(() => {
    setPasswordVisibility(!isPasswordVisible)
  }, [isPasswordVisible])
  const togglePassRepeat = useCallback(() => {
    setPasswordRepeatVisibility(!isPasswordRepeatVisible)
  }, [isPasswordRepeatVisible])

  const { error, changePassword, verifyToken } = useAuthStore((state) => state, shallow)

  const router = useRouter()
  let token: string = router.query.token as string

  useEffect(() => {
    verifyToken(router, token, 'password-reset')
  }, [token])

  const validationSchema = Yup.object().shape({
    ...VALIDATION_PASSWORD,
    ...VALIDATION_PASSWORD_REPEAT
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
    name: FORM_PASSWORD_RESET,
    shouldUnregister: true
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting }
  } = useForm<IInputPasswordForm>(formOptions)

  const onSubmit = async (data: FieldValues) => {
    const { password } = data
    return await changePassword(router, { token, password })
      .then((response: any) => {
        if (response?.payload?.affected) {
          router.push('/auth/sign-in?passwordChanged=true')
        }
      })
      .catch((error: any) => {
        setError('apiError', { message: error })
      })
  }

  return (
    <>
      <Loader loading={isSubmitting} />

      {error && error?.toString().includes('Token') && errors && errors?.token?.message ? (
        <p className="text-danger-default dark:text-danger-400">{capitalName(error)}</p>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            'flex flex-col bg-transparent font-inter min-h-[16rem] mx-auto h-full md:justify-center w-full md:w-[28rem]'
          }
        >
          <div className={'flex flex-col space-y-6'}>
            <h2 className={'dark:text-primary-200 text-secondary-900 mb-6'}>{NEW_PASSWORD}.</h2>

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
                  {capitalName(errors?.passwordConfirm?.message)}.
                </p>
              )}
            </div>

            <Button
              color={'primary'}
              loading={isSubmitting}
              disabled={isSubmitting}
              form={true}
              className={'mt-6 flex items-center justify-center min-w-[7rem]'}
            >
              {RESET_PASSWORD}
            </Button>
          </div>
        </form>
      )}
    </>
  )
}
