import Ger from '@/src/intl/locales/de.json'
import Eng from '@/src/intl/locales/en.json'
import Fra from '@/src/intl/locales/fr.json'

export const messageByLocale = (language: string) => {
  switch (language) {
    case 'de':
      return Ger
    case 'en':
      return Eng
    case 'fr':
      return Fra
    default:
      return Eng
  }
}
