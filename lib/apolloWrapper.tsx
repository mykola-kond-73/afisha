"use client";

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  concat,
  fromPromise,
  useMutation,
} from "@apollo/client";
// import { onError } from "@apollo/client/link/error";
import {
  ApolloNextAppProvider,
  NextSSRApolloClient,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";
import {setContext} from '@apollo/client/link/context'

function makeClient() {
  const httpLink = new HttpLink({
      // https://studio.apollographql.com/public/spacex-l4uc6p/
      // uri: "https://main--spacex-l4uc6p.apollographos.net/graphql",
    uri: "http://localhost:3000/api/graphql",

  });

  const authlink=setContext((_,{headers})=>{
    return {
      headers:{
        ...headers,
        "Authorization": `Bearer:${localStorage.getItem("tocken")}`
      }
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
            authlink
          ])
        :authlink.concat(httpLink),
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