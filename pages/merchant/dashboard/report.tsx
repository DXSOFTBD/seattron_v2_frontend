import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Agent'));
const Report = dynamic(import('@/components/merchant/events/report'));
const index = () => {
  return (
    <div className='w-full h-full'>
      <Report />
    </div>
  );
};
index.Layout = Layout;
export default index;
