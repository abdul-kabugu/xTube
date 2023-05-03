import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const API_URL = 'https://squid.subsquid.io/soonsocial/graphql'

/* create the API client */
export const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
  defaultOptions : {
    watchQuery : {
      fetchPolicy : "no-cache"
    },
    query : {
      fetchPolicy : "no-cache"
    }
  }
})


