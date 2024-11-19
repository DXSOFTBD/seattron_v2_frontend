import React, { useRef } from 'react';
import Slider from 'react-slick';
import { trendingEvents } from '../common/slider/settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Link from 'next/link';
import FeaturedEventCard from './featuredEventCard';

const FeaturedEvent = ({ events, bg }: any) => {
  const slider: any = useRef();

  const next = () => {
    slider.current.slickNext();
  }; // connecting slider with right arrow  function

  const previous = () => {
    slider.current.slickPrev();
  }; // connecting slider with left arrow  function
  // const newData = [...data, ...data];

  function repeatArray(arr: any) {
    const repeatedArr = [];
    const repeats = Math.ceil(7 / arr.length);

    for (let i = 0; i < repeats; i++) {
      repeatedArr.push(...arr);
    }

    return repeatedArr.slice(0, 4);
  }
  const featuredEvents: any = events.length < 4 ? repeatArray(events) : events;

  return (
    <div
      className={`text-center -mt-[1px] lg:-mt-0 pb-6 relative ${bg ? 'bg-[#111111] pt-2' : 'bg-white pt-6'
        }   ${events?.length ? 'block' : 'hidden'}`}
    >
      <div className={`relative z-50 text-center`}>
        <Link href='/events'>
          <p className='ui_title text-brand_color'>TRENDING EVENTS</p>
          <p
            className={`${bg ? 'text-white' : 'text-black'
              }   text-md lg:text-lg font-lato`}
          >
            Here is the list of trending events
          </p>
        </Link>
        <div className='my-16   lg:mx-12 xl:mx-32 2xl:mx-auto max-w-[1500px]'>
          <Slider {...trendingEvents} ref={(c: any) => (slider.current = c)}>
            {featuredEvents?.length
              ? featuredEvents.map((event: any) => (
                <FeaturedEventCard key={event.slug} event={event} />
              ))
              : null}
          </Slider>
        </div>
        <div className='absolute top-20 lg:top-20 right-2 md:right-8 xl:right-32 2xl:right-48 flex space-x-3'>
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

export default FeaturedEvent;
