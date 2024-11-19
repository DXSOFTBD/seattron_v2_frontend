import React, { useRef, useState } from 'react';
import { eventCategory } from '../../lib/db';

import EventCategoryCard from './eventCategoryCard';

// slider settings
const EventCategory = () => {
  return (
    <div className='bg-white  py-2 lg:py-10 px-2 lg:px-10 xl:px-0 w-full h-full text-center relative px-auto '>
      <main className=' max-w-[1200px] mx-auto '>
        <div>
          <p className='ui_title text-brand_color'>EVENTS CATEGORY</p>
          <p className='text-black text-md lg:text-lg font-lato'>
            Here is the list of event category
          </p>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mt-8 '>
          {eventCategory.length
            ? eventCategory.map((event) => (
              <EventCategoryCard key={event._id} event={event} />
            ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default EventCategory;
