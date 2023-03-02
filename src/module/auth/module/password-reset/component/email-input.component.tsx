import { FC, useEffect } from 'react'

import { useRouter } from 'next/router'

import { defaultClasses } from '@/shared/component/Input/constant'

import { yupResolver } from '@hookform/resolvers/yup'
import {
  FORM_PASSWORD_RESET,
  RESET_PASSWORD_SUBMIT,
  RESET_YOUR_PASSWORD,
  VALIDATION_EMAIL
} from '@module/auth/constant'
import { Button, Loader } from '@shared/component'
import { capitalName } from '@shared/util'
import useAuthStore, { useAuthenticated } from '@store/auth/auth.store'
import cx from 'classnames'
import { FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { shallow } from 'zustand/shallow'

export const InputEmail: FC = () => {
  const isAuthenticated = useAuthenticated()
  const { error, emailPasswordChangeLink, fetching } = useAuthStore((state) => state, shallow)

  const router = useRouter()

  const validationSchema = Yup.object().shape({
    ...VALIDATION_EMAIL
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
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm(formOptions)

  const onSubmit = async (data: FieldValues) => {
    clearErrors('apiError')
    const { email } = data
    return await emailPasswordChangeLink(router, { email }).catch((error: any) => {
      setError('apiError', { message: error })
    })
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  return (
    <>
      <Loader loading={isSubmitting && fetching} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={
          'flex flex-col bg-transparent font-inter min-h-[16rem] mx-auto h-full md:justify-center md:w-[28rem]'
        }
      >
        <h2 className={'dark:text-primary-200 text-secondary-900 mb-6'}>{RESET_YOUR_PASSWORD}.</h2>
        <div className="flex flex-col space-y-2">
          <input
            type={'text'}
            placeholder={'E-Mail'}
            {...register('email')}
            className={cx(defaultClasses, 'dark:text-primary-200')}
            autoFocus
          />
          {error && <p className="text-danger-default dark:text-danger-400">{capitalName(error)}</p>}
          {errors && errors?.email?.message && (
            <p className="text-danger-default dark:text-danger-400">{capitalName(errors?.email?.message)}</p>
          )}
        </div>
        <Button form loading={isSubmitting && fetching} className={'mt-6'}>
          {RESET_PASSWORD_SUBMIT}
        </Button>
      </form>
    </>
  )
}
