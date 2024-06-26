'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

function makeQueryClient() {
    return new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }) 
}


let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
    if (typeof window === 'undefined') {
      return makeQueryClient()
    } else {
      if (!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
    }
  }

export function Providers(props: {children: React.ReactNode}) {
    const queryClient = getQueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <>
                {props.children}
            </>
        </QueryClientProvider>
    )
}