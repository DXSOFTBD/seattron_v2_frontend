import React from 'react';
import EventLineupCard from './eventLineupCard';
// import { eventLineup } from 'lib/db';

// slider settings
const EventLineup = ({ event }: any) => {

  // console.log(event)
  return (
    <div className='bg-[#0e1112]'>
      <div className='max-w-[1050px] w-full h-full text-center px-auto mx-auto px-4 py-4 lg:px-0'>
        <main className=' max-w-[1200px] mx-auto '>
          <div>
            <p className='ui_title text-brand_color'>EVENT LINEUP</p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 mt-4 gap-4 md:gap-4 '>
            {event.lineup.length
              ? event.lineup.map((team: any) => (
                <EventLineupCard key={team._id} team={team} />
              ))
              : null}
          </div>
        </main>
      </div>
    </div>
  );
};

export default EventLineup;
