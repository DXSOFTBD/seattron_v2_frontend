import React from 'react';

const ComingSoon = ({ children }: any) => {
  return (
    <div className='w-full h-full relative flex justify-center items-center'>
      <div className='filter blur-[2px] w-full h-[80vh]'>{children}</div>
      <p className='text-3xl lg:text-7xl font-bold text-gray-800 absolute'>
        Coming Soon...
      </p>
    </div>
  );
};

export default ComingSoon;
