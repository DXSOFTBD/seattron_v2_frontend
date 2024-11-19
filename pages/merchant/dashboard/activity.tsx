import React from 'react';
import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Agent'));
const Activity = dynamic(import('@/components/merchant/activity'));
const Order = () => {
  return (
    <div className='w-full h-full'>
      <Activity />
    </div>
  );
};
Order.Layout = Layout;
export default Order;
