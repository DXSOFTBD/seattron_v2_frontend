import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const AdminActivity = dynamic(
  import('@/components/admin/activity/adminActivity')
);
const Order = () => {
  return (
    <div className='w-full h-full'>
      <AdminActivity />
    </div>
  );
};
Order.Layout = Layout;
export default Order;
