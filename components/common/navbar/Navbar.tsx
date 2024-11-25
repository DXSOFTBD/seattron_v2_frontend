import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import { FiLogOut } from "react-icons/fi";
import logo from "/public/assets/logo/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { logout } from "redux/slices/userSlice";
import avatar from "/public/assets/logo/user.png";
import { MdAccountCircle, MdOutlineEmojiEvents } from "react-icons/md";
import { GrOrderedList } from "react-icons/gr";

const Navbar: React.FC<{}> = () => {
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const isLogged = useAppSelector((state) => state.userReducer.success);
  const userInfo = useAppSelector((state) => state.userReducer.userInfo);
  const dispatch = useAppDispatch();

  const handleMobileMenu = () => {
    setIsOpenMobileMenu(!isOpenMobileMenu);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    router.push("/"); // Navigate to the home page
  };

  return (
    <div className="relative h-16 z-[4000] overflow:hidden bg-navbar_trans shadow-trans_nav backdrop-blur-sm font-lato">
      <div className="px-4 lg:px-24 w-full h-full flex items-center">
        {/* Mobile View */}
        <div className="md:hidden">
          <Link href="/">
            <div className="cursor-pointer">
              <Image
                src={logo}
                alt="logo"
                className="h-8 md:h-10 lg:h-12 w-min mt-0 md:mt-4"
              ></Image>
            </div>
          </Link>
          <div
            className="h-full absolute right-4 top-4 z-10"
            onClick={handleMobileMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="block h-6 w-6 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Desktop View */}
        <div className="md:flex justify-between items-center h-full w-full hidden">
          {/* Logo */}
          <div className="flex w-full h-full items-center">
            <Link href="/">
              <Image
                src={logo}
                className="h-12 w-min text-white"
                alt="logo"
              ></Image>
            </Link>
          </div>

          {/* Right Navbar */}
          <div className="flex h-full w-full justify-end items-center space-x-3 text-white">
            <div className="text-nav font-medium flex items-center justify-center space-x-4 h-full">
              <ul className="flex h-full justify-start items-center ml-0 lg:ml-6 space-x-6 font-medium text-white">
                <li className="hover:underline">
                  <Link href="/events">Events</Link>
                </li>
                <li className="hover:underline">
                  <Link href="/about-us">About Us</Link>
                </li>
              </ul>

              {isLogged ? (
                <div
                  className="relative flex flex-col justify-center items-center pl-4 space-x-4 h-full text-white"
                  onMouseMove={() => setDashboardOpen(true)}
                  onMouseLeave={() => setDashboardOpen(false)}
                >
                  <div className="cursor-pointer font-semibold h-full flex justify-center items-center space-x-2">
                    <Image
                      src={avatar}
                      alt="profile"
                      className="rounded-full h-6 w-6 object-cover"
                    ></Image>
                    <p>{userInfo.name.split(" ")[0]}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-center items-center space-x-2">
                  {pathname === "/login" ? null : (
                    <Link href="/login">
                      <div className="py-2 px-3 text-white w-max bg-gray-900 cursor-pointer rounded-md hover:bg-brand_color font-md">
                        Log in
                      </div>
                    </Link>
                  )}
                </div>
              )}

              {dashboardOpen && isLogged && (
                <div
                  className="absolute w-42 top-16 right-12 z-100 bg-gray-600 text-white p-2 rounded-md"
                  onMouseMove={() => setDashboardOpen(true)}
                  onMouseLeave={() => setDashboardOpen(false)}
                >
                  <ul>
                    <li>
                      <Link
                        href="/dashboard?page=profile"
                        className="rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                      >
                        <MdAccountCircle className="" />
                        <p>Profile</p>
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href='/dashboard?page=history'
                        className='rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <GrOrderedList className='' />
                        <p>Order History</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/dashboard?page=attended-events'
                        className='rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <MdOutlineEmojiEvents className='' />
                        <p>Attended Events</p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href='/dashboard?page=download-tickets'
                        className='rounded-md z-[10000] py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4'
                      >
                        <MdOutlineEmojiEvents className='' />
                        <p>Download Tickets</p>
                      </Link>
                    </li> */}
                    <li>
                      <div
                        onClick={handleLogout}
                        className="rounded-md py-2 hover:bg-gray-600 hover:text-white px-4 w-full flex items-center justify-start cursor-pointer space-x-4"
                      >
                        <FiLogOut className="" />
                        <p>Logout</p>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="z-[4000]">
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
