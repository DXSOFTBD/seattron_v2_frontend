import { ticketSlider } from '@/components/common/slider/settings';
import React, { useRef } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import Slider from 'react-slick';

const TicketPerks = ({ event }: any) => {
  const slider: any = useRef();
  const next = () => {
    slider.current.slickNext();
  }; // connecting slider with right arrow  function

  const previous = () => {
    slider.current.slickPrev();
  }; // connecting slider with left arrow  function;

  return (
    <div className=' my-6 p-4  md:p-20 lg:p-0  max-w-[1050px] mx-auto font-lato tickets_perks relative'>
      <p className='ui_title text-brand_color'>TICKET DETAILS</p>
      <div className='tickets_perks my-4'>
        {event.tickets.length < 4 ? (
          <div className='flex md:flex-row space-x-2 md:space-x-4 space-y-4 lg:space-y-0 flex-wrap justify-center w-full h-full'>
            {event.tickets.map((ticket: any) => (
              <div
                className='text-white bg-gray-900 h-[320px] lg:h-350 w-255 rounded-md relative overflow-hidden'
                key={ticket._id}
              >
                {ticket.price === 0 &&
                  <div className='w-[120px] h-[120px] font-bold absolute -top-10 -right-8  rotate-[340deg]  magicpattern_user flex_center text-white'> <span> Free!</span></div>
                }
                <div className='bg-brand_gradient p-2 text-white rounded-t-md'>
                  <p className='ui_title'>{ticket.package}</p>
                  <p className='ui_title'>BDT {ticket.price}</p>
                </div>
                <div className='text-start rich_text'>
                  <div dangerouslySetInnerHTML={{ __html: ticket.details }} />
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <Slider {...ticketSlider} ref={(c: any) => (slider.current = c)}>
          {event.tickets.length > 3
            ? event.tickets.map((ticket: any) => (
              <div
                className='text-white bg-gray-900 h-400 lg:h-350 rounded-md relative overflow-hidden'
                key={ticket._id}
              >
                {ticket.price === 0 &&
                  <div className='w-[120px] h-[120px] font-bold absolute -top-10 -right-8  rotate-[340deg]  magicpattern_user flex_center text-white'> <span> Free!</span></div>
                }
                <div className='bg-brand_gradient p-2 text-white h-auto rounded-t-md'>
                  <p className='ui_title'>{ticket.package}</p>
                  <p className='ui_title'>BDT {ticket.price}</p>
                </div>
                <div className='text-start text-sm lg:text-md rich_text'>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: ticket.details,
                    }}
                  />
                </div>
              </div>
            ))
            : null}
        </Slider>
      </div>

      {/* <div
        onClick={next}
        className='h-8 w-8 top-1/2 absolute right-1 md:right-4 lg:right-8 2xl:right-32  cursor-pointer text-2xl font-semibold bg-transparent text-white  hover:text-brand_color   '
      >
        <IoIosArrowForward />
      </div>
      <div
        onClick={previous}
        className='h-4 w-8 absolute top-1/2 left-1 md:left-8 lg:left-8 2xl:left-32  cursor-pointer text-2xl font-semibold bg-transparent text-white  hover:text-brand_color'
      >
        <IoIosArrowBack />
      </div> */}
    </div>
  );
};

export default TicketPerks;
