import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { BsCart } from 'react-icons/bs';
import { CgDollar } from 'react-icons/cg';
import { FaMoneyBillAlt } from 'react-icons/fa';
import { RxUpdate } from 'react-icons/rx';

const StickerCard = ({ ticket, agent }: any) => {
  // console.log(ticket)
  return (
    <div className='flex flex-col w-full h-full p-6 relative overflow-hidden rounded-md bg-gray-200  text-gray-800'>
      {ticket.price === 0 &&
        <div className='w-[120px] h-[120px] font-bold absolute -top-8 -right-8 rotate-[320deg]  magicpattern_user flex_center text-white'> <span> Free!</span></div>
      }
      <div className='w-full flex justify-between mb-auto pb-8'>
        <div className='w-full flex flex-col'>
          <div className='flex justify-between items-center'>

            <div className='flex justify-start items-center space-x-2'>

              <span className='text-2xl text-brand_color font-semibold mb-1'>
                {ticket.package}
              </span>
              {agent && (
                <Link
                  href={`/merchant/dashboard/update-ticket/${ticket._id}`}
                  className='text-white shadow-md bg-green-600 rounded-md px-2 py-1 flex items-center space-x-1 justify-center'
                >
                  <RxUpdate /> <span>Update</span>
                </Link>
              )}
            </div>


          </div>

          <div className='text-[12px] text-gray-800'>
            <p> Price: {ticket.price} </p>
            <p> Limit: {ticket.limit}</p>
            <div className=''>
              Created At:&nbsp;
              {format(new Date(ticket?.createdAt), "MMM dd 'at' hh:MM a")}
            </div>
          </div>
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
