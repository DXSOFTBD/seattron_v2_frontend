import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));
const StoreSetting = dynamic(
  import('@/components/merchant/store-setting/storeSetting')
);
const Index = () => {
  return (
    <div className='w-full h-full'>
      <StoreSetting />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
