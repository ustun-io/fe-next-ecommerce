export interface ILayoutStore {
  expanded: {
    filterBrands: number | string
    filterCategories: number | string
    filterSpecs: number | string
    filterPrice: number | string
  }
  toggleBrands: () => void
  toggleCategories: () => void
  toggleSpecs: () => void
  togglePrice: () => void
}
