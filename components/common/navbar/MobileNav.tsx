import React from 'react';
import Link from 'next/link';
import { AiOutlineClose } from 'react-icons/ai';
const MobileNav = ({ handleMobileMenu, isOpenMobileMenu }: any) => {
  return (
    <div
      className={`h-screen  mobile_navigation absolute right-0 top-0 bg-gray-900 transition-all duration-1000 z-[2000] ${
        isOpenMobileMenu ? 'w-screen' : 'w-0'
      }`}
    >
      <div
        className={`text-white float-right m-4 text-2xl ${
          isOpenMobileMenu ? 'visible' : 'invisible'
        }`}
        onClick={() => handleMobileMenu()}
      >
        <AiOutlineClose />
      </div>
      <div className='text-md overflow-hidden w-full '>
        <ul className='mob_navbar flex h-full justify-start mx-6 flex-col lg:ml-6 space-y-6 text-md font-medium text-white'>
          <li className='cursor-pointer text-brand_color'>
            <Link href='/'>Home</Link>
          </li>
          <li className='cursor-pointer'>
            <Link href='/events'>Events</Link>
          </li>
          <li className='cursor-pointer'>
            <Link href='/about-us'>About</Link>
          </li>

          <li className='w-full  bg-brand_color text-center text-xl rounded-md py-2 '>
            <Link href='/login'>
              <button> Login/Sign Up</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
