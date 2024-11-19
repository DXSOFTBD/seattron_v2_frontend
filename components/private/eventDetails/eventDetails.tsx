import FeaturedEvent from '@/components/home/featuredEvent';
import Footer from '@/components/home/footer';
import UpcomingEvents from '@/components/home/upcomingEvents';
import React, { useEffect, useState } from 'react';
import Banner from './banner';

import EventDescription from './eventDescription';
import TicketOrderForm from './ticketOrderForm';
import TicketPerks from './ticketPerks';
import EventLineup from './eventLineup';
import { useRouter } from 'next/router';
import { PrivateEventBySlug, upcomingEvents } from 'lib/fetchData';
import '../../../styles/home/Home.module.css'
import { CgDanger } from 'react-icons/cg';
import Link from 'next/link';

const EventDetails = () => {
  const [upcomingEvent, setUpcomingEvent] = useState<any>()
  const [featuredEvent, setFeaturedEvent] = useState<any>()
  const [event, setEvent] = useState<any>()
  const router = useRouter()
  const { query } = router
  useEffect(() => {
    const fetchData = async () => {
      const upEvent = await upcomingEvents();
      setUpcomingEvent(upEvent)
      let fEvent = upEvent.filter((event: any) => event.isFeatured === true);
      setFeaturedEvent(fEvent)
      const pEv = await PrivateEventBySlug(query.slug);
      setEvent(pEv)
    }
    fetchData()
  }, [query.slug])
  return (
    <div>
      <div className='h-full w-full relative  bg-neutral-900 text-center'>
        {
          event ?
            <div className='w-full h-full'>
              {
                event?.name ? <Banner event={event} /> : null
              }
              {event?.tickets?.length && <TicketPerks event={event} />}
              {event?.tickets?.length && <TicketOrderForm event={event} />}
              {event?.name ? <EventDescription event={event}></EventDescription> : null}

              {event?.lineup ? <EventLineup event={event} /> : null}

            </div> : <div className='h-[100vh] lg:h-[60vh] child_center'>
              <div className='bg-gray-50 shadow-md rounded-md text-center h-[400px] w-[500px] p-6 flex justify-center items-center'>
                <div>
                  <div>
                    <p className='text-2xl font-bold text-red-500'>OOPS!</p>
                    <p className='text-lg font-semibold text-gray-700 my-2'>
                      Something went wrong
                    </p>
                  </div>
                  <CgDanger className='h-12 w-12 text-red-600 mx-auto px-auto my-2' />

                  <Link href='/events'>
                    <button className='bg-gray-500  px-3 py-2 text-white cursor-pointer rounded-md my-6'>
                      {`  Try Again`}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
        }

        {upcomingEvent?.length > 0 && (
          <UpcomingEvents events={upcomingEvent} />
        )}
        {featuredEvent?.length > 0 && (
          <FeaturedEvent events={featuredEvent} />
        )}
        <Footer />

        <div>

        </div>

      </div>
    </div>
  );
};

export default EventDetails;
