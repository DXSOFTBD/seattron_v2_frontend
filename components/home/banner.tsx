import Image from 'next/image';
import React from 'react';
import banner from '/public/assets/background/home_banner.jpg';
import logo from '/public/assets/logo/logo web header-02.svg';
// import shadow from '/public/assets/logo/shadow.png';
import Link from 'next/link';

const Banner: React.FC = () => {
  return (
    <div className='h-full w-full relative -mt-16 text-center home_banner'>
      <div className='w-full '>
        <Image
          src={banner}
          alt='cover image'
          className=' object-cover min-h-[420px] md:min-h-[500px] xl:h-[650px]  2xl:h-[750px] w-full'
          // sizes='100vw (max-height: 850px)'
          priority
        />
      </div>

      <div className='absolute top-32 lg:top-36 xl:top-60 z-1000 text-white text-center left-0 right-0 ml-auto mr-auto  w-full h-max py-6'>
        <div className='relative z-1000'>
          <Image
            src={logo}
            alt='cover image'
            className=' object-cover h-[30px] w-auto xl:h-[80px] lg:h-[60px] z-[2000]  text-white mx-auto '
            // sizes='100vw (max-height: 850px)'
            priority
          />

          <div>
            <p className='my-3 lg:my-6 ui_subtitle font-lato z-[2000]'>
              All your favorite events in one place
            </p>
          </div>
          <Link href='/events'>
            <button className='mt-4 py-1 z-[2000] lg:py-2 px-2 lg:px-4 text-white text-md lg:text-xl w-max bg-transparent cursor-pointer border-2 border-white rounded-md  hover:bg-brand_color font-swmibold'>
              Events
            </button>
          </Link>
          <div className='z-10'>
            <Image
              src={'/assets/logo/Shadow.png'}
              alt='shadow'
              width={1000}
              height={500}
              className=' object-cover relative -mt-[220px] h-400 lg:-mt-[400px] lg:h-[600px]  lg:w-auto -z-10 text-white mx-auto '
              // sizes='100vw (max-height: 850px)'
              priority
            />
          </div>
        </div>
      </div>
      {/* <div className='home_banner_shade'></div> */}
    </div>
  );
};

export default Banner;
