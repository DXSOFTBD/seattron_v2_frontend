import React from 'react';
import PreviousEventCard from './previousEventCard';

// slider settings
const PreviousEvents = ({ events }: any) => {

  return (
    <div
      className={`bg-white py-2 lg:py-12 px-2 lg:px-10 xl:px-0 w-full h-full text-center relative  mx-auto max-w-[1200px]`}
    >
      <main className=''>
        <div>
          <p className='ui_title text-brand_color'>PREVIOUS EVENTS</p>
          <p className='text-black  mb-4 text-md lg:text-lg font-lato'>
            Here is the list of previous events
          </p>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-6 mt-8'>
          {events.length
            ? events
              .slice(0, 4)
              .map((event: any) => (
                <PreviousEventCard key={event.slug} event={event} />
              ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default PreviousEvents;
