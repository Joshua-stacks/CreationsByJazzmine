import type { AppProps } from 'next/app';
import type { NextPage } from 'next';

import { CartProvider } from '@/components/ContextComponents/CartContext';
import GlobalStyles from '@/styles/globalStyles';
import '../styles/globals.css';
import styled from 'styled-components';

import NavBar from '@/components/Header/Navbar';

import Footer from '@/components/Footer';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CartProvider>
      <GlobalStyles />

      <div className="flex flex-col h-full">
        <NavBar />
        <div>{children}</div>
        <Footer />
      </div>
    </CartProvider>
  );
};
// const Parent = styled.div`
// display: flex;
// flex-direction: column;
// height: 100%;
// `
// const Child = styled.div`
// flex-grow: 1;
// `

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Layout>{getLayout(<Component {...pageProps} />)}</Layout>;
}
