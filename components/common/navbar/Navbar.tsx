import Link from 'next/link';
import { useState } from 'react';

import MobileNav from './MobileNav';
import { FiLogOut } from 'react-icons/fi';
import logo from '/public/assets/logo/logo.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { logout } from 'redux/slices/userSlice';
import avatar from '/public/assets/logo/user.png';
import { MdAccountCircle, MdOutlineEmojiEvents } from 'react-icons/md';
import { GrOrderedList } from 'react-icons/gr';

const Navbar: React.FC<{}> = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  // const [notificationOpen, setNotificationOpen] = useState(false);
  const isLogged = useAppSelector((state) => state.userReducer.success);

  const userInfo = useAppSelector((state) => state.userReducer.userInfo);
  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu); 
  };

  // const notifications = [
  //   { _id: 123, message: 'notification here for test', createdAt: '2 min ago' },
  //   {
  //     _id: 123,
  //     message: 'notification here for test with double line ',
  //     createdAt: '2 min ago',
  //   },
  //   { _id: 123, message: 'notification here for test', createdAt: '2 min ago' },
  //   { _id: 123, message: 'notification here for test', createdAt: '2 min ago' },
  // ];
  const dispatch = useAppDispatch();
  return (
    <div className='relative h-16 z-[4000] overflow:hidden  bg-navbar_trans shadow-trans_nav backdrop-blur-sm font-lato'>
      <div className='px-4 lg:px-24 w-full h-full flex items-center'>
        <div className=' md:hidden'>
          <Link href='/'>
            <div className='cursor-pointer'>
              <Image
                src={logo}
                alt='logo'
                className='h-8 md:h-10 lg:h-12 w-min mt-0 md:mt-4'
              ></Image>
            </div>
          </Link>
          <div
            className='h-full absolute right-4 top-4 z-10'
            onClick={() => handleMobileMenu()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='block h-6 w-6 text-white'
              viewBox='0 0 20 20'
              fill='currentColor'
            >
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
        <div className=' md:flex justify-between items-center h-full w-full hidden '>
          {/* logo */}
          <div className='flex  w-full h-full items-center'>
            <Link href='/'>
              <Image
                src={logo}
                className='h-12 w-min text-white '
                alt='logo'
              ></Image>
            </Link>
          </div>
          {/* right nav bar */}
          <div className='flex h-full w-full justify-end items-center space-x-3 text-white'>
            <div className='text-nav font-medium flex items-center justify-center space-x-4  h-full'>
              <ul className='flex h-full justify-start items-center ml-0 lg:ml-6 space-x-6  font-medium text-white'>
                <li className=' hover:underline'>
                  <Link href='/events'>Events</Link>
                </li>
                <li className=' hover:underline'>
                  <Link href='/about-us'>About Us</Link>
                </li>
              </ul>
              {/* <div
                className='relative  z-50'
                onMouseMove={() => setNotificationOpen(true)}
                onMouseLeave={() => setNotificationOpen(false)}
              >
                <div className='w-2 h-2 rounded-fifty_percent bg-blue-800 absolute -top-1 -right-1'></div>
                {notificationOpen && (
                  <div className='bg-[#a6b4af] text-black w-300 h-350 border-1 border-black absolute rounded-lg shadow-md top-6 right-0 text-center'>
                    <div className='border-b-[1px] border-black w-full py-4 flex items-center justify-center space-x-4 text-teal-900 font-semibold'>
                      <IoMdNotificationsOutline className='w-6 h-6' />
                      <span>Notifications</span>
                    </div>
                    <div className='h-full w-full bg-gray-200 p-4 rounded-lg'>
                      {notifications.length > 0 &&
                        notifications.map((notification) => (
                          <div
                            key={notification._id}
                            className='flex justify-between items-center w-full my-4'
                          >
                            <div className='flex items-center space-x-4 justify-center'>
                              <span>
                                <BsChat className='text-teal-900' />
                              </span>
                              <small className='text-green-600 text-sm text-start'>
                                {notification.message}
                              </small>
                            </div>
                            <span className='text-sm text-red-600 cursor-pointer'>
                              <MdClose />
                            </span>
                          </div>
                        ))}
                      {notifications.length === 0 && <p>Empty Notifications</p>}
                    </div>
                  </div>
                )}

                <IoMdNotificationsOutline className='h-6 w-6 cursor-pointer' />
              </div> */}

              {isLogged ? (
                <div
                  className='relative  flex flex-col justify-center items-center pl-4 space-x-4 h-full text-white'
                  onMouseMove={() => setDashboardOpen(true)}
                  onMouseLeave={() => setDashboardOpen(false)}
                >
                  <div className='cursor-pointer font-semibold h-full flex  justify-center items-center space-x-2'>
                    <Image
                      src={avatar}
                      alt='profile'
                      className='rounded-full h-6 w-6 object-cover'
                    ></Image>
                    <p>{userInfo.name.split(' ')[0]}</p>
                  </div>
                </div>
              ) : (
                <div className='flex justify-center items-center space-x-2'>
                  {/* <div className='py-1 px-3 text-white  w-max bg-transparent cursor-pointer border-2 border-white rounded-md  hover:bg-brand_color font-md'>
                    <Link href='/sign-up'>SIGN UP</Link>
                  </div> */}
                  {pathname === '/login' ? null : (
                    <Link href='/login'>
                      <div className='py-2 px-3 text-white  w-max bg-gray-900 cursor-pointer rounded-md  hover:bg-brand_color font-md'>
                        Log in
                      </div>
                    </Link>
                  )}
                </div>
              )}

              {dashboardOpen && isLogged && (
                <div
                  className='absolute w-42 top-16 right-12 z-100 bg-white text-black p-2  rounded-md'
                  onMouseMove={() => setDashboardOpen(true)}
                  onMouseLeave={() => setDashboardOpen(false)}
                >
                  <ul>
                    {/* <li>
                      <Link href='/admin' className='text-white'>
                        <div className=' rounded-md hover:bg-gray-600 hover:text-white py-2 px-4 w-full flex items-center justify-start space-x-4'>
                          <IoMdGift className='text-white' />
                          <p> {userInfo.name}</p>
                        </div>
                      </Link>
                    </li> */}
                    <li>
                      <div
                        onClick={() => dispatch(logout())}
                        className=' rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <FiLogOut className='' />
                        <p> Logout</p>
                      </div>
                    </li>
                    <li>
                      <Link
                        href='/dashboard#profile'
                        className=' rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <MdAccountCircle className='' />
                        <p> Profile</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/dashboard#history'
                        className=' rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <GrOrderedList className='' />
                        <p> Order History</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/dashboard#attended-events'
                        className=' rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <MdOutlineEmojiEvents className='' />
                        <p> Attended Events</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/dashboard#download-tickets'
                        className=' rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <MdOutlineEmojiEvents className='' />
                        <p>Download Tickets</p>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* mobile menu */}
        <div className='z-[4000]'>
          <MobileNav
            handleMobileMenu={handleMobileMenu}
            isOpenMobileMenu={isOpenMobileMenu}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
