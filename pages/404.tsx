import Footer from '@/components/home/footer';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import React from 'react';
import { BiSad } from 'react-icons/bi';
const Layout = dynamic(import('@/components/layouts/Primary'));

const NotFound = () => {
  return (
    <div className='h-full w-full'>
      <div className='h-400 w-full flex justify-center items-center'>
        <div className='text-center'>
          <BiSad className='w-16 h-16 mx-auto my-2 text-gray-500' />
          <p className='md:text-5xl text-2xl font-bold my-2 text-black'>
            Page Not Found!
          </p>
          <p className='text-gray-400 my-2'>
            we are sorry, the page you requested could not be found <br />
            Please go back to the homepage
          </p>
          <Link href='/'>
            <button className='bg-brand_gradient rounded px-4 py-2 my-4 transition-all duration-300 hover:-translate-y-1 hover:bg-brand_color'>
              BACK TO HOMEPAGE
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};
NotFound.Layout = Layout;
export default NotFound;
