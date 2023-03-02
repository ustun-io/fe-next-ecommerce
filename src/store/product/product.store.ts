import { brands, categories, fetchRam, fetchStorage, products } from '@shared/service'
import { IProductStore } from '@store/product/product.dto'
import { initialState } from '@store/product/product.inital'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const useProductStore = create(
  devtools(
    persist<IProductStore>(
      (set) => ({
        ...initialState,
        fetchBrands: async () => {
          try {
            set((state) => ({ ...state, fetching: true }))
            const { data } = await brands()
            set((state) => ({ ...state, fetching: false, brands: data.brands }))
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        fetchCategories: async () => {
          try {
            set((state) => ({ ...state, fetching: true }))
            const { data } = await categories()
            set((state) => ({ ...state, fetching: false, categories: data.categories }))
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        fetchGroupedRam: async () => {
          try {
            set((state) => ({ ...state, fetching: true }))
            const { data } = await fetchRam()
            set((state) => ({ ...state, fetching: false, ramList: data.getRamOptions }))
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        fetchGroupedStorage: async () => {
          try {
            set((state) => ({ ...state, fetching: true }))
            const { data } = await fetchStorage()
            set((state) => ({ ...state, fetching: false, storageList: data.getStorageOptions }))
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        fetchPricesForFilter: async () => {
          try {
            await products(
              { page: 1, limit: 1 },
              {
                sortBy: 'price',
                sortDir: 'DESC'
              },
              {}
            ).then((response) => set((state) => ({ ...state, highestPrice: parseFloat(response.data[0].price) })))
            await products(
              { page: 1, limit: 1 },
              {
                sortBy: 'price',
                sortDir: 'ASC'
              },
              {}
            ).then((response) => set((state) => ({ ...state, lowestPrice: parseFloat(response.data[0].price) })))
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        },
        reset: () => {
          set(() => initialState)
          sessionStorage?.clear()
        }
      }),
      {
        name: 'product-storage',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export default useProductStore
