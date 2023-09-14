import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client';
import client

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
