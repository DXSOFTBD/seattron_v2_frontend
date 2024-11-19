import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { FaUserLock } from 'react-icons/fa';

const FeaturedEventCard = ({ event }: any) => {
  const { thumb, name, venue, minPrice, slug, isPrivate } = event;

  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push(`/events/${slug}`);
      }}
      className='w-full h-full text-start'
    >
      <div className='h-full w-full relative cursor-pointer '>
        <div className='h-max w-full max-h-[140px] md:max-h-[186px] lg:max-h-[205px] overflow-hidden'>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_HOST + thumb}
            alt={name}
            className='object-cover h-full w-full rounded-t-lg '
            height='200'
            width='350'
          ></Image>
        </div>

        <div
          className={`px-4 py-1 bg-gray-800 text-white rounded-b-lg min-h-[110px] lg:min-h-[125px]
         
          `}
        >
          <div className='hidden lg:block'>
            <div className='flex justify-start items-center space-x-2'>
              {isPrivate ? <FaUserLock className='text-white w-6 h-6' /> : null}
              <p className='ui_subtitle'>
                {name.length > 30 ? <span>{name.slice(0, 30)}... </span> : name}
              </p>
            </div>

            <p className='text-[12px] md:text-md lg:text-lg text-white'>
              {venue ? venue.length > 30 ? (
                <span>{venue.slice(0, 30)}... </span>
              ) : (
                venue
              ) : null}
            </p>
          </div>
          <div className='lg:hidden block'>
            <div className='flex justify-start items-center space-x-2'>
              {isPrivate ? <FaUserLock className='text-white w-6 h-6' /> : null}
              <p className='ui_subtitle'>
                {name.length > 20 ? <span>{name.slice(0, 20)}... </span> : name}
              </p>
            </div>
            <p className='text-[12px] md:text-md lg:text-lg text-white'>
              {venue ? venue?.length > 20 ? (
                <span>{venue?.slice(0, 20)}... </span>
              ) : (
                venue
              ) : null}
            </p>
          </div>

          {
            isPrivate ? null :
              <div>


                {minPrice === 0 ? <p className='ui_subtitle text-brand_color py-1'>
                  Free!
                </p> : <p className='ui_subtitle text-brand_color py-1'>
                  From BDT {minPrice}
                </p>}  </div>

          }


        </div>
      </div>
    </div>
  );
};

export default FeaturedEventCard;
