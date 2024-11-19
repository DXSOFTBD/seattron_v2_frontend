import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { FaUserLock, FaUsers } from 'react-icons/fa';
import { RiFileCopyLine } from 'react-icons/ri';


const EventCard = ({ event, index
  , eventType }: any) => {
  const {
    name,
    description,
    analytics,
    thumb,
    eventTime,
    eventEndTime,
    capacity,
    published,
    currentStatus,
  } = event;
  const [link, setLink] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const date = new Date(eventTime).toDateString();
  const startTime = new Date(eventTime).toLocaleTimeString();
  const endTime = new Date(eventEndTime).toLocaleTimeString();
  const dateNow = new Date().getTime();
  const endDate = new Date(eventEndTime).getTime();
  const [showAnalytics, setAnalytics] = useState(false);
  useEffect(() => {
    if (index === 0) {
      setAnalytics(true);
    }
  }, [index]);
  useEffect(() => {
    setLink(`${event.isPrivate ? process.env.NEXT_PUBLIC_CLIENT_HOST + '/uZxPosAcK/' + event.privateKey : process.env.NEXT_PUBLIC_CLIENT_HOST + '/events/' + event.slug}`)
  }, [event])

  const copylink = () => {
    navigator.clipboard.writeText(link)
    setIsCopied(true)
  }
  return (
    <div className='rounded-md font-lato h-full  w-full md:mx-0 mx-auto mt-4'>
      <div className='flex flex-col md:flex-row items-center justify-start h-full w-full'>
        <div className='lg:h-[210px] h-max lg:w-[370px]'>
          <Link
            href={`/merchant/dashboard/events/${event._id}`}
            className=' block'
          >
            <div className='lg:h-[210px] h-max w-full lg:w-[370px] overflow-hidden'>
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_HOST + thumb}
                alt={name}
                className='object-cover h-full w-full  rounded-tl-lg '
                height='200'
                width='350'
              ></Image>
            </div>
          </Link>
        </div>
        <div className='xl:px-14 md:px-4 p-2 bg-brand_gradient text-white  rounded-tr-lg w-full lg:h-[210px] h-200 flex flex-col items-start justify-start relative'>
          <Link href={`/merchant/dashboard/events/${event._id}`}>
            <div className='w-full h-full'>
              <div className='flex justify-start items-center w-full space-x-2'>
                <span>{event.isPrivate ? <FaUserLock className='w-6 h-6' /> : <FaUsers className='w-6 h-6' />}</span> <p className='text-3xl font-bold my-2 font-lato'>{name}</p>
              </div>

              <p className='text-sm hidden lg:block font-lato'>
                {description.slice(0, 350)}
              </p>
            </div>
          </Link>
          <div className='absolute bottom-12 lg:bottom-6 left-4 xl:left-14'>
            <div>
              <p>{date}</p>
            </div>
            <div className='flex items-center justify-center space-x-14 my-2'>
              <p> Opening Time: {startTime}</p>
              {startTime ? <p> Closing Time: {endTime}</p> : null}
            </div>
          </div>
          <div className=''>
            {showAnalytics ? (
              <AiOutlineUp
                className='h-6 w-6 absolute bottom-2 lg:left-1/2 left-12  cursor-pointer'
                onClick={() => setAnalytics(!showAnalytics)}
              />
            ) : (
              <AiOutlineDown
                className='h-6 w-6 absolute bottom-2 lg:left-1/2 left-12  cursor-pointer'
                onClick={() => setAnalytics(!showAnalytics)}
              />
            )}
          </div>
          {eventType === 'Upcoming' ? <div onClick={() => copylink()} className={`absolute top-0 right-0 md:right-4 xl:right-14 btn ${isCopied ? 'bg-green-500' : 'bg-blue-600'}  text-white flex_center space-x-2`}>
            <RiFileCopyLine /> {isCopied ? <p>Copied</p> : <p className=''>Copy Event Link</p>}
          </div> : null
          }

          <div className='absolute bottom-0 xl:right-14 md:right-4'>
            <Link href={`/merchant/dashboard/events/${event._id}`}>
              <div className='text-lg mb-2 px-4 py-2 hover:bg-brand-gradient bg-brand_color border-white border-[1px] rounded-3xl text-white w-max'>
                <p>View details </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='relative bg-white text-black'>
        {showAnalytics && (
          <div className='relative rounded-b-lg grid grid-cols-4 p-4 h-full w-full text-center border-[1px] border-brand_color'>
            <div className='border-r-2 border-brand_color p-6 w-'>
              <p className='text-lg'>Status</p>
              {dateNow < endDate ? (
                <div className='mt-2'>
                  {!currentStatus && published ? (
                    <p className='text-3xl text-green-700 font-bold'>Live</p>
                  ) : null}

                  {currentStatus === 'Draft' ? (
                    <p className='text-3xl text-gray-500 font-bold'>Draft</p>
                  ) : null}
                  {currentStatus === 'Processing' ? (
                    <p className='text-3xl text-yellow-500 font-bold'>
                      Processing
                    </p>
                  ) : null}
                  {currentStatus === 'Rejected' ? (
                    <p className='text-3xl text-red-500 font-bold'>Rejected</p>
                  ) : null}
                  {currentStatus === 'Live' ? (
                    <p className='text-3xl text-green-700 font-bold'>Live</p>
                  ) : null}
                </div>
              ) : (
                <p className='text-red-400 text-3xl font-semibold my-4 '>
                  Past
                </p>
              )}
            </div>
            <div className='border-r-2 border-brand_color p-6'>
              <p className='text-lg'>Total</p>
              <p className='text-3xl font-semibold my-4'>{capacity}</p>
            </div>

            <div className='border-r-2 border-brand_color p-6 '>
              <p className='text-lg'>Sold</p>
              <p className='text-3xl font-semibold my-4'>
                {analytics.totalSold}
              </p>
            </div>
            <div className='border-r-2  p-6'>
              <p className='text-lg'>Available</p>
              <p className='text-3xl font-semibold my-4'>
                {capacity - analytics.totalSold}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventCard;
