import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const AddOrganizer = dynamic(
  import('@/components/admin/organizer/addOrganizer')
);
const index = () => {
  return (
    <div className='w-full h-full'>
      <AddOrganizer />
    </div>
  );
};
index.Layout = Layout;
export default index;
