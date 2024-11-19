import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const Report = dynamic(import('@/components/admin/events/report'));
const index = () => {
  return (
    <div className='w-full h-full'>
      <Report />
    </div>
  );
};
index.Layout = Layout;
export default index;
