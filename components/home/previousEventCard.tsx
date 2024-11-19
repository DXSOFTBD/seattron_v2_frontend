import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const PreviousEventCard = ({ event }: any) => {
  const { thumb, name, venue, eventTime, slug, isPrivate } = event;
  const router = useRouter();

  return (
    <div
      className='w-full h-full cursor-pointer'
      onClick={() => {
        router.push(`/pastEvents/${slug}`);
      }}
    >
      <div className='h-full w-full relative'>
        <div className='h-max w-full max-h-[105px] md:max-h-[135px] lg:max-h-[213px] overflow-hidden'>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_HOST + thumb}
            alt={name}
            className='object-contain h-full w-full  rounded-t-lg '
            height='200'
            width='350'
          ></Image>
        </div>

        <div
          className={`p-2 lg:p-4 bg-gray-800 rounded-b-lg text-start min-h-[110px] lg:min-h-[130px] text-white
         
          `}
        >
          <p className='ui_subtitle hidden lg:block'>
            {name.length > 30 ? <span>{name.slice(0, 30)}... </span> : name}
          </p>
          {
            isPrivate ? null :
              <div>
                <p className='ui_subtitle block lg:hidden'>
                  {name.length > 20 ? <span>{name.slice(0, 20)}... </span> : name}
                </p>
                <p className='text-[12px] lg:text-md text-gray-200 category_name  w-max  pb-2 '>
                  {format(new Date(eventTime), "MMM dd 'at' hh:MM a")}
                </p>

                <p className='text-[12px] md:text-md lg:text-lg hidden lg:block'>
                  {venue && venue.length > 30 ? <span>{venue.slice(0, 30)}... </span> : venue}
                </p>
                <p className='text-[12px] md:text-md lg:text-lg block lg:hidden'>
                  {venue && venue.length > 20 ? <span>{venue.slice(0, 20)}... </span> : venue}
                </p>
              </div>
          }

        </div>
      </div>
    </div>
  );
};

export default PreviousEventCard;
