import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

const AllEventsCard = ({ event }: any) => {
  const { thumb } = event;
  const router = useRouter();

  const [textVisible, setVisibility] = useState(false);
  return (
    <div
      className='h-full w-full relative cursor-pointer'
      onMouseMove={() => setVisibility(true)}
      onMouseLeave={() => setVisibility(false)}
    >
      <div
        onClick={() => {
          router.push(`/events/${event.slug}`);
        }}
        className='md:mx-0 h-full w-full'
      >
        <Image
          src={process.env.NEXT_PUBLIC_SERVER_HOST + thumb}
          alt='name'
          className='object-cover h-full w-full  rounded-md'
          height='450'
          width='300'
        ></Image>
      </div>
    </div>
  );
};

export default AllEventsCard;
