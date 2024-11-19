import { useEffect, useState } from 'react';
import { FiLogOut } from 'react-icons/fi';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { agentLogout } from 'redux/slices/agentSlice';
import avatar from '/public/assets/logo/user.png';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsChat, BsSearch } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';
import { CgMenu } from 'react-icons/cg';
import { TiTick } from 'react-icons/ti';
import axios from '@/axios/config';
import { notificationByAgent } from 'redux/slices/notificationSlice';

const AgentNavbar = ({ isMenuOpen, setIsMenuOpen }: any) => {
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const [searchInput, setSearchInput] = useState('');

  const [notificationOpen, setNotificationOpen] = useState(false);
  const isLogged = useAppSelector((state) => state.agentReducer.success);

  const agentInfo = useAppSelector((state) => state.agentReducer.agentInfo);

  const notifications = useAppSelector(
    (state: any) => state.notificationReducer.notificationByAgent.data
  );

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(notificationByAgent(agentInfo.token));
  }, [agentInfo.token, dispatch]);
  const handleSearch = () => {
    // console.log(searchInput);
  };

  const handleReadNotification = async (id: any) => {
    const { data } = await axios.put(
      'notifications/read',
      { id: id },
      {
        headers: { Authorization: `Bearer ${agentInfo.token}` },
      }
    );
    console.log(data);
    dispatch(notificationByAgent(agentInfo.token));
  };
  return (
    <div className='relative h-16 w-full z-[4000] overflow:hidden text-black  bg-white shadow-trans_nav backdrop-blur-sm font-lato'>
      <div className='px-12  w-full h-full'>
        <div className='flex justify-between space-x-2 items-center h-full w-full md'>
          <div className='md:hidden block'>
            <CgMenu
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='cursor-pointer text-black'
            />
          </div>
          {/* search input */}
          {isLogged ? (
            <div
              className={`w-full h-full ${
                isMenuOpen ? 'hidden md:block ' : 'hidden md:block'
              }`}
            >
              <div className='w-full h-full flex justify-start items-center '>
                <BsSearch
                  className='text-gray-500 cursor-pointer'
                  onClick={() => handleSearch}
                />
                <input
                  type='search'
                  name=''
                  id=''
                  onChange={(e: any) => setSearchInput(e.target.value)}
                  placeholder='Search'
                  className='text-gray-600 bg-white rounded-lg border-none outline-none  px-2 py-2'
                />
              </div>
            </div>
          ) : null}
          {/* right nav bar */}

          {isLogged ? (
            <div className='flex h-full w-full justify-end items-center space-x-3 text-black'>
              <div className='text-md font-medium flex items-center justify-center space-x-4  h-full'>
                <div
                  className='relative  z-50'
                  onMouseMove={() => setNotificationOpen(true)}
                  onMouseLeave={() => setNotificationOpen(false)}
                >
                  {notifications.length > 0 && (
                    <div className='w-2 h-2 rounded-fifty_percent bg-blue-800 absolute -top-1 -right-1'></div>
                  )}

                  {notificationOpen && (
                    <div className='bg-brand_color  text-white w-300 h-[250px] border-1 border-black absolute rounded-lg shadow-md top-6 -right-10 text-center'>
                      <div className='border-b-[1px] border-brand_color w-full py-4 flex items-center justify-center space-x-4 text-white font-semibold'>
                        <IoMdNotificationsOutline className='w-6 h-6' />
                        <span>Notifications</span>
                      </div>
                      <div className='h-full w-full bg-white rounded-b-lg p-4'>
                        {notifications.length ? (
                          notifications.slice(0, 5).map((notification: any) => (
                            <div
                              key={notification._id}
                              className={`flex justify-between items-center w-full my-4 ${
                                notification.read ? 'hidden' : 'block'
                              }`}
                            >
                              <div className='flex items-center space-x-4 justify-center'>
                                <span>
                                  <BsChat className='text-brand_color' />
                                </span>
                                <small className='text-gray-800 text-sm text-start'>
                                  {notification.title}
                                </small>
                              </div>
                              <span
                                className='text-sm text-green-400 cursor-pointer'
                                onClick={() =>
                                  handleReadNotification(notification._id)
                                }
                              >
                                <TiTick className='h-6 text-sm' />
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className='text-black font-semibold pt-12 px-6'>
                            No new notification!
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <IoMdNotificationsOutline className='h-6 w-6 cursor-pointer' />
                </div>

                <div
                  className='relative  flex flex-col justify-center items-center pl-4 space-x-4 h-full text-black'
                  onMouseMove={() => setDashboardOpen(true)}
                  onMouseLeave={() => setDashboardOpen(false)}
                >
                  <div className='text-md cursor-pointer font-semibold h-full flex  justify-center items-center space-x-2'>
                    <Image
                      src={process.env.NEXT_PUBLIC_SERVER_HOST + agentInfo.logo}
                      alt='profile'
                      className='rounded-full h-6 w-6 object-cover'
                      width='25'
                      height='25'
                    ></Image>
                    <p>{agentInfo?.name.split(' ')[0]}</p>
                  </div>
                </div>

                {dashboardOpen && isLogged && (
                  <div
                    className='absolute w-42 top-16 right-12 z-100 bg-brand_color text-black p-2  rounded-md'
                    onMouseMove={() => setDashboardOpen(true)}
                    onMouseLeave={() => setDashboardOpen(false)}
                  >
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
                          onClick={() => dispatch(agentLogout())}
                          className='rounded-md z-[10000] py-2 hover:bg-gray-600 px-4 w-full flex items-center justify-start cursor-pointer space-x-4 text-white'
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
          ) : null}
        </div>

        {/* mobile menu */}
        {/* <MobileNav
          handleMobileMenu={handleMobileMenu}
          isOpenMobileMenu={isOpenMobileMenu}
        /> */}
      </div>
    </div>
  );
};

export default AgentNavbar;
