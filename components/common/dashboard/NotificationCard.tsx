import { format } from 'date-fns';
import React from 'react';

const NotificationCard = ({ data, handleReadNotification }: any) => {
  return (
    <div className='border-[1px] border_brand_color my-2 shadow-sm relative'>
      <div
        className={` ${
          data.read === true ? 'bg-[#e1e1e1] text-black' : 'bg-brand_gradient'
        }  px-4 py-2 flex justify-between items-center relative  text-lg`}
      >
        <p> {data.title}</p>
        {data.read === true ? null : (
          <p
            className='text-[12px] text-white absoulute top-2 right-2 cursor-pointer'
            onClick={() => handleReadNotification(data._id)}
          >
            Mark as read
          </p>
        )}
      </div>
      <div
        className={`flex justify-between items-center bg-white${
          data.read === true ? 'bg-white text-[#7f7f7f]' : 'text-black'
        }  text-sm py-2 px-4`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: data.message,
          }}
        />
        {data.createdAt ? (
          <div className='text-[10px] px-4 h-full'>
            <div className=''>{format(new Date(data.createdAt), 'Pp')}</div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default NotificationCard;
