import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../../components/layouts/Admin'));
const Organizer = dynamic(import('@/components/admin/organizer/organizer'));
const index = () => {
  return (
    <div className='w-full h-full'>
      <Organizer />
    </div>
  );
};
index.Layout = Layout;
export default index;
