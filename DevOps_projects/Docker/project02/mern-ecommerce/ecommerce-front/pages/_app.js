import styled, { createGlobalStyle } from 'styled-components'
import { SessionProvider } from "next-auth/react"
import '../styles/global.css'
import CartContextProvider from '@/context/CartContext'
const GlobalStyles = createGlobalStyle`
body{
  margin: 0;
  padding: 0;
  background-color: #eee;
}
  
`
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <GlobalStyles />
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>
    </>
  )
}
