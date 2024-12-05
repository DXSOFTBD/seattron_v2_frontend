import Loader from '@/components/common/Loader';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import TicketCard from '../ticket-card';
import { RiArrowGoBackFill, RiFileCopyLine } from 'react-icons/ri';
import { GiClick } from 'react-icons/gi';
import { useRouter } from 'next/router';
import StickerCard from '@/components/common/dashboard/sticker-card';
import EventBannerLayout from './banner';
import { format } from 'date-fns';
import { TiTick } from 'react-icons/ti';
import Modal from '@/components/common/Modal';
import {
  getApprovedRequest,
  getRejectRequest,
  setSelectedRequest,
} from 'redux/slices/requestSlice';
import { setPopup } from 'redux/slices/popupslice';
import { MdClose, MdGeneratingTokens, MdOutlinePublish } from 'react-icons/md';
import { BsPlus } from 'react-icons/bs';
import { getAdminEventById } from 'redux/slices/EventSlice';
import { RxUpdate } from 'react-icons/rx';
import axios from '@/axios/config';
import { getEventEntryList, getEventOrderList } from 'redux/slices/orderSlice';
import EventEntryList from './eventEntryList';
import EventOrderList from './eventOrderList';
import { AiOutlineBuild } from 'react-icons/ai';
import { ArrowNext } from '../../icons/arrow-next';

const SingleEvent = ({ eventData }: any) => {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState(false);
  const [publishModal, setPublishModal] = useState(false);
  const [showEntryList, setShowEntryList] = useState(false);
  const [showOrderList, setShowOrderList] = useState(false);
  const { data, status }: any = eventData;
  const admin = useAppSelector((state: any) => state.adminReducer.adminInfo);
  const agent = useAppSelector((state: any) => state.agentReducer.agentInfo);
  const entryListData = useAppSelector(
    (state: any) => state.orderReducer.getEventEntryList
  );
  const orderListData = useAppSelector(
    (state: any) => state.orderReducer.getEventOrderList
  );

  const endDate = new Date(data.eventEndTime).getTime();
  const dateNow = new Date().getTime();
  const currentStatus = data?.currentStatus;
  const request = useAppSelector(
    (state: any) => state.requestReducer.selectedRequest
  );

  const router = useRouter();
  const { query } = router;
  const { slug } = query;

  const dispatch = useAppDispatch();
  // Approve an event request
  const handleApproval = () => {
    dispatch(getApprovedRequest({ token: admin?.token, id: request._id })).then(
      (res: any) => {
        if (res.type === 'request/getApprovedRequest/fulfilled') {
          dispatch(
            setPopup({
              type: 'success',
              message: 'Approved successfully',
              show: true,
            })
          );
          dispatch(setSelectedRequest(''));
          dispatch(getAdminEventById({ token: admin?.token, slug }));
        } else {
          dispatch(
            setPopup({
              type: 'failed',
              message: 'Failed to approved',
              show: true,
            })
          );
        }
      }
    );
    setTimeout(() => {
      // After 3 seconds set the show value to false,
      dispatch(setPopup({ show: false, type: '', message: '' }));
    }, 5000);
  };

  // Reject an event request
  const handleReject = () => {
    const newData = {
      request_id: request._id,
      rejectReason,
      token: admin?.token,
    };

    dispatch(getRejectRequest(newData)).then((res: any) => {
      if (res.type === 'request/getRejectRequest/fulfilled') {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Rejection successful',
            show: true,
          })
        );
        dispatch(setSelectedRequest(''));
        dispatch(getAdminEventById({ token: admin.token, slug }));
      } else {
        dispatch(
          setPopup({
            type: 'failed',
            message: 'Rejection failed',
            show: true,
          })
        );
      }
    });
    setTimeout(() => {
      // After 3 seconds set the show value to false
      dispatch(setPopup({ show: false, type: '', message: '' }));
    }, 5000);
  };
  // publishing event
  const handlePublishEvent = () => {
    if (data.tickets.length > 0) {
      axios
        .get('events/publish/' + data._id, {
          headers: {
            'Authorization': `Bearer ${agent.token}`,
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((res) => {
          dispatch(
            setPopup({
              type: 'success',
              message: 'Event published successfully',
              show: true,
            })
          );
          router.push(`/merchant/dashboard/add-tickets/${res.data.data._id}`);

          setTimeout(() => {
            dispatch(setPopup({ show: false, type: '', message: '' }));
          }, 5000);
        })
        .catch((err) => {
          dispatch(
            setPopup({
              type: 'failed',
              message: err.response.data.error,
              show: true,
            })
          );
          setTimeout(() => {
            dispatch(setPopup({ show: false, type: '', message: '' }));
          }, 5000);
        });
    } else {
      dispatch(
        setPopup({
          type: 'failed',
          message: 'At least one ticket required for publishing event',
          show: true,
        })
      );
      setTimeout(() => {
        dispatch(setPopup({ show: false, type: '', message: '' }));
      }, 5000);
    }
  };
  // event entry data fetching handler
  const EntryListHandler = () => {
    dispatch(getEventEntryList({ token: agent.token, id: data._id }));
    setShowEntryList(true);
    setShowOrderList(false);
  };
  const OrderListHandler = () => {
    dispatch(getEventOrderList({ token: agent.token, id: data._id }));
    setShowOrderList(true);
    setShowEntryList(false);
  };
  // generate token for new event link
  const [link, setLink] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  useEffect(() => {
    setLink(`${data.isPrivate ? process.env.NEXT_PUBLIC_CLIENT_HOST + '/uZxPosAcK/' + data.privateKey : process.env.NEXT_PUBLIC_CLIENT_HOST + '/events/' + data.slug}`)
  }, [data])
  const copylink = () => {
    navigator.clipboard.writeText(link)
    setIsCopied(true)
  }
  const handleGenerateToken = () => {
    axios
      .get('events/private/key-gen/' + data._id, {
        headers: {
          'Authorization': `Bearer ${agent.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        // console.log(res)
        setLink(process.env.NEXT_PUBLIC_CLIENT_HOST + '/uZxPosAcK/' + res.data.data)
        dispatch(
          setPopup({
            type: 'success',
            message: 'Evnt link generated successfully',
            show: true,
          })
        );
        setIsCopied(false)
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        dispatch(
          setPopup({
            type: 'failed',
            message: err.response.data.error,
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      });
  }
  return (
    <Loader status={status}>
      <div className='font-lato relative'>
        {/* approve and reject modal */}
        {publishModal ? (
          <Modal
            showModal={publishModal}
            setShowModal={setPublishModal}
            title='Are you sure you want to publish this event?'
            confirmText='Yes'
            handleConfirm={handlePublishEvent}
          >
            <p>
              <span className='font-semibold'> Note </span>: At least one ticket
              required for publishing event.{' '}
            </p>
          </Modal>
        ) : null}
        {approveModal ? (
          <Modal
            showModal={approveModal}
            setShowModal={setApproveModal}
            title='Are You sure you want to approve ?'
            confirmText='Yes'
            handleConfirm={handleApproval}
          ></Modal>
        ) : null}
        {rejectModal ? (
          <Modal
            showModal={rejectModal}
            setShowModal={setRejectModal}
            title='Are You sure you want to reject this request ?'
            confirmText='Yes'
            handleConfirm={handleReject}
          >
            Enter Reason(Required):
            <input
              type='text'
              className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
              onChange={(e: any) => setRejectReason(e.target.value)}
            />
          </Modal>
        ) : null}

        <div className='flex justify-between items-end pb-2'>
          <div>
            <div>
              <div
                onClick={() => router.back()}
                className='h-12 w-12 my-2 rounded-lg bg-gray-300 flex items-center justify-center cursor-pointer'
              >
                <RiArrowGoBackFill className='h-6 w-6 text-gray-700 hover:text-gray-900' />
              </div>
            </div>
            <div className='grid grid-cols-2 lg:flex justify-center flex-wrap items-center space-x-4'>
              <div>
                {agent?.token ? (
                  <div
                    onClick={() => {
                      router.push(
                        `/merchant/dashboard/add-tickets/${data._id}`
                      );
                    }}
                    className=' my-2 bg-brand_gradient px-4 py-2 flex items-center justify-center space-x-3 rounded-xl text-white w-max cursor-pointer'
                  >
                    Add Tickets <BsPlus />
                  </div>
                ) : null}
              </div>
              <div>
                {agent?.token ? (
                  <div
                    onClick={() => {
                      router.push(
                        `/merchant/dashboard/add-lineup/${data._id}`
                      );
                    }}
                    className=' my-2 bg-brand_gradient px-4 py-2 flex items-center justify-center space-x-3 rounded-xl text-white w-max cursor-pointer'
                  >
                    <AiOutlineBuild />  &nbsp;   Manage Event Lineup
                  </div>
                ) : null}
              </div>
              <div>
                {agent?.token ? (
                  <div
                    onClick={() => {
                      router.push(
                        `/merchant/dashboard/events/update/${data._id}`
                      );
                    }}
                    className='bg-gray-200 text-green-700 shadow-md rounded-md px-2 py-2 flex items-center space-x-1 justify-center cursor-pointer'
                  >
                    <RxUpdate /> <span>Update Event </span>
                  </div>
                ) : null}
              </div>

              <div>
                {agent?.token && data.currentStatus === 'Draft' ? (
                  <div
                    onClick={() => setPublishModal(true)}
                    className='text-gray-200 bg-green-700 shadow-md rounded-md px-2 py-2 flex items-center space-x-1 justify-center cursor-pointer'
                  >
                    <MdOutlinePublish /> <span>Publish Event</span>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* event request handling from admin */}
          {request?.eventId?._id === data._id && admin?.token ? (
            <div className='flex justify-center items-center space-x-6'>
              <p className='dashboard_secondary_title'>New Event Request:</p>
              <div
                onClick={() => {
                  setApproveModal(true);
                }}
                className='flex items-center justify-center px-3 py-2 bg-gray-100 rounded-md space-x-2 cursor-pointer'
              >
                <TiTick className='text-green-600' /> <span>Approve</span>
              </div>
              <div
                onClick={() => {
                  setRejectModal(true);
                }}
                className='flex items-center justify-center px-3 py-2 bg-gray-100 rounded-md space-x-2 cursor-pointer'
              >
                <MdClose className='text-red-600' /> <span>Reject</span>
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center '>
              <p className='text-lg font-semibold text-black'>Status:&nbsp; </p>
              {dateNow < endDate ? (
                <div className=''>
                  {!currentStatus && data.published ? (
                    <p className='text-lg text-green-700 font-bold'>Live</p>
                  ) : null}

                  {currentStatus === 'Draft' ? (
                    <p className='text-lg text-gray-400 font-bold'>Draft</p>
                  ) : null}
                  {currentStatus === 'Processing' ? (
                    <p className='text-lg text-yellow-500 font-bold'>
                      Processing
                    </p>
                  ) : null}
                  {currentStatus === 'Live' ? (
                    <p className='text-lg text-green-700 font-bold'>Live</p>
                  ) : null}
                </div>
              ) : (
                <p className='text-red-400 text-lg font-semibold my-4 '>Past</p>
              )}
            </div>
          )}
        </div>

        <EventBannerLayout event={data} />
        <div className=' rounded-md border-2 my-4 '>
          <div className='flex flex-col items-start justify-start space-x-2 my-2 p-4'>
            <div className='grid grid-cols-1 lg:flex justify-start items-center flex-wrap  space-x-2'>
              {agent?.token && data.isPrivate ? (
                <div
                  onClick={() => {
                    handleGenerateToken()
                  }}
                  className='bg-blue-500 text-white shadow-md rounded-md px-2 py-2 flex items-center space-x-1 justify-center cursor-pointer'
                >
                  <MdGeneratingTokens /> <span>Generate new Event link </span>
                </div>
              ) : null}
              <div className='btn text-gray-800 border-[1px] border-gray-300 flex_center'><ArrowNext /><span className='text-[8px] lg:text-sm'> {link}</span>  </div>

              <div onClick={() => copylink()} className={`btn ${isCopied ? 'bg-green-500' : 'bg-blue-600'}  text-white flex_center space-x-2`}>
                <RiFileCopyLine /> {isCopied ? <p>Copied</p> : <p className=''>Copy</p>}
              </div>

            </div>
            <p className='dashboard_secondary_title pb-2 pt-4'>Event Details</p> 
            <div
              className='text-sm'
              dangerouslySetInnerHTML={{
                __html: data.details ? data.details : 'N/A',
              }}
            />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2'>
            <div className='border-r-2 text-gray-800 p-4'>
              <p className='dashboard_secondary_title pb-2'>
                Event Information
              </p>
              <div className=''>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>Capacity:</p>
                  <small>{data.capacity ? data.capacity : 'N/A'}</small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>Private:</p>
                  <small>{data.isPrivate ? 'Yes' : 'No'}</small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>Invite Only:</p>
                  <small>{data.isInviteOnly ? 'Yes' : 'No'}</small>
                </div>

                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>Start Time:</p>
                  <small>
                    {data.eventTime
                      ? format(new Date(data.eventTime), "Pp")
                      : null}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>End time:</p>
                  <small>
                    {data.eventEndTime
                      ? format(
                        new Date(data.eventEndTime),
                        "Pp"
                      )
                      : null}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>Duration:</p>
                  <small>
                    {data.eventDuration ? data.eventDuration + 'Hr' : 'N/A'}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-32'>Min. Age:</p>
                  <small>
                    {data.ageRestriction ? data.ageRestriction : 'N/A'}
                  </small>
                </div>
              </div>
            </div>
            <div className='p-4 '>
              <p className='dashboard_secondary_title pb-2'>User Information</p>
              <div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Name:</p>
                  <small>
                    {data.userName ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>

                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Email:</p>
                  <small>
                    {data.userEmail ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Phone:</p>
                  <small>
                    {data.userPhone ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Age:</p>
                  <small>
                    {data.userAge ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Gender:</p>
                  <small>
                    {data.userGender ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Occupation:</p>
                  <small>
                    {data.userOccupation ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>City:</p>
                  <small>
                    {data.userCity ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Country:</p>
                  <small>
                    {data.userCountry ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
                <div className='flex items-center justify-start space-x-2 my-2'>
                  <p className='w-44 text-gray-900'>Postal code:</p>
                  <small>
                    {data.userPostal_code ? (
                      <TiTick className='text-green-600' />
                    ) : (
                      <MdClose className='text-red-600' />
                    )}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* event analytics */}
        <div>
          <div className='w-full my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6'>
            <div className='w-full '>
              <StickerCard
                title='Total Orders'
                value={data.analytics?.totalOrders}
              />
            </div>
            <div className='w-full '>
              <StickerCard
                title='Total Sold'
                value={data.analytics?.totalSold}
              />
            </div>
            <div className='w-full '>
              <StickerCard
                title='Total Sold Amount'
                value={data.analytics?.totalEarning}
              />
            </div>
          </div>
          {/* event tickets */}
          {data?.tickets?.length > 0 && (
            <div>
              <p className='dashboard_secondary_title'>Tickets</p>

              <div className='w-full my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-6'>
                {data.tickets.length
                  ? data.tickets.map((ticket: any) => (
                    <div className='w-full' key={ticket._id}>
                      <TicketCard agent={agent} ticket={ticket} />
                    </div>
                  ))
                  : null}
              </div>
            </div>
          )}
        </div>
        {/* event order  and entry list */}
        {agent?.token ? (
          <div>
            <div className='flex justify-center items-center space-x-2'>
              <button
                onClick={() => EntryListHandler()}
                className={`${showEntryList
                  ? 'bg-brand_gradient text-white'
                  : 'bg-gray-200 text-brand_color'
                  } px-2 py-2 text-lg rounded-md flex shadow-md items-center justify-center space-x-2`}
              >
                <GiClick></GiClick>
                <span>View entry list </span>
              </button>
              <button
                onClick={() => OrderListHandler()}
                className={`${showOrderList
                  ? 'bg-brand_gradient text-white'
                  : 'bg-gray-200 text-brand_color'
                  } px-2 py-2 text-lg  shadow-md rounded-md flex items-center justify-center space-x-2`}
              >
                <GiClick></GiClick>
                <span>View order list </span>
              </button>
            </div>
            {showEntryList ? (
              entryListData.data.length > 0 ? (
                <EventEntryList list={entryListData.data} />
              ) : (
                <div className='dashboard_secondary_title'>No Entry Found!</div>
              )
            ) : null}
            {showOrderList ? (
              orderListData.data.length > 0 ? (
                <EventOrderList order={orderListData.data} />
              ) : (
                <div className='dashboard_secondary_title'>No Order Found!</div>
              )
            ) : null}
          </div>
        ) : null}
      </div>
    </Loader>
  );
};

export default SingleEvent;
