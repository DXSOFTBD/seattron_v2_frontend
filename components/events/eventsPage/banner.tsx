import React, { useRef } from 'react';
import Slider from 'react-slick';
import { eventSlider } from '../../common/slider/settings';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import EventBannerLayout from '../eventBannerLayout';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const Banner = ({ events }: any) => {
  const slider: any = useRef();
  const next = () => {
    slider.current.slickNext();
  }; // connecting slider with right arrow  function

  const previous = () => {
    slider.current.slickPrev();
  }; // connecting slider with left arrow  function;

  return (
    <div className='h-full w-full relative bg-black text-center event_page'>
      <Slider {...eventSlider} ref={(c: any) => (slider.current = c)}>
        {events.length
          ? events.map((event: any) => (
            <div className='' key={event.slug}>
              <EventBannerLayout event={event} page='eventsPage' />
            </div>
          ))
          : null}
      </Slider>
      <div
        onClick={next}
        className='h-8 w-8 top-24 lg:top-1/2 absolute right-1 md:right-4 lg:right-8 2xl:right-32  cursor-pointer text-2xl font-semibold bg-transparent text-white  hover:text-brand_color   '
      >
        <IoIosArrowForward />
      </div>
      <div
        onClick={previous}
        className='h-4 w-8 absolute top-24 lg:top-1/2 left-1 md:left-8 lg:left-8 2xl:left-32  cursor-pointer text-2xl font-semibold bg-transparent text-white  hover:text-brand_color'
      >
        <IoIosArrowBack />
      </div>
    </div>
  );
};

export default Banner;
