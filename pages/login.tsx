import Footer from '@/components/home/footer';
import dynamic from 'next/dynamic';
import Head from 'next/head';
const Layout = dynamic(() => import('@/components/layouts/Primary'));
const AllLogin = dynamic(import('@/components/login/allLogin'));

const Index = () => {
  const openGraph = {
    title: 'Seattron Login',
    url: `https://seattron.com/login`,
  };
  return (
    <div className='w-full min-h-screen relative font-lato'>
      <Head>
        <title>Seattron -Login</title>
        <meta property="url" content={`${process.env.NEXT_PUBLIC_CLIENT_HOST}/login`}></meta>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_CLIENT_HOST}/login`}></meta>
        <meta property="og:title" content='Login'></meta>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='w-full h-full'><AllLogin /></div>
      <div className='relative 4xl:absolute bottom-0 left-0'>
        <Footer />
      </div>
    </div>
  );
};
Index.Layout = Layout;
export default Index;
