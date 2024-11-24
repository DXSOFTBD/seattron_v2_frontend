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
import MetaPixel from '@/components/metaPixel/MetaPixel';
import { pageview } from '@/components/utils/analytics'; 
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Toast = dynamic(import('@/components/common/toast'));

const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  const Layout = (Component as any).Layout || Noop;
  const router = useRouter()

  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = () => {
      pageview()
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      <MetaPixel />
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
