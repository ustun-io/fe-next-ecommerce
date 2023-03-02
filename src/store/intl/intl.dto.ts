export interface IIntlStore {
  language: string | undefined
  set: (locale?: string) => void
  reset: () => void
  languageList: any[]
}
