import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUpcomingEvents } from 'redux/slices/EventSlice';
import Footer from '../../home/footer';
import PreviousEvents from '../../home/previousEvents';
import AllEvents from './allEvents';
import Banner from './banner';

const Event = ({ pastEvents, upcomingEvents }: any) => {
  let featuredEvents = upcomingEvents.filter(
    (event: any) => event.isFeatured === true
  );
  return (
    <div>
      <Banner events={featuredEvents} />
      <AllEvents events={upcomingEvents} />
      {pastEvents.length ? <PreviousEvents events={pastEvents} /> : null}
      <Footer />
    </div>
  );
};

export default Event;
