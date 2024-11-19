import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
const Navbar = dynamic(() => import('../common/navbar/Navbar'), { ssr: false });
// import Footer from '../home/footer/Footer';

const Primary: React.FC<{ children?: React.ReactNode }> = ({
  children,
}: any) => {
  return (
    <div className='relative min-h-screen'>
      <div className='bg-gray-800'>
        <Navbar />
      </div>
      <div className='bg-white'>{children}</div>
      {/* <Footer/> */}
    </div>
  );
};

export default Primary;
