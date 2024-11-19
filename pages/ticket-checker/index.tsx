import SEO from '@/components/common/SEO/SEO';
import Footer from '@/components/home/footer';
import dynamic from 'next/dynamic';
const CheckerLogin = dynamic(import('@/components/login/checker/login'));
const Layout = dynamic(() => import('@/components/layouts/Primary'));

const Index = () => {
  const openGraph = {
    title: 'Seattron Login',
    url: `https://seattron.com/login`,
  };
  return (
    <div className='w-full h-full font-lato bg-white'>
      <SEO title='Login -Seattron'></SEO>
      <CheckerLogin />
      <Footer />
    </div>
  );
};
Index.Layout = Layout
export default Index;
