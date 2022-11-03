import type { AppProps } from 'next/app'

import { CartProvider } from "@/components/ContextComponents/CartContext";
import GlobalStyles from "@/styles/globalStyles";

import NavBar from "@/components/Header/Navbar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <GlobalStyles />
      <NavBar />
      {children}
    </CartProvider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
