export interface IProductStore {
  categories: any[] | undefined
  brands: any[] | undefined
  ramList: any[] | undefined
  storageList: any[] | undefined
  error: any | undefined
  lowestPrice: number | undefined
  highestPrice: number | undefined
  fetching: boolean
  fetchBrands: () => void
  fetchCategories: () => void
  fetchGroupedRam: () => void
  fetchGroupedStorage: () => void
  fetchPricesForFilter: () => void
  reset: () => void
}
