import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));
const CreateUser = dynamic(import('@/components/merchant/user/createUser'));
const Index = () => {
  return (
    <div className='w-full h-full grid grid-cols-1'>
      <CreateUser />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
