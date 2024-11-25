import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { useRouter } from "next/router";
import Image from "next/image";
import avatar from "/public/assets/logo/user.png";
import { FiLogOut } from "react-icons/fi";
import { MdAccountCircle, MdOutlineEmojiEvents } from "react-icons/md";
import { GrOrderedList } from "react-icons/gr";
import { logout } from "redux/slices/userSlice";
import { IoMdDownload } from "react-icons/io";

const MobileNav = ({ handleMobileMenu, isOpenMobileMenu }: any) => {
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  // const [notificationOpen, setNotificationOpen] = useState(false);
  const isLogged = useAppSelector((state) => state.userReducer.success);

  const userInfo = useAppSelector((state) => state.userReducer.userInfo);

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
    <div
      className={`h-screen  mobile_navigation absolute right-0 top-0 bg-gray-900 transition-all duration-1000 z-[2000] ${
        isOpenMobileMenu ? "w-screen" : "w-0"
      }`}
    >
      <div
        className={`text-white float-right m-4 text-2xl ${
          isOpenMobileMenu ? "visible" : "invisible"
        }`}
        onClick={() => handleMobileMenu()}
      >
        <AiOutlineClose />
      </div>
      <div className="text-md overflow-hidden w-full ">
        <ul className="mob_navbar flex h-full justify-start mx-6 flex-col lg:ml-6 space-y-6 text-md font-medium text-white">
          <li className="cursor-pointer text-brand_color">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/events">Events</Link>
          </li>
          <li className="cursor-pointer">
            <Link href="/about-us">About</Link>
          </li>
          {/* 
          <li className='w-full  bg-brand_color text-center text-xl rounded-md py-2 '>
            <Link href='/login'>
              <button> Login/Sign Up</button>
            </Link>
          </li> */}

          <div>
            {isLogged ? (
              <div
                className="relative  flex flex-col justify-start space-x-4 h-full text-white"
                onMouseMove={() => setDashboardOpen(true)}
                onMouseLeave={() => setDashboardOpen(false)}
              >
                <div className="cursor-pointer font-semibold h-full flex  justify-start  text-[22px] gap-4">
                  <Image
                    src={avatar}
                    alt="profile"
                    className="rounded-full h-7 w-7 object-cover"
                  ></Image>
                  <p>{userInfo.name.split(" ")[0]}</p>
                </div>
              </div>
            ) : (
              <div className="flex justify-start items-center space-x-2  border-b border-[#414652]">
                {/* <div className='py-1 px-3 text-white  w-max bg-transparent cursor-pointer border-2 border-white rounded-md  hover:bg-brand_color font-md'>
                    <Link href='/sign-up'>SIGN UP</Link>
                  </div> */}
                {pathname === "/login" ? null : (
                  <Link href="/login">
                    <div className="py-2  text-white  w-max bg-gray-900 cursor-pointer rounded-md  hover:bg-brand_color text-[22px] font-semibold">
                      Log in
                    </div>
                  </Link>
                )}
              </div>
            )}

            {dashboardOpen && isLogged && (
              <div
                className="absolute w-42 top-[36%] left-12 z-100 bg-white text-black p-2  rounded-md"
                onMouseMove={() => setDashboardOpen(true)}
                // onMouseLeave={() => setDashboardOpen(false)}
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
                      className="rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                    >
                     
                      <div className="flex items-center gap-4 text-xl font-normal mb-2">
                        <div>
                          <FiLogOut className="" />
                        </div>
                        <div>
                          <p> Logout</p>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Link
                      href="/dashboard#profile"
                      className="rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                    >
                      <div className="flex items-center gap-4 text-xl font-normal">
                        <div>
                          <MdAccountCircle className="text-2xl" />
                        </div>
                        <div>
                          <p> Profile</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard#history"
                      className=" rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                    >
                      <div className="flex items-center gap-4 text-xl font-normal">
                        <div>
                          <GrOrderedList className="" />
                        </div>
                        <div>
                          <p> Order History</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard#attended-events"
                      className=" rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                    >
                      <div className="flex items-center gap-4 text-xl font-normal">
                        <div>
                          <MdOutlineEmojiEvents className="" />
                        </div>
                        <div>
                          <p> Attended Events</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/dashboard#download-tickets"
                      className=" rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                    >
                      <div className="flex items-center gap-4 text-xl font-normal">
                        <div>
                          <IoMdDownload className="" />
                        </div>
                        <div>
                          <p>Download Tickets</p>
                        </div>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
