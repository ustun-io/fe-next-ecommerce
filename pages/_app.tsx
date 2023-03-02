import React, { FC, useEffect, useMemo } from 'react'

import type { AppProps } from 'next/app'

import { messageByLocale } from '@/shared/util/intl.util'

import '@assets/style/bundle.scss'
import '@fortawesome/fontawesome-svg-core/styles.css'

import { ApolloProvider } from '@apollo/client'
import { config } from '@fortawesome/fontawesome-svg-core'
import { Footer, Header } from '@shared/component'
import { apolloClient } from '@shared/service'
import { hasHydrated } from '@store/hook/has-hydrated.hook'
import useIntlStore from '@store/intl/intl.store'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { NextAdapter } from 'next-query-params'
import { IntlProvider } from 'react-intl'
import { QueryParamProvider } from 'use-query-params'
import { shallow } from 'zustand/shallow'

config.autoAddCss = false

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  const { language, set } = useIntlStore((state) => state, shallow)
  const [queryClient] = React.useState(() => new QueryClient())

  useEffect(() => {
    set()
  }, [language, set])

  const messages = useMemo(() => {
    return messageByLocale(language as string)
  }, [language])

  return hasHydrated() ? (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <QueryParamProvider adapter={NextAdapter}>
          <ApolloProvider client={apolloClient}>
            <IntlProvider locale={language as string} messages={messages} onError={() => null}>
              <Header />
              <Component {...pageProps} />
              <Footer />
              <ReactQueryDevtools initialIsOpen={false} />
            </IntlProvider>
          </ApolloProvider>
        </QueryParamProvider>
      </Hydrate>
    </QueryClientProvider>
  ) : null
}

export default App
