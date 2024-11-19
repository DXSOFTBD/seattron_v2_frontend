import React from 'react';
import { BsCart } from 'react-icons/bs';
import { CgDollar } from 'react-icons/cg';
import { FaMoneyBillAlt } from 'react-icons/fa';

const StickerCard = ({ ticket }: any) => {

  return (
    <div className='flex flex-col w-full h-full p-7 rounded-md bg-gray-200 text-gray-800'>
      <div className='w-full flex justify-between mb-auto pb-8'>
        <div className='w-full flex flex-col'>
          <span className='text-2xl text-brand_color font-semibold mb-1'>
            {ticket.package}
          </span>
          <span className='text-xs text-body font-semibold'>
            Price: {ticket.price}
          </span>
        </div>
      </div>

      <div>
        <div className='w-full h-full'>
          <div className='flex items-center justify-start space-x-4 '>
            <p>
              <FaMoneyBillAlt className='text-brand_color h-6 w-6' />
            </p>

            <p className='py-2'>Total Sold: {ticket.analytics.totalSold}</p>
          </div>
          <div className='flex items-center justify-start space-x-4 '>
            <CgDollar className='text-brand_color h-6 w-6' />

            <p className='py-2'>
              Total Earning: {ticket.analytics.totalEarning}
            </p>
          </div>
          <div className='flex items-center justify-start space-x-4 '>
            <BsCart className='text-brand_color h-6 w-6' />
            <p className='py-2'>Total Orders: {ticket.analytics.totalOrders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerCard;
