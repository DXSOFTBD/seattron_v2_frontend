import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const Dashboard = dynamic(() => import('../../../components/admin/Dashboard'));

const Admin = (props: any) => {
  return <div className='w-full h-full'>{<Dashboard />}</div>;
};

Admin.Layout = Layout;
Admin.agent = true;

export default Admin;