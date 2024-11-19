import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Admin'));
const Orders = dynamic(import('@/components/admin/events/orders'));
const Order = () => {
  return (
    <div className='w-full h-full'>
      <Orders />
    </div>
  );
};
Order.Layout = Layout;
export default Order;
