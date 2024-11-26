import '../styles/globals.css';
import { FC, ReactNode, Suspense, useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Provider } from 'react-redux';
import { store } from 'redux/store';

import Head from '../components/common/Head/Head';
import Skeleton from '@/components/common/skeleton';
import { SessionProvider } from "next-auth/react";

import { pageview } from '@/components/utils/analytics'; 
import MetaPixel from '@/components/metaPixel/MetaPixel';
import GoogleTag from '@/components/googleTag/GoogleTag';

// Dynamically import the Toast component
const Toast = dynamic(() => import('@/components/common/toast'), { ssr: false });

// Define a default layout wrapper
const Noop: FC<{ children?: ReactNode }> = ({ children }) => <>{children}</>;

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  // Get the Layout property from the component or fallback to Noop
  const Layout = (Component as any).Layout || Noop;
  const router = useRouter();

  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = () => {
      pageview();
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <GoogleTag />
      <MetaPixel />

      {/* Redux Provider */}
      <Provider store={store}>
        {/* SEO Head */}
        <Head />

        {/* Toast Notifications */}
        <Toast>
          {/* Suspense with a fallback skeleton */}
          <Suspense fallback={<Skeleton />}>
            {/* Apply Layout Wrapper */}
            <Layout>
              {/* Session Provider for NextAuth */}
              <SessionProvider session={session}>
                {/* Render the actual page */}
                <Component {...pageProps} />
              </SessionProvider>
            </Layout>
          </Suspense>
        </Toast>
      </Provider>
    </>
  );
};

export default MyApp;


