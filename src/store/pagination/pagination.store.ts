import { IPaginationStore } from '@store/pagination/pagination.dto'
import { initialState } from '@store/pagination/pagination.inital'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const usePaginationStore = create(
  devtools(
    persist<IPaginationStore>(
      (set) => ({
        ...initialState,
        setSort: (sort: string) => {
          try {
            set((state) => ({ ...state, currentSort: sort }))
          } catch (error: any) {
            set((state) => ({ ...state, error: error.message }))
          }
        }
      }),
      {
        name: 'pagination-storage',
        storage: createJSONStorage(() => sessionStorage)
      }
    )
  )
)

export const useOffsetOptions = () =>
  usePaginationStore((state): number[] => {
    return state.offsetList
  })

export default usePaginationStore
