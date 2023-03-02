import React from 'react'

import { useRouter } from 'next/router'

import { FORM_SEARCH, VALIDATION_SEARCH } from '@/shared/component/Search/constant'

import { yupResolver } from '@hookform/resolvers/yup'
import { capitalName } from '@shared/util'
import { FieldValues, useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const ProductSearch = () => {
  const router = useRouter()
  const { replace, query } = router

  const validationSchema = Yup.object().shape({
    ...VALIDATION_SEARCH
  })

  const formOptions = {
    resolver: yupResolver(validationSchema),
    name: FORM_SEARCH,
    shouldUnregister: true
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors
  } = useForm(formOptions)

  const onSubmit = async (data: FieldValues) => {
    clearErrors('apiError')

    const { search } = data
    query.q = String(search)

    if (query.id) delete query.id

    replace({
      pathname: '/products/search',
      query
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={'relative'}>
      <input
        {...register('search')}
        type={'search'}
        placeholder={'Search...'}
        className={'w-full h-full py-4 px-3 bg-blue-gray-800 rounded-lg'}
        disabled={isSubmitting}
      />
      {errors && errors?.search?.message && (
        <p className="text-danger-default dark:text-danger-400 absolute mt-1">
          {capitalName(errors?.search?.message)}.
        </p>
      )}
    </form>
  )
}
