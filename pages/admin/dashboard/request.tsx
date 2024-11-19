import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const Requests = dynamic(import('@/components/admin/request/requests'));
const index = () => {
  return (
    <div className='w-full h-full'>
      <Requests />
    </div>
  );
};
index.Layout = Layout;
export default index;
