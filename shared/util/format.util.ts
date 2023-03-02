import { FieldError, FieldErrorsImpl, GlobalError, Merge } from 'react-hook-form'

export const capitalName = (
  text:
    | string
    | Merge<string | undefined, FieldError | GlobalError | Merge<FieldError, FieldErrorsImpl<any>>>
    | undefined
) => {
  return typeof text === 'string' ? text?.charAt(0).toUpperCase() + text?.slice(1) : ''
}

export const getNameFromEmail = (email: string) => {
  return email.slice(0, email.indexOf('@'))
}

export const censorEmail = (email: string) => {
  return `${email?.slice(0, email?.indexOf('@')).replace(/(.).*(.)/, '$1***$2')}@${email?.split('@', 2)[1]}`
}

export const censorName = (w: string) => {
  if (w.length < 3) return w
  return w.substring(0, 2) + '*'.repeat(w.length - 4) + w.substring(w.length - 2, w.length)
}

export const isFloat = (number: number) => {
  return !Number.isNaN(number) && !Number.isInteger(number)
}

export const decimalCount = (float: number) => {
  const numberString = String(float)

  if (numberString.includes('.')) {
    return numberString.split('.')[1].length
  }

  return 0
}

export const formatError = (e: any) =>
  e?.response?.data?.message || e?.message || e?.data?.message || 'Unexpected network error.'

export const toDecimal = (float: number, decimalPoints: number) => float.toFixed(decimalPoints)
