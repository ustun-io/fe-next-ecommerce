import * as Yup from 'yup'

export const FORM_SEARCH = 'form-search'

export const VALIDATION_SEARCH = {
  search: Yup.string().required('Search title is required').min(3, 'Please enter a valid title')
}
