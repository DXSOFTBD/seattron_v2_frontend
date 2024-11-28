import React from 'react';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { CgDanger } from 'react-icons/cg';
const Layout = dynamic(import('@/components/layouts/Primary'));

const Failed = () => {
  return (
    <div className='w-full h-full flex justify-center text-black items-center min-h-[90vh]'>
      <div className='bg-gray-50 shadow-md rounded-md text-center h-[400px] w-[500px] p-6 flex justify-center items-center'>
        <div>
          <div>
            <p className='text-2xl font-bold text-red-500'>OOPS!</p>
            <p className='text-lg font-semibold text-gray-700 my-2'>
              Something went wrong
            </p>
          </div>
          <CgDanger className='h-12 w-12 text-red-600 mx-auto px-auto my-2' />
          <div>
            <p>We could not book your ticket</p>
            <small>please try again</small>
          </div>
          <Link href='/events'>
            <button className='bg-gray-500  px-3 py-2 text-white cursor-pointer rounded-md my-6'>
              {`  Try Again`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
Failed.Layout = Layout;
export default Failed;
