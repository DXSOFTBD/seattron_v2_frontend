'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import {
  MdMoney,
  MdOutlineProductionQuantityLimits,
  MdReport,
  MdSell,
} from 'react-icons/md';

const Tab = () => {
  const items = [
    {
      name: 'Profile',
      path: 'profile',
      icon: MdSell,
    },
    {
      name: 'History',
      path: 'history',
      icon: MdOutlineProductionQuantityLimits,
    },
    {
      name: 'Attended Events',
      path: 'attended-events',
      icon: MdReport,
    },
    {
      name: 'Download Tickets',
      path: 'download-tickets',
      icon: MdMoney,
    },
  ];
  const router = useRouter();
  const { asPath } = router;

  return (
    <div
      className={`w-[200px] block border-gray-100 pl-primary py-primary bg-brand_gradient rounded-md
    
      transition-all duration-200 h-screen text-black p-2`}
    >
      <div>
        {items.map((item) => (
          <Link
            href={`/dashboard/#${item.path.toLowerCase()}`}
            className='relative rounded-l-lg'
            key={item.name}
          >
            <div
              className={`flex  items-center justify-start space-x-2 px-2 py-2 relative cursor-pointer hover:bg-white hover:text-black  ${
                asPath.includes(item.path.toLowerCase())
                  ? 'relative active_menu bg-white text-black rounded-l-lg'
                  : ' menu'
              }`}
            >
              <item.icon
                className={`  ${
                  asPath.includes(item.path.toLowerCase())
                    ? 'active_menu_icon'
                    : ' menu_icon'
                }`}
              />
              <p className='paragraph'>{item.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tab;
