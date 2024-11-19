import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import axios from '@/axios/config';
import { format, set } from 'date-fns';
import { IoCloudDoneOutline } from 'react-icons/io5';
import { BiNoEntry } from 'react-icons/bi';
import { MdEvent, MdSignalWifiStatusbarNotConnected } from 'react-icons/md';
import { CgProfile } from 'react-icons/cg';
import { FiLogOut } from 'react-icons/fi';
import { GrOrganization } from 'react-icons/gr';
import { AiOutlineStop } from 'react-icons/ai';
import { checkerLogout } from 'redux/slices/checkerSlice';

const CheckTicket = () => {
  const [ticket, setTicket] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [value, setValue] = useState<any>('');
  const dispatch = useAppDispatch();
  const isLogged: any = useAppSelector((state) => state.checkerReducer.success);
  const checker: any = useAppSelector(
    (state: any) => state.checkerReducer.checkerInfo.data
  );
  const checkTicketHandler = (id: any) => {
    id.trim();
    if (id.length !== 10) {
      setTicket({
        message: 'Ticket not valid',
      });
      setValue('');
      return;
    }

    setIsLoading(true);

    axios
      .get(`ticket-entry/${id}`, {
        headers: { Authorization: `Bearer ${checker.token}` },
      })
      .then((res) => {
        // console.log(res)
        setTicket(res.data);
        setIsLoading(false);
        setValue('');
      })
      .catch((err) => {
        setIsLoading(false);

        if (
          err.response &&
          err.response.data.message === 'Account restricted! Contact Organizer'
        ) {
          setTicket({
            message: 'Account restricted! Contact Organizer',
          });
          setValue('');
          setTimeout(() => {
            dispatch(checkerLogout());
          }, 8000);
        }
        if (err && err.message === 'Network Error') {
          setTicket({
            message: 'No Internet Connection!',
          });
          setValue('');
          // console.log(err);
        }
      });
  };

  function barcodeAutoFocus() {
    document.getElementById('SearchByScanning')?.focus();
  }

  const handleInputChange = (event: any) => {
    // console.log(event.target.value);
    const inputValue = event.target.value;
    setValue(inputValue);

    if (inputValue.length >= 10) {
      checkTicketHandler(inputValue);
      setValue('');
    }
  };

  const ticketResultCondition = () => {
    if (ticket.message && ticket.message === 'Entry successful') {
      return (
        <div className='max-w-md mx-auto px-10 pt-5 pb-10 bg-green-300 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden md:max-w-2xl text-center'>
          <div className='flex justify-center'>
            <IoCloudDoneOutline style={{ color: '#fff', fontSize: '100px' }} />
          </div>

          <p className='text-xl font-bold'>Entry Successful!</p>
          <p className='text-lg font-bold'>{ticket.data.package}</p>
          <p className='text-center pb-3 font-bold'>{ticket.data.id}</p>
          <p className='text-lg font-bold'>Name: {ticket.data.name}</p>
          <p className='text-lg font-bold'>Email: {ticket.data.email}</p>
          {ticket.data.phone ? (
            <p className='text-lg font-bold'>Phone: {ticket.data.phone}</p>
          ) : null}

          <p className='text-lg font-bold pt-2'>
            Event: {ticket.data.event.name}
          </p>
          <p className='text-lg font-bold'>Venue: {ticket.data.event.venue}</p>
        </div>
      );
    } else if (ticket.message && ticket.message === 'Ticket already entered') {
      return (
        <div className='max-w-md mx-auto px-10 pt-5 pb-10 bg-rose-300 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden md:max-w-2xl text-center'>
          <div className='flex justify-center'>
            <BiNoEntry style={{ color: '#fff', fontSize: '100px' }} />
          </div>
          <p className='text-xl font-bold'>Already Entered!</p>
          <p className='text-lg font-bold'>
            Entry time: {format(new Date(ticket.data?.entryTime), 'Pp')}
          </p>
          <p className='text-lg font-bold'>{ticket.data.package}</p>
          <p className='text-center pb-3 font-bold'>{ticket.data.id}</p>
          <p className='text-lg font-bold'>Name: {ticket.data.name}</p>
          <p className='text-lg font-bold'>Email: {ticket.data.email}</p>
          {ticket.data.phone ? (
            <p className='text-lg font-bold'>Phone: {ticket.data.phone}</p>
          ) : null}

          <p className='text-lg font-bold pt-2'>
            Event: {ticket.data.event.name}
          </p>
          <p className='text-lg font-bold'>Venue: {ticket.data.event.venue}</p>
        </div>
      );
    } else if (ticket.message && ticket.message === 'Ticket not paid') {
      return (
        <div className='max-w-md mx-auto px-10 pt-5 pb-10 bg-red-400 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden md:max-w-2xl text-center'>
          <div className='flex justify-center'>
            <BiNoEntry style={{ color: 'red', fontSize: '100px' }} />
          </div>
          <p className='text-xl font-bold'>Not Paid, No Entry!</p>
          <p className='text-lg font-bold'>Due: {ticket.data.price}</p>
          <p className='text-lg font-bold'>{ticket.data.package}</p>
          <p className='text-center pb-3 font-bold'>{ticket.data.id}</p>
          <p className='text-lg font-bold'>Name: {ticket.data.name}</p>
          <p className='text-lg font-bold'>Email: {ticket.data.email}</p>
          <p className='text-lg font-bold'>Phone: {ticket.data.phone}</p>
        </div>
      );
    } else if (ticket.message && ticket.message === 'No Internet Connection!') {
      return (
        <div className='max-w-md mx-auto px-10 pt-5 pb-10 bg-yellow-400 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden md:max-w-2xl text-center'>
          <div className='flex justify-center'>
            <MdSignalWifiStatusbarNotConnected
              style={{ color: 'black', fontSize: '100px' }}
            />
          </div>
          <p className='text-xl font-bold'>No Internet Connection!</p>
          <p className='text-xl font-bold'>
            Please check your Internet connection and try again!
          </p>
        </div>
      );
    } else if (
      ticket.message &&
      ticket.message === 'Account restricted! Contact Organizer'
    ) {
      return (
        <div className='max-w-md mx-auto px-10 pt-5 pb-10 bg-red-500 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden md:max-w-2xl text-center'>
          <div className='flex justify-center'>
            <AiOutlineStop style={{ color: 'black', fontSize: '100px' }} />
          </div>
          <p className='text-xl font-bold'>Account Restricted!</p>
          <p className='text-xl font-bold'>
            Your account has restricted by the organizer! Please contact
            organizer for more information!
          </p>
        </div>
      );
    } else {
      return (
        <div className='max-w-md mx-auto px-10 pt-5 pb-10 bg-red-400 rounded-xl shadow-xl hover:shadow-2xl overflow-hidden md:max-w-2xl text-center'>
          <div className='flex justify-center'>
            <BiNoEntry style={{ color: 'red', fontSize: '100px' }} />
          </div>
          <p className='text-xl font-bold'>No Entry!</p>
          <p className='text-xl font-bold'>Ticket is not valid!</p>
        </div>
      );
    }
  };

  return (
    <div>
      <div className='w-full shadow-sm flex justify-between items-center px-4 md:px-20 py-auto my-auto bg-gray-100'>
        <div className='flex justify-center items-center space-x-2 font-semibold'>
          <GrOrganization className='w-6 h-6' />
          <p className='text-gray-800 text-sm md:text-md'>
            {checker?.agent?.businessDetails?.legalBusinessName}
          </p>
          <div className='flex items-center justify-center space-x-2 text-md text-gray-800 font-semibold'>
            <MdEvent className='w-6 h-6 rounded-full' />
            <span className='text-sm'>{checker.event?.name}</span>
          </div>
        </div>

        <div className='flex items-center justify-center h-12 space-x-2 text-md text-gray-800  relative cursor-pointer'>
          <span>{checker.userName?.split(' ')[0]}</span>
          <CgProfile className='w-6 h-6 rounded-full' />
          {isLogged && (
            <div className='z-100 bg-gray-800 text-black  rounded-md'>
              <ul>
                {/* <li>
                      <Link href='/admin' className='text-black'>
                        <div className=' rounded-md hover:bg-gray-600 py-2 px-4 w-full flex items-center justify-start space-x-4'>
                          <IoMdGift className='text-black' />
                          <p> {userInfo.name}</p>
                        </div>
                      </Link>
                    </li> */}
                <li>
                  <div
                    onClick={() => dispatch(checkerLogout())}
                    className='rounded-md z-[10000] py-2 hover:bg-brand_color px-2 w-full flex items-center justify-start cursor-pointer space-x-2 text-white'
                  >
                    <FiLogOut className='text-white' />
                    <p> Logout</p>
                  </div>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='pt-4 xl:pt-20 px-20 text-gray-800 bg-white w-screen'>
        <p className='dashboard_title'>Ticket Check</p>
        <div>
          <div className=''>
            <form>
              <div className='my-4'>
                <label>Ticket ID</label>
                <input
                  autoFocus={true}
                  placeholder='Start Scanning'
                  value={value}
                  onChange={handleInputChange}
                  type='text'
                  id='SearchByScanning'
                  className='block w-full mt-2 py-2 px-3 max-w-md border bg-white text-black bdata-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:bdata-blue-500 sm:text-sm'
                  onBlur={barcodeAutoFocus}
                />
              </div>
              <button
                type='submit'
                className='text-xl justify-center items-center flex space-x- mt-2 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                onClick={(e) => {
                  e.preventDefault();
                  checkTicketHandler(value);
                }}
              >
                Check Ticket
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className='flex justify-center'>
        {isLoading ? (
          <div role='status'>
            <svg
              aria-hidden='true'
              className='w-20 h-20 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
            <span className='sr-only'>Loading...</span>
          </div>
        ) : (
          ticketResultCondition()
        )}
      </div>
    </div>
  );
};

export default CheckTicket;
