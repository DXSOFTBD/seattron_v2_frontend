import ComingSoon from '@/components/common/comingSoon';
import Support from '@/components/merchant/support';
import dynamic from 'next/dynamic';
import React from 'react';
const Layout = dynamic(import('@/components/layouts/Agent'));

const Index = () => {
  return (
    <div>
      <Support />
    </div>
  );
};
Index.Layout = Layout;
export default Index;
