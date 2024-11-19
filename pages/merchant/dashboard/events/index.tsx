import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));
const Events = dynamic(import('@/components/merchant/events/events'));
const Index = () => {
  return (
    <div className='w-full h-full'>
      <Events />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
