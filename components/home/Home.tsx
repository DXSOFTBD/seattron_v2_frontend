import React from 'react';
import Banner from './banner';
import EventsCategory from './EventCategory';
import FeaturedEvent from './featuredEvent';
import Footer from './footer';
import PreviousEvents from './previousEvents';
import UpcomingEvents from './upcomingEvents';
import { GoogleAnalytics } from '@next/third-parties/google';
import { fbEvents } from '../utils/analytics';

const Home = ({ upcomingEvents, pastEvents }: any) => {
  let featuredEvents = upcomingEvents.filter(
    (event: any) => event.isFeatured === true
  );
  // console.log(upcomingEvents)
  return (
    
    <main className='bg-white text-center px-auto mx-auto'>
      <GoogleAnalytics gaId="G-4CYE7CPGHN" />
      
      <Banner />

      {featuredEvents.length > 0 && (
        <FeaturedEvent bg={true} events={featuredEvents} />
      )}
      {upcomingEvents.length > 0 && <UpcomingEvents events={upcomingEvents} />}
      <EventsCategory />
      {pastEvents.length > 0 && <PreviousEvents events={pastEvents} />}
      <Footer />
    </main>
  );
};

export default Home;
