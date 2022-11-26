import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import '../styles/globals.css';

import { CartProvider } from '@/components/ContextComponents/CartContext';
import NavBar from '@/components/Header/Navbar';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <NavBar />
      {/* {children} */}
    </CartProvider>
  );
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
