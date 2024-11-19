import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));
const Discount = dynamic(import('@/components/merchant/discount'));
const Index = () => {
  return (
    <div className='w-full h-full'>
      <Discount />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
