import Dashboard from '@/components/dashboard/dashboard';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('../../components/layouts/Primary'), {
  ssr: false,
});

const Page = () => {
  return (
    <div className='w-full h-full bg-white text-black'>
      <Dashboard />
    </div>
  );
};
Page.Layout = Layout;
export default Page;
