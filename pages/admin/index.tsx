import SEO from '@/components/common/SEO/SEO';
import Footer from '@/components/home/footer';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('@/components/layouts/Primary'));
const AdminLogin = dynamic(import('@/components/login/admin/adminLogin'));

const Index = () => {
  return (
    <div className='w-full min-h-screen relative'>
      <SEO title='Admin login -Seattron'></SEO>
      <div className='w-full h-[500px] z-1000'>
        <AdminLogin />
      </div>

      <div className='relative 4xl:absolute bottom-0 left-0'>
        <Footer />
      </div>
    </div>
  );
};
Index.Layout = Layout;
export default Index;
