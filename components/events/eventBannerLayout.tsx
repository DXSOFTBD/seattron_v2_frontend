import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Countdown from 'react-countdown';
import { BsFillPlayCircleFill } from 'react-icons/bs';
import { IoLocationOutline } from 'react-icons/io5';
const EventBannerLayout = ({ event, page }: any) => {
  // timer setup
  const [showTrailer, setShowTrailer] = useState(false);
  const CompletionList = () => (
    <span className='event_banner_title text-brand_color mt-2 '>
      You are good to go!
    </span>
  );

  // Renderer callback with condition
  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <CompletionList />;
    } else {
      // Render a countdown
      return (
        <div className='flex justify-center items-center space-x-2 text-white'>
          <span className='text-center'>
            <p className='event_banner_title'>{days} : </p>
            <small>Days</small>
          </span>
          <span className='text-center'>
            <p className='event_banner_title'>{hours} : </p>
            <small>Hours</small>
          </span>
          <span className='text-center'>
            <p className='event_banner_title'>{minutes} : </p>
            <small>Min.</small>
          </span>
          <span className='text-center'>
            <p className='event_banner_title'>{seconds} </p>
            <small>Sec.</small>
          </span>
        </div>
      );
    }
  };
  return (
    <div className='relative h-auto lg:h-[550px] flex flex-col justify-center items-center'>
      <div className='absolute top-0 object-cover h-200 lg:max-h-[550px] w-full'>
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_HOST + event.cover}
          alt='cover image'
          className='object-cover h-200  lg:h-[550px] min-h-200 w-full'
          width='1920'
          height='550'
        />
      </div>
      {/* desktop view */}
      <div className='hidden lg:flex justify-center items-start space-x-20 z-10 lg:z-1000  mx-auto'>
        <div className='z-1000 text-center relative'>
          <Image
            src={process.env.NEXT_PUBLIC_SERVER_HOST + event.thumb}
            alt='thumb image'
            className='object-cover max-h-[250px] max-w-[450px] rounded-md'
            width='450'
            height='250'
          />
          <div className='absolute -bottom-12 left-[35%]'>
            {event.videoTrailer ? (
              <div
                onClick={() => setShowTrailer(!showTrailer)}
                className='bg-gray-800 mx-auto h-12 w-200 lg:w-[200px] rounded-md   cursor-pointer border-[1px] border-brand_color  z-[2000] text-white flex justify-center -mb-6  mt-4 items-center space-x-4'
              >
                <BsFillPlayCircleFill className='h-6 w-6' />
                <p className=''>Play Event Trailer </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className=' col-span-2 h-full max-w-[700px] lg:min-w-[400px] text-white flex flex-col justify-center items-start z-10 lg:z-1000'>
          <h4 className='event_banner_title text-white'>{event.name}</h4>
          <div>
            <p className='text-brand_color ui_subtitle'>
              {format(new Date(event.eventTime), "MMM dd 'at' hh:MM a")}
            </p>
          </div>

          {event.isPrivate ? null : <div className='ui_subtitle text-white flex items-center justify-center space-x-1'>
            <span>
              <IoLocationOutline />
            </span>
            <span>{event.venue}</span>
          </div>}


          <div className=' text-white'>
            <Countdown date={event.eventTime} renderer={renderer} />
          </div>
          {event.isPrivate ? null : <Link href={`/events/${event.slug}`}>
            <button className='py-2 px-3 my-3 text-white text-md w-max bg-transparent cursor-pointer border-[1px] border-brand_color rounded-md  hover:bg-brand_color font-semibold'>
              Buy Tickets
            </button>
          </Link>}

        </div>
        <div className='event_detail_banner hidden lg:block '></div>
      </div>
      {/* mobile view */}
      <div className='grid lg:hidden grid-cols-1 gap-14 text-white md:p-20 lg:p-0 w-full z-10 lg:z-1000 max-w-[1200px] mx-auto  lg:max-h-200'>
        <div className='z-20'>
          <div className='min-h-200 text-center'>
            <div className='w-full text-center my-2 pt-10'>
              <Countdown date={event.eventTime} renderer={renderer} />
            </div>
          </div>

          <div className='grid grid-cols-2 gap-2 p-4 -mt-24'>
            <div className='z-10'>
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_HOST + event.thumb}
                alt='thumb image'
                className='object-cover max-h-[120px] -z-10 rounded-md'
                width='300'
                height='200'
              />
              <div className='w-full text-center'>
                {event.videoTrailer ? (
                  <div
                    onClick={() => setShowTrailer(!showTrailer)}
                    className='bg-gray-800 h-8 w-[120px] border-[1px] mx-auto border-brand_color  cursor-pointer rounded z-[2000] text-white flex justify-center mt-2 items-center space-x-2'
                  >
                    <BsFillPlayCircleFill className='h-4 w-4' />
                    <p className='text-[12px] md:text-sm'>Event Trailer </p>
                  </div>
                ) : null}
              </div>
            </div>
            <div className='text-start '>
              <h4 className='event_banner_title text-start font-gotham '>
                {event.name}
              </h4>
              <div>
                <p className='text-brand_color event_banner_subtitle'>
                  {format(new Date(event.eventTime), "MMM dd 'at' hh:MM a")}
                </p>
              </div>

              <div className='text-md w-full bg-transparent cursor-pointer event_banner_subtitle  text-white'>
                {event.venue}
              </div>
            </div>
          </div>
        </div>
        <div className='event_detail_banner h-200 lg:h-full'></div>
      </div>
    </div>
  );
};

export default EventBannerLayout;
