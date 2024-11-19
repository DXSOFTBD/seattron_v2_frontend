import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { upcomingEvents } from '../common/slider/settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import UpcomingEventCard from './upcomingCategoryCard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';


const UpcomingEvents = ({ events }: any) => {
  const slider: any = useRef();
  const next = () => {
    slider.current.slickNext();
  }; // connecting slider with right arrow  function

  const previous = () => {
    slider.current.slickPrev();
  }; // connecting slider with left arrow  function

  function repeatArray(arr: any) {
    const repeatedArr = [];
    const repeats = Math.ceil(4 / arr.length);

    for (let i = 0; i < repeats; i++) {
      repeatedArr.push(...arr);
    }

    return repeatedArr.slice(0, 4);
  }
  const data: any = events.length < 4 ? repeatArray(events) : events;

  return (
    <div
      className={`text-center pt-2 lg:pt-16 pb-10 relative 2xl:pt-24 bg-white text-black mt `}
    >
      <div className='upcoming_banner'></div>

      <div className='relative pt-6 lg:pt-16 z-50 max-w-[1200px] mx-auto'>
        <Link href='/events'>
          <p className='ui_title text-brand_color'>UPCOMING EVENTS</p>
          <p className='text-black  mb-12 text-md lg:text-lg font-lato'>
            Here is the list of upcoming events
          </p>
        </Link>
        <div className='my-2 mx-0 z-50'>
          <Slider {...upcomingEvents} ref={(c: any) => (slider.current = c)}>
            {data?.length
              ? data.map((event: any) => (
                <UpcomingEventCard key={event.slug} event={event} />
              ))
              : null}
          </Slider>
        </div>
        <div className='absolute top-[85px] md:top-20 lg:top-28 right-2 md:right-8  flex space-x-3'>
          <div
            onClick={previous}
            className='w-6 h-6 lg:h-8 lg:w-8 rounded-full flex justify-center cursor-pointer text-xl items-center bg-transparent text-brand_color border-2 hover:text-white hover:bg-brand_color border-brand_color hover:border-white'
          >
            <IoIosArrowBack className='h-4 w-4 lg:h-6 lg:w-6' />
          </div>
          <div
            onClick={next}
            className='w-6 h-6 lg:h-8 lg:w-8 flex justify-center items-center cursor-pointer text-xl hover:bg-brand_color rounded-full bg-transparent text-brand_color hover:text-white border-2 border-brand_color hover:border-white'
          >
            <IoIosArrowForward className='h-4 w-4 lg:h-6 lg:w-6' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
