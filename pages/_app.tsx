import '../styles/globals.css';
import { FC, ReactNode, Suspense } from 'react';
import type { AppProps } from 'next/app';
import Head from '../components/common/Head/Head';
import { store } from 'redux/store';
import { Provider } from 'react-redux';

import dynamic from 'next/dynamic';
import Script from 'next/script';
import Skeleton from '@/components/common/skeleton';
import { SessionProvider } from "next-auth/react";

const Toast = dynamic(import('@/components/common/toast'));

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;

  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J4WSPVETKF"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J4WSPVETKF');
        `}
      </Script>
      <Provider store={store}>

        <Head />
        <Toast>
          <Suspense fallback={<Skeleton />}>
            <Layout pageProps={pageProps}>
              <SessionProvider session={session}>
                <Component {...pageProps} />
              </SessionProvider>
            </Layout>
          </Suspense>
        </Toast>

      </Provider>
    </>
  );
}

export default MyApp;
