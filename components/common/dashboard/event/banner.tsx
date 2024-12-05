import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { AiOutlineYoutube } from 'react-icons/ai';
import { GoLocation } from 'react-icons/go';
import { SiGooglemaps } from 'react-icons/si';
const EventBannerLayout = ({ event }: any) => {
  // timer setup

  // Renderer callback with condition

  return (
    <div className=' relative'>
      <div className='w-full -z-10 h-full '>
        <Image
          alt='cover image'
          className='object-cover w-full lg:h-full lg:max-h-450 h-[300px]'
          src={process.env.NEXT_PUBLIC_SERVER_HOST + event.cover}
          width={1940}
          height={1080}
        ></Image>
      </div>

      <div className='z-[2000] flex h-full w-full bg-transparent justify-start space-x-5 lg:space-x-10 items-center  absolute top-0 p-4'>
        <div className='hidden lg:block z-[2000] mt-6'>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_HOST + event.thumb}
            alt='thumb image'
            className='object-cover max-h-[250px] max-w-[300px] xl:max-w-[450px] rounded-md z-[2000]'
            width='450'
            height='250'
          />
        </div>
        <div className=' col-span-2 z-[2000] max-w-[600px]  text-white flex flex-col space-y-3 justify-start items-start'>
          <h4 className='ui_title  text-white'>{event.name}</h4>
          <div>
            <p className='lg:my-4 my-2 hidden 2xl:block text-gray-200 text-start text-lg'>
              {event.description}
            </p>
            <p className='lg:py-2 py-0 text-brand_color text-sm lg:text-lg font-semibold'>
              <span className='text-white'>Opening:&nbsp; </span>
              {format(new Date(event.eventTime), "Pp")} 
            </p>
            <p className='lg:py-2 py-0 text-brand_color  text-sm lg:text-lg font-semibold'>
              <span className='text-white'>Closing:&nbsp; </span>
              {format(new Date(event.eventEndTime), "Pp")}
            </p>
          </div>
          <div className='flex items-center justify-start space-x-3'>
            <p>

              <span className='text-blue-500 text-sm lg:text-md'>
                <a target='blank' href={event.videoTrailer} className=' flex justify-start items-center space-x-2'> <span><AiOutlineYoutube className='text-white w-4 h-4' /></span>  <span>  Event Trailer </span> </a>
              </span>
            </p>
            <p>

              <span className='text-blue-500  text-sm lg:text-md'>
                <a target='blank' href={event.googleMapLink} className='flex justify-start items-center space-x-2'><span><SiGooglemaps className='text-white w-4 h-4' /></span> <span>Google Map Link</span> </a>
              </span>
            </p>
          </div>

          <div className='lg:py-2 py-0 text-sm lg:text-xl w-max flex space-x-2 justify-start items-center bg-transparent cursor-pointer  text-white  font-semibold'>
            <GoLocation className='w-4 h-4' /> <span> {event.venue}</span>
          </div>
        </div>
      </div>
      <div className='event_detail_banner h-200 lg:h-full'></div>
    </div>
  );
};

export default EventBannerLayout;
