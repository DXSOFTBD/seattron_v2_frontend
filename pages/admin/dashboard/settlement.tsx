import React from 'react';
import dynamic from 'next/dynamic';
import ComingSoon from '@/components/common/comingSoon';
const Layout = dynamic(import('../../../components/layouts/Admin'));

const index = () => {
  return (
    <ComingSoon>
      <div className='w-full h-full dashboard_title'>Settlement</div>;
    </ComingSoon>
  );
};
index.Layout = Layout;
export default index;
