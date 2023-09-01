"use client";

import {
  ApolloLink,
  HttpLink,
  concat,
  fromPromise,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import { setContext } from '@apollo/client/link/context'
import { globalContext } from "@/utils/globalContext";
import { refreshJson } from "@/API";

const refresh = async () => {
  const query = refreshJson(globalContext.getRefreshTocken())
  const response = await fetch("http://localhost:3000/api/graphql", {
    headers: { 'content-type': 'application/json' },
    method: 'POST',
    body: query
  })
  const responseJson = await response.json()

  return responseJson.data
}

function makeClient() {
  const httpLink = new HttpLink({
    uri: "http://localhost:3000/api/graphql",
  });

  const authlink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        "Authorization": `Bearer:${localStorage.getItem("tocken")}`
      }
    }
  })

  const errorLink = onError(({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors) {
      for (let error of graphQLErrors) {
        if (error.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            refresh()
              .then(({ refresh: { user, refreshToken, accessToken } }) => {
                localStorage.setItem("tocken", accessToken)
                localStorage.setItem("user", user)
                globalContext.setRefreshTocken(refreshToken)

                return accessToken
              })
              .catch(error => {
                return
              })
          ).filter(value => Boolean(value))
            .flatMap(() => {
              return forward(operation)
            })
        }
      }
    }
    else if (networkError) {
      console.log(`[Network error]: ${networkError}`)
    }
  })

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
          new SSRMultipartLink({
            stripDefer: true,
          }),
          httpLink,
          authlink,
          errorLink
        ])
        // :authlink.concat(httpLink),
        : ApolloLink.from([errorLink, authlink, httpLink]),
    connectToDevTools: true
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}