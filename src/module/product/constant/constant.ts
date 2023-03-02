import * as Yup from 'yup'

export const FORM_RATING = 'form-rating'
export const SUBMIT_RATING = 'Rate product'
export const LOGIN_TO_RATE = 'Please login to rate a product.'
export const NO_RATINGS_YET = 'This product has no reviews yet.'

export const VALIDATION_RATING_TEXT = {
  text: Yup.string().required('Please write about your experience with this product.')
}
