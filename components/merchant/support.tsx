import Image from 'next/image';
import React from 'react';

const Support = () => {
  return (
    <div className='p-4 w-full h-full rounded-md flex justify-center items_center '>
      <div className='flex flex-col items-start justify-center'>
        <h2 className='text-4xl font-bold mb-4'>Need Some Help?</h2>
        <p className='mb-2'>
          For any technical issues or support, please <br /> contact our
          technical person:
        </p>
        <p className='font-semibold mb-2'>John Doe</p>
        <p>Email: john.doe@example.com</p>
        <p>Phone: (555) 123-4567</p>
      </div>
      <Image
        src={'/assets/images/support.jpg'}
        alt='support'
        width={500}
        height={500}
      />
    </div>
  );
};

export default Support;
