import FeaturedEvent from '@/components/home/featuredEvent';
import Footer from '@/components/home/footer';
import UpcomingEvents from '@/components/home/upcomingEvents';
import React from 'react';
import Banner from './banner';
import EventDescription from './eventDescription';

const EventDetails = ({ event, featuredEvents, upcomingEvents }: any) => {
  return (
    <div>
      <div className='h-full w-full relative  bg-black text-center'>
        <Banner event={event} />
        <div className='w-full h-full bg-neutral-900 pt-4'>
          <EventDescription event={event}></EventDescription>
          {upcomingEvents.length > 0 && (
            <UpcomingEvents events={upcomingEvents} />
          )}
          <FeaturedEvent events={featuredEvents} />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
