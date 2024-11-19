import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));
const Checker = dynamic(
  import('@/components/merchant/ticket-checking/checker')
);

const Index = () => {
  return (
    <div className='w-full h-full'>
      <Checker />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
