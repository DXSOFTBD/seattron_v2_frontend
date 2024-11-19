import Image from 'next/image';
import React, { useState } from 'react';

const EventCategoryCard = ({ event }: any) => {
  const { image, name } = event;

  const [textVisible, setVisiblity] = useState(false);

  return (
    <div
      className='h-full w-full relative cursor-pointer event_category  grayscale hover:grayscale-0 transition z-50 delay-150 duration-300 ease-in-out'
      onMouseMove={() => setVisiblity(true)}
      onMouseLeave={() => setVisiblity(false)}
    >
      <div className=' h-full w-full'>
        <Image
          src={image}
          alt='name'
          className='object-cover  rounded-md'
          width='193'
          height='291'
        ></Image>
      </div>
      <div
        className={`absolute ml-auto left-0  bottom-16 right-0 mr-auto transition z-50 delay-150 duration-300 ease-in-out ${
          textVisible ? 'opacity-0' : 'opacity-1 '
        }`}
      >
        <p className='text-xl text-white category_name border-b-2 w-max mx-auto pb-2 border-white'>
          {name}
        </p>
      </div>
    </div>
  );
};

export default EventCategoryCard;
