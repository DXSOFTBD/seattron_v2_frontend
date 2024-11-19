import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import axios from '@/axios/config';
import Modal from '@/components/common/Modal';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { useRouter } from 'next/router';
import { setPopup } from 'redux/slices/popupslice';
import UpdateTicketForm from './updateTicketForm';
import Loader from '@/components/common/Loader';

const UpdateTicket = ({ ticket }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [ticketData, setTicketData] = useState<any>({});
  const [seatData, setSeatData] = useState<any>({});

  const router = useRouter();
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (ticket.data.event) {
      axios
        .get('events/quota/ticket-seat/' + ticket.data.event, {
          headers: { Authorization: `Bearer ${agent.token}` },
        })
        .then((res: any) => setSeatData(res.data.data));
    }

  }, [agent.token, ticket.data.event]);
  const updateTicketHandler = () => {
    const data = {
      ...ticketData,
      ticket: ticket.data._id,
      agent: agent._id,
    };

    axios
      .put('tickets/' + ticket.data._id, data, {
        headers: { Authorization: `Bearer ${agent.token}` },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Ticket Updated successfully',
            show: true,
          })
        );
        setTicketData({});
        router.back();
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
  };
  const remainingSeat = Number(seatData.maxSeats) - Number(seatData.currentSeatCount)
  return (
    <Loader status={ticket.status}>
      {/* <Breadcrumb from='giftCard' /> */}

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={updateTicketHandler}
        title='Are you sure?'
        confirmText='Update Ticket'
        data={ticketData}
      >
        {ticketData && (
          <div className='font-lato flex   flex-col space-y-2 min-w-300 text-gray-600 bg-gray-200 p-4 rounded-lg'>
            <p className='text-2xl text-brand_color my-2  px-auto mx-auto w-max'>
              Ticket Details
            </p>
            <div className='flex item-center justify-start space-x-2'>
              <p className='w-44 text-gray-900'>Package:</p>
              <small>{ticketData.package}</small>
            </div>
            <div className='flex item-center justify-start space-x-2'>
              <p className='w-44 text-gray-900'>Price</p>
              <small>{ticketData.price}</small>
            </div>
            <div className='flex item-center justify-start space-x-2'>
              <p className='w-44 text-gray-900'>Details:</p>

              <div
                dangerouslySetInnerHTML={{
                  __html: ticketData.details,
                }}
              />
            </div>
            <div className='flex item-center justify-start space-x-2'>
              <p className='w-44 text-gray-900'>Ticket limit:</p>
              <small>{ticketData.limit}</small>
            </div>
          </div>
        )}
      </Modal>

      <div className='w-full bg-gray-100 text-white rounded-md p-8 '>
        <div
          className='h-12 w-12 rounded-lg bg-gray-300 flex items-center cursor-pointer justify-center'
          onClick={() => router.back()}
        >
          <RiArrowGoBackFill className='h-6 w-6 text-gray-700 hover:text-gray-900' />
        </div>
        <div className='flex text-black items-center justify-center space-x-6 float-right'>
          <p className='text-xl'>
            Total Seat:&nbsp;
            <span className='bg-brand_gradient px-4 py-2 rounded-xl text-white w-max'>
              {seatData.maxSeats === null ? 0 : seatData.maxSeats}
            </span>
          </p>

          {
            remainingSeat ?
              <p className='text-xl'>
                Remaining Seat:&nbsp;
                <span className='bg-brand_gradient px-4 py-2 rounded-xl text-white w-max'>
                  {remainingSeat}
                </span>
              </p> : null
          }
        </div>
        <div className='mt-4 text-gray-800 '>
          <div>
            <div className='flex items-center justify-between w-full'>
              <p className='dashboard_title w-full'>
                Update {ticket.data.package}
              </p>
            </div>

            {/* ticket form */}

            {ticket.data && (
              <UpdateTicketForm
                setTicketData={setTicketData}
                ticketData={ticketData}
                setShowModal={setShowModal}
                seatData={seatData}
                ticket={ticket.data}
              />
            )}

            {/* add tickets button */}

            {/* schedule form */}

            {/* gift card for myself form */}
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default UpdateTicket;
