// import Dashboard from "@/components/dashboardLayout/dashboard";
// import PrimaryLayout from "@/components/dashboardLayout/layouts/Primary";


// const DashboardPage = () => {
//   return <div><Dashboard/></div>;
// };

// DashboardPage.Layout = PrimaryLayout;

// export default DashboardPage;


import Dashboard from '@/components/dashboardLayout/dashboard';
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


