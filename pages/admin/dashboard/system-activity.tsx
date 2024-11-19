import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const SystemActivity = dynamic(
  import('@/components/admin/activity/systemActivity')
);
const Order = () => {
  return (
    <div className='w-full h-full'>
      <SystemActivity />
    </div>
  );
};
Order.Layout = Layout;
export default Order;
