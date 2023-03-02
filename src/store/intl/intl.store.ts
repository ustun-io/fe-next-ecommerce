import Router from 'next/router'

import { DEFAULT_LANGUAGE } from '@/src/intl/constant'

import { IIntlStore } from '@store/intl/intl.dto'
import { initialState } from '@store/intl/intl.inital'
import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

const useIntlStore = create(
  devtools(
    persist<IIntlStore>(
      (set) => ({
        ...initialState,
        set: (localeString?: string) => {
          if (localeString) set((state) => ({ ...state, language: localeString }))
          else {
            set((state) => {
              if (!state.language) {
                const router = Router
                const { locale } = router
                const [shortLocale] = locale ? locale.split('-') : [DEFAULT_LANGUAGE]
                return { ...state, language: shortLocale }
              }
              return {}
            })
          }
        },
        reset: () => {
          set(() => initialState)
          localStorage?.clear()
        }
      }),
      {
        name: 'intl-storage',
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export default useIntlStore
