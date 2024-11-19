import { format } from 'date-fns';
import { eventCategory } from 'lib/db';
import React, { useState } from 'react';

const EventDescription = ({ event }: any) => {
  const [description, setDescription] = useState(event?.details?.slice(0, 500));

  return (
    <div className='grid grid-cols-1 text-gray-200 text-center w-full rounded-md py-6 p-4'>
      <div className='lg:w-[1050px]  w-full text-center mx-auto px-auto rounded-md'>
        <p className='ui_title text-brand_color'>EVENT DETAILS</p>
        <div className='bg-gray-700 w-full text-gray-50 p-6 rounded-md text-center'>
          <div className='flex flex-col space-y-3 items-start  justify-start'>
            <p>
              Event Name:{''} {event.name}
            </p>
            <p>
              Date:{''}{' '}
              {format(new Date(event.eventTime), "MMM dd 'at' hh:MM a")}
            </p>
            <p>
              Duration:{''} {event.duration}
            </p>
            <p>
              location:{''} {event.venue}
            </p>
            <div className='text-start text-gray-200'>
              <p className='font-semibold text-gray-200 text-lg'>
                Description:{''}
              </p>
              <span
                className='text-sm px-2 text-gray-200 pt-3'
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            </div>
          </div>
          {description && (
            <div>
              <p
                onClick={() =>
                  setDescription(
                    description.length > 500
                      ? event.details.slice(0, 500)
                      : event.details
                  )
                }
                className='px-2 py-1 text-gray-200 text-sm rounded-md cursor-pointer bg-gray-900 w-max mx-auto mt-3'
              >
                {description.length > 500 ? <p>See less </p> : <p>See more</p>}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDescription;
