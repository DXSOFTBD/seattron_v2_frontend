import Image from 'next/image';
import React, { useState } from 'react';

const EventLineupCard = ({ team }: any) => {
  const { thumb, caption } = team;
  return (
    <div className='overflow-hidden w-full h-full  mx-auto px-auto relative cursor-pointer event_lineup rounded-md'>
      <div className='h-full w-full'>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_HOST + thumb}
          alt='name'
          className='object-cover lineup_image rounded-md w-full h-full transition ease-in-out delay-150 z-100 hover:-translate-1 hover:scale-110  duration-500 '
          width='300'
          height='200'
        ></Image>
      </div>
      <div
        className={`absolute ml-auto left-4 bottom-4 font-semibold w-max transition z-50 delay-150 duration-300 ease-in-out 
         
        }`}
      >
        <p className='text-xl text-white brand_name w-max mx-auto pb-2'>
          {caption}
        </p>
      </div>
    </div>
  );
};

export default EventLineupCard;
