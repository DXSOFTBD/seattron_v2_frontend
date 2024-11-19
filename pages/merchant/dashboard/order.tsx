import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Agent'));
const Orders = dynamic(import('@/components/merchant/events/orders'));
const Order = () => {
  return (
    <div className='w-full h-full'>
      <Orders />
    </div>
  );
};
Order.Layout = Layout;
export default Order;
