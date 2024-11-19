import { format } from 'date-fns';
import Link from 'next/link';
import React from 'react';
import { useAppDispatch } from 'redux/hooks';
import { setSelectedRequest } from 'redux/slices/requestSlice';

const Request = ({ req }: any) => {
  const dispatch = useAppDispatch();

  return (
    <div className='border-[1px] border_brand_color my-4 max-w-[800px] shadow-md rounded-md'>
      <div>
        <div className='bg-gradient-to-l rounded-t-md from-brand_color text-lg to-bg_primary text-white px-4 py-2 flex justify-between items-center'>
          <p> New Event Request</p>
        </div>
        <div className='flex justify-between items-end px-4'>
          <div className='text-sm py-2 '>
            <p className='pb-6 text-sm'>
              You have a new Event Request
              <span className='font-bold'>
                {' '}
                &nbsp;{req?.eventId?.name}
              </span>{' '}
              from
              <span className='font-bold'> &nbsp;{req?.agent?.name}</span>
            </p>
            {!req.isApproved && !req.isRejected && (
              <div
                onClick={() => {
                  dispatch(setSelectedRequest(req));
                }}
              >
                <Link href={`/admin/dashboard/events/${req.eventId._id}`}>
                  <p className='text-blue-600 cursor-pointer py-2'>
                    Go to Event page and Review
                  </p>
                </Link>
              </div>
            )}
            {req.isApproved && (
              <div className='text-sm my-2'>
                <div>
                  <p className='text-md font-bold my-2'>Approved By</p>
                  <p>Name: &nbsp;{req?.approvedBy?.name} </p>
                  <p>Email: &nbsp; {req?.approvedBy?.email} </p>
                  <p>
                    Approved date: &nbsp;
                    {format(new Date(req?.approvedAt), 'Pp')}
                  </p>
                </div>
              </div>
            )}

            {req.isRejected && (
              <div className='text-sm my-2'>
                <p>Rejected For:&nbsp; {req?.rejectedReason}</p>
                <p className='text-md font-bold my-2'>Rejected By</p>
                <p>Name: &nbsp;{req?.rejectedBy?.name} </p>
                <p>Email: &nbsp; {req?.rejectedBy?.email} </p>
                <p>
                  Rejected date: &nbsp;
                  {format(new Date(req?.rejectedAt), 'Pp')}
                </p>
              </div>
            )}
          </div>
          <div className='px-4'>
            <div>
              {req.createdAt ? (
                <div className='text-[10px] text-gray-600  h-full'>
                  <div className=''>
                    {format(new Date(req?.createdAt), 'Pp')}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className='px-2'>
          {req.typeOfRequest === 'New Event' && (
            <div className='bg-[#479480] px-3 text-[12px] py-1 rounded-full w-max h-max text-white m-2'>
              New event
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Request;
