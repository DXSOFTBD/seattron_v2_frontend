import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));
const User = dynamic(import('@/components/merchant/user/user'));
const Index = () => {
  return (
    <div className='w-full h-full grid grid-cols-1'>
      <User />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
