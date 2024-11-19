import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import axios from '@/axios/config';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPopup } from 'redux/slices/popupslice';
import Modal from '@/components/common/Modal';
import { FaUserLock, FaUsers } from 'react-icons/fa';

const EventCard = ({ event, index, setUpdateState, updateState }: any) => {
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

  const date = new Date(eventTime).toDateString();
  const startTime = new Date(eventTime).toLocaleTimeString();
  const endTime = new Date(eventEndTime).toLocaleTimeString();
  const dateNow = new Date().getTime();
  const endDate = new Date(eventEndTime).getTime();
  const [featuredModel, setFeaturedModel] = useState(false);
  const [showAnalytics, setAnalytics] = useState(false);

  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.adminReducer.adminInfo);
  useEffect(() => {
    if (index === 0) {
      setAnalytics(true);
    }
  }, [index]);
  const handleFeatured = (id: any) => {
    axios
      .get('events/admin/featured/' + id, {
        headers: {
          'Authorization': `Bearer ${admin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setUpdateState(!updateState);
        dispatch(
          setPopup({
            type: 'success',
            message: 'Featured successfully',
            show: true,
          })
        );

        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        dispatch(
          setPopup({
            type: 'failed',
            message: 'Featured failed',
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      });
  };
  const handleUnFeatured = (id: any) => {
    axios
      .get('events/admin/un-featured/' + id, {
        headers: {
          'Authorization': `Bearer ${admin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        setUpdateState(!updateState);
        dispatch(
          setPopup({
            type: 'success',
            message: 'Unfeaturing successful',
            show: true,
          })
        );

        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        // console.log(err);
        dispatch(
          setPopup({
            type: 'failed',
            message: 'Unfeatured failed',
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      });
  };

  return (
    <div className='rounded-md font-lato h-full w-full md:mx-0 mx-auto mt-4'>
      <Modal
        showModal={featuredModel}
        setShowModal={setFeaturedModel}
        handleConfirm={event.isFeatured ? handleUnFeatured : handleFeatured}
        title='Are you sure?'
        confirmText={`${event.isFeatured ? 'Make UnFeatured' : 'Make Featured'
          }`}
        data={event._id}
      >
        <div>
          <p>
            Event Name: <span className='font-bold'>{event.name}</span>
          </p>
          <p className='mt-2'>
            Featured:{' '}
            <span className='font-bold'>
              {event.isFeatured ? 'True' : 'False'}
            </span>
          </p>
        </div>
      </Modal>

      <div className='flex flex-row items-center justify-start h-full w-full'>
        <div className='lg:h-[210px] h-max lg:w-[370px]'>
          <Link
            href={`/admin/dashboard/events/${event._id}`}
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
        <div className='xl:px-14 md:px-4 p-2 bg-brand_gradient text-white rounded-tr-lg w-full lg:h-[210px] h-200 flex flex-col items-start justify-start relative'>
          <Link href={`/admin/dashboard/events/${event._id}`}>
            <div className='w-full h-full'>
              <div className='flex justify-start items-center w-full space-x-2'>
                <span>{event.isPrivate ? <FaUserLock className='w-6 h-6' /> : <FaUsers className='w-6 h-6' />}</span> <p className='text-3xl font-bold my-2 font-lato'>{name}</p>
              </div>
              <p className='text-sm font-lato  hidden md:block'>
                {description.slice(0, 250)}
              </p>
            </div>
          </Link>
          <div className='absolute bottom-12 lg:bottom-6 left-4 xl:left-14'>
            <div>
              <p>{date}</p>
            </div>
            <div className='flex items-center justify-center space-x-14 my-2'>
              <p> Opening Time: {startTime}</p>
              <p> Closing Time: {endTime}</p>
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
          {dateNow < endDate && published && (
            <div className='flex items-center justify-start absolute lg:top-8  lg:right-14 top-2 right-2'>
              <div className='toggle-switch'>
                <input
                  type='checkbox'
                  name='userName'
                  value='userName'
                  checked={event.isFeatured}
                  className='toggle-featured'
                  onChange={() => setFeaturedModel(true)}
                />
                <label className='toggle-label' />
              </div>
              <p className='text-white'>Featured</p>
            </div>
          )}

          <div className='absolute bottom-0 l:right-14 right-4'>
            <Link href={`/admin/dashboard/events/${event._id}`}>
              <div className='text-lg mb-2 px-4 py-2 hover:bg-brand-gradient bg-brand_color border-white border-[1px] rounded-3xl text-white w-max'>
                <p>View details </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className='relative bg-white text-black'>
        {showAnalytics && (
          <div className='relative grid rounded-b-lg grid-cols-4 p-4 h-full w-full text-center border-[1px] border-brand_color'>
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
