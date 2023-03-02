import { ILayoutStore } from '@store/layout/layout.dto'
import { initialState } from '@store/layout/layout.inital'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const useLayoutStore = create(
  devtools(
    persist<ILayoutStore>(
      (set) => ({
        ...initialState,
        toggleBrands: () => {
          try {
            set((state) => {
              const {
                expanded: { filterSpecs, filterCategories, filterBrands, filterPrice }
              } = state
              if (filterBrands === 0)
                return {
                  ...state,
                  expanded: { filterBrands: 'auto', filterCategories, filterSpecs, filterPrice }
                }
              else return { ...state, expanded: { filterBrands: 0, filterCategories, filterSpecs, filterPrice } }
            })
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        toggleCategories: () => {
          try {
            set((state) => {
              const {
                expanded: { filterSpecs, filterCategories, filterBrands, filterPrice }
              } = state
              if (filterCategories === 0)
                return {
                  ...state,
                  expanded: { filterCategories: 'auto', filterBrands, filterSpecs, filterPrice }
                }
              else return { ...state, expanded: { filterCategories: 0, filterBrands, filterSpecs, filterPrice } }
            })
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        togglePrice: () => {
          try {
            set((state) => {
              const {
                expanded: { filterPrice, filterCategories, filterBrands, filterSpecs }
              } = state
              if (filterPrice === 0)
                return {
                  ...state,
                  expanded: { filterPrice: 'auto', filterBrands, filterCategories, filterSpecs }
                }
              else return { ...state, expanded: { filterPrice: 0, filterBrands, filterCategories, filterSpecs } }
            })
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        toggleSpecs: () => {
          try {
            set((state) => {
              const {
                expanded: { filterSpecs, filterCategories, filterBrands, filterPrice }
              } = state
              if (filterSpecs === 0)
                return {
                  ...state,
                  expanded: { filterSpecs: 'auto', filterBrands, filterCategories, filterPrice }
                }
              else return { ...state, expanded: { filterSpecs: 0, filterBrands, filterCategories, filterPrice } }
            })
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        }
      }),
      {
        name: 'layout-storage',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export const useBrandExpanded = () =>
  useLayoutStore((state): string | number => {
    const {
      expanded: { filterBrands }
    } = state
    return filterBrands
  })

export const useCategoryExpanded = () =>
  useLayoutStore((state): string | number => {
    const {
      expanded: { filterCategories }
    } = state
    return filterCategories
  })

export const useSpecsExpanded = () =>
  useLayoutStore((state): string | number => {
    const {
      expanded: { filterSpecs }
    } = state
    return filterSpecs
  })

export const usePriceExpanded = () =>
  useLayoutStore((state): string | number => {
    const {
      expanded: { filterPrice }
    } = state
    return filterPrice
  })

export default useLayoutStore
