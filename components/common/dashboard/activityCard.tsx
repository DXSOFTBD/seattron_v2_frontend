import { format } from 'date-fns';
import React from 'react';

const ActivityCard = ({ data }: any) => {
  return (
    <div className='bg-gray-100 text-gray-900 flex justify-between items-center rounded-md my-3 w-full shadow-md text-md py-1 font-medium px-4'>
      <div className='flex justify-between items-center w-full'>
        <div
          className='text-sm py-2'
          dangerouslySetInnerHTML={{
            __html: data.msg,
          }}
        />
        {data.date ? (
          <p className='text-[12px] text-gray-600'>
            {format(new Date(data.date), 'Pp')}
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default ActivityCard;
