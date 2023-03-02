import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { getBearerToken } from '@shared/util'

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_NEST_GRAPHQL_BASE
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getBearerToken()
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})
