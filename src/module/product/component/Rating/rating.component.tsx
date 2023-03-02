import { useState } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { defaultClasses } from '@/shared/component/Input/constant'
import Rating from '@/shared/component/Rating'
import { Rating as RatingEntity } from '@/shared/model'

import { yupResolver } from '@hookform/resolvers/yup'
import { FORM_RATING, VALIDATION_RATING_TEXT } from '@module/product/constant/constant'
import { Button, Loader } from '@shared/component'
import { addRating } from '@shared/service'
import { capitalName, censorName, getNameFromEmail } from '@shared/util'
import { useAuthenticated } from '@store/auth/auth.store'
import cx from 'classnames'
import { FieldValues, useForm } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'
import * as Yup from 'yup'

interface IProductRating {
  rating: RatingEntity[]
  productId: string | undefined
}

export const ProductRating = ({ rating, productId }: IProductRating) => {
  const [customerRating, setRating] = useState(0)
  const validationSchema = Yup.object().shape({
    ...VALIDATION_RATING_TEXT
  })
  const router = useRouter()
  const isAuthenticated = useAuthenticated()
  const intl = useIntl()

  const formOptions = {
    resolver: yupResolver(validationSchema),
    name: FORM_RATING,
    shouldUnregister: false
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
    const { text, productId } = data

    return await addRating({ rating: customerRating, text, productId })
      .then(() => {
        router.replace(router.asPath)
      })
      .catch((error: any) => {
        setError('apiError', { message: error })
      })
  }

  const handleClick = (value: any) => {
    setRating(value.rating)
  }

  return (
    <div className={'text-secondary-50 mt-10 space-y-5 py-4 px-4 bg-secondary-500 dark:bg-blue-900 rounded-lg'}>
      <h2 className={'text-blue-400 dark:text-blue-100'}>
        <FormattedMessage id={'product_ratings'} />
      </h2>
      {rating?.length > 0 && (
        <div className={'space-y-5'}>
          {rating &&
            rating.map((rating: RatingEntity, i: number) => (
              <div key={i} className={'my-2 border-b border-blue-600 pb-1'}>
                <h5 className={'mt-2 font-medium text-blue-400 dark:text-blue-100'}>
                  {censorName(getNameFromEmail(rating.user.email))}
                </h5>
                <Rating rating={rating.rating} />
                <p className={'text-blue-400 dark:text-blue-300'}>{rating.text}</p>
              </div>
            ))}
        </div>
      )}
      {rating?.length === 0 && (
        <p className={'text-blue-400 dark:text-blue-50'}>
          <FormattedMessage id={'product_noRatings'} />.
        </p>
      )}
      <Loader loading={isSubmitting} />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={'flex flex-col bg-transparent font-inter min-h-[16rem] h-full md:justify-center md:w-[60%]'}
      >
        <h2
          className={`text-blue-400 dark:text-blue-100 ml-1 ${!isAuthenticated && '-mt-28'} ${
            isAuthenticated && 'mb-3'
          }`}
        >
          <FormattedMessage id={'product_rateNow'} />.
        </h2>
        <div className={'flex flex-col'}>
          {isAuthenticated && (
            <>
              <Rating rating={4} readOnly={false} handleClick={handleClick} />
              <input
                type={'text'}
                {...register('text')}
                placeholder={intl.formatMessage({ id: 'product_rateCTA' })}
                className={cx(defaultClasses, 'dark:text-primary-100')}
                disabled={isSubmitting}
              />
              <input type={'text'} {...register('productId')} value={productId} hidden />
            </>
          )}
          {!isAuthenticated && (
            <Link href={'/auth/sign-in'}>
              <h5 className={'mt-2 hover:underline text-blue-400 dark:text-blue-100'}>
                <FormattedMessage id={'product_loginToRate'} />
              </h5>
            </Link>
          )}
        </div>
        {errors && errors?.text?.message && (
          <p className="text-danger-default text-blue-400 dark:text-danger-400">{capitalName(errors.text.message)}</p>
        )}
        {errors && errors?.customerRating?.message && (
          <p className="text-danger-default text-blue-400 dark:text-danger-400">
            {capitalName(errors.customerRating.message)}
          </p>
        )}
        {isAuthenticated && (
          <Button form loading={isSubmitting} className={'mt-6'}>
            <FormattedMessage id={'product_rateButton'} />
          </Button>
        )}
      </form>
    </div>
  )
}

ProductRating.defaultProps = {
  rating: []
}
