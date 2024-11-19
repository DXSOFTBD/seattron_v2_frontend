import ComingSoon from '@/components/common/comingSoon';
import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));

const Index = () => {
  return <ComingSoon className='w-full h-full'>Marketing page</ComingSoon>;
};
Index.Layout = Layout;
export default Index;
