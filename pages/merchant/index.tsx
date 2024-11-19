import SEO from '@/components/common/SEO/SEO';
import Footer from '@/components/home/footer';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/layouts/Primary'));
const AgentLogin = dynamic(import('@/components/login/agent/login'));

const Index = () => {
  return (
    <div className='w-full min-h-screen relative'>
      <SEO title='Agent login -Seattron'></SEO>
      <div className='w-full h-full'>
        <AgentLogin />
      </div>

      <div className='relative 4xl:absolute bottom-0 left-0'>
        <Footer />
      </div>
    </div>
  );
};
Index.Layout = Layout;
export default Index;
