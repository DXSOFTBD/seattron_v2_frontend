import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import EventCard from './eventCard';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import Loader from '@/components/common/Loader';
import Link from 'next/link';
import { getAgentEvents } from 'redux/slices/EventSlice';
const Events = () => {
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const data: any = useAppSelector(
    (state) => state.eventReducer.getAgentEvents
  );
  const events = data.data.slice().sort((a: any, b: any) => {
    return new Date(a.eventTime).getTime() - new Date(b.eventTime).getTime();
  });
  const { status } = data;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentEvents(agent.token));
  }, [dispatch, agent.token]);
  const [eventType, setEventType] = useState('Upcoming');
  const dateNow = new Date().getTime();
  const allUpcomingEvents = events.filter((event: any) => {
    const endTime = new Date(event.eventEndTime).getTime();
    if (dateNow < endTime) {
      return event;
    }
  });
  const draftEvents = allUpcomingEvents.filter(
    (event: any) => event.currentStatus === 'Draft'
  );
  const featuredEvents = allUpcomingEvents.filter(
    (event: any) => event.isFeatured === true
  );
  const upcomingEvents = allUpcomingEvents.filter(
    (event: any) => event.published === true
  );

  const pastEvents = events.filter((event: any) => {
    const endTime = new Date(event.eventEndTime).getTime();
    if (dateNow > endTime) {
      return event;
    }
  });

  return (
    <Loader status={status}>
      <div className='w-full h-full font-lato'>
        <div className='flex justify-between items-center'>
          <div>
            <Link href='/merchant/dashboard/addEvents'>
              <div className='text-xl justify-center items-center flex space-x-2 mb-2 bg-brand_gradient px-4 py-2 rounded-3xl text-white w-max'>
                <p>Add Event </p> <BsPlusCircle />
              </div>
            </Link>
            <p className='dashboard_title'>Events</p>
          </div>
          <div className='flex items-center justify-center border-[1px] border-brand_color'>


            <p
              onClick={() => setEventType('Upcoming')}
              className={`md:px-4 px-2 py-1 cursor-pointer md:py-2 ${eventType === 'Upcoming'
                ? 'border-none text-white bg-brand_gradient '
                : 'bg-white border-l-[1px]  border-brand_color text-gray-900'
                }`}
            >
              Upcoming
            </p>
            <p
              onClick={() => setEventType('Featured')}
              className={`md:px-4 px-2 py-1 cursor-pointer md:py-2 ${eventType === 'Featured'
                ? 'border-none text-white bg-brand_gradient '
                : 'bg-white border-l-[1px]  border-brand_color text-gray-900'
                }`}
            >
              Featured
            </p>
            <p
              onClick={() => setEventType('Draft')}
              className={`md:px-4 px-2 py-1 cursor-pointer md:py-2 ${eventType === 'Draft'
                ? 'border-none text-white bg-brand_gradient '
                : 'bg-white border-l-[1px]  border-brand_color text-gray-900'
                }`}
            >
              Draft
            </p>
            <p
              onClick={() => setEventType('Past')}
              className={`md:px-4 px-2 py-1 cursor-pointer md:py-2 ${eventType === 'Past'
                ? 'border-none text-white bg-brand_gradient '
                : 'bg-white border-l-[1px]  border-brand_color text-gray-900'
                }`}
            >
              Past
            </p>
            <p
              onClick={() => setEventType('All')}
              className={`md:px-4 px-2 py-1 cursor-pointer md:py-2 ${eventType === 'All'
                ? 'border-none text-white bg-brand_gradient '
                : 'bg-white border-l-[1px]  border-brand_color text-gray-900'
                }`}
            >
              All
            </p>
          </div>
        </div>
        <div className=''>
          {eventType === 'Draft' ? (
            draftEvents.length ? (
              draftEvents?.map((event: any, index: any) => (
                <EventCard key={event.createdAt} event={event} index={index} />
              ))
            ) : (
              <p className='dashboard_secondary_title py-16 pl-16 '>
                No Draft Event!
              </p>
            )
          ) : null}
          {eventType === 'Featured' ? (
            featuredEvents.length ? (
              featuredEvents?.map((event: any, index: any) => (
                <EventCard key={event.createdAt} event={event} index={index} />
              ))
            ) : (
              <p className='dashboard_secondary_title py-16 pl-16 '>
                No Featured Event!
              </p>
            )
          ) : null}
          {eventType === 'Upcoming' ? (
            upcomingEvents.length ? (
              upcomingEvents?.map((event: any, index: any) => (
                <EventCard key={event.createdAt} event={event} index={index} eventType={eventType} />
              ))
            ) : (
              <p className='dashboard_secondary_title py-16 pl-16 '>
                No Upcoming Event!
              </p>
            )
          ) : null}
          {eventType === 'Past' ? (
            pastEvents.length ? (
              pastEvents?.map((event: any, index: any) => (
                <EventCard key={event.createdAt} event={event} index={index} />
              ))
            ) : (
              <p className='dashboard_secondary_title py-16 pl-16 '>
                No Past Event!
              </p>
            )
          ) : null}
          {eventType === 'All' ? (
            events.length ? (
              events?.map((event: any, index: any) => (
                <EventCard key={event.createdAt} event={event} index={index} />
              ))
            ) : (
              <p className='dashboard_secondary_title py-16 pl-16 '>
                No Event!
              </p>
            )
          ) : null}
        </div>

        <div></div>
      </div>
    </Loader>
  );
  // }
};

export default Events;
