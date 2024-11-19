import { GoDashboard, GoRequestChanges } from 'react-icons/go';
import {
  MdArrowDropDown,
  MdLocalOffer,
  MdOutlineEventAvailable,
  MdOutlineSupportAgent,
  MdPolicy,
} from 'react-icons/md';
import logo from 'public/assets/logo/Seattorn Logo-02.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import {
  CgInsights,
  CgMenu,
  CgNotifications,
  CgOrganisation,
} from 'react-icons/cg';
import { TfiAnnouncement } from 'react-icons/tfi';
import { BsPlusCircle } from 'react-icons/bs';
import { FiActivity, FiUser } from 'react-icons/fi';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { FcMoneyTransfer, FcSettings } from 'react-icons/fc';
import { RxActivityLog } from 'react-icons/rx';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAdminRequest } from 'redux/slices/requestSlice';

const LeftSidebar = ({ isMenuOpen, setIsMenuOpen }: any) => {
  const [activity, setActivity] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  const dispatch = useAppDispatch();
  const admin = useAppSelector((state) => state.adminReducer.adminInfo);

  useEffect(() => {
    dispatch(getAdminRequest(admin.token));
  }, [admin.token, dispatch]);
  const requests = useAppSelector(
    (state) => state.requestReducer.getAdminRequest
  );
  const { data, status } = requests;

  const pendingData = data.filter(
    (request: any) => !request.isApproved && !request.isRejected
  );
  const notification = useAppSelector((state) =>
    state.notificationReducer.notificationByAdmin.data?.filter(
      (data: any) => data.read === false
    )
  );
  const drawerData: any = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: GoDashboard,
    },
    {
      name: 'Organizer',
      path: '/admin/dashboard/organizer',
      icon: CgOrganisation,
    },

    {
      name: 'Events',
      path: '/admin/dashboard/events',
      icon: MdOutlineEventAvailable,
    },
    {
      name: 'Order',
      path: '/admin/dashboard/order',
      icon: AiOutlineOrderedList,
    },
    {
      name: 'Report',
      path: '/admin/dashboard/report',
      icon: CgInsights,
    },
    {
      name: 'User',
      path: '/admin/dashboard/user',
      icon: FiUser,
    },
    {
      name: 'Settlement',
      path: '/admin/dashboard/settlement',
      icon: FcMoneyTransfer,
    },
    {
      name: 'Employee Role',
      path: '/admin/dashboard/employee-role',
      icon: FiUser,
    },

    // {
    //   name: 'Discount',
    //   path: '/admin/dashboard/discount',
    //   icon: MdLocalOffer,
    // },
    // {
    //   name: 'Marketing',
    //   icon: TfiAnnouncement,
    //   path: 'admin/dashboard/marketing',
    // },
    // {
    //   name: 'Policy:Terms & Conditions',
    //   path: '/admin/dashboard/policy',
    //   icon: MdPolicy,
    // },
    {
      name: 'Request',
      path: '/admin/dashboard/request',
      icon: GoRequestChanges,
    },
    {
      name: 'Notice',
      path: '/admin/dashboard/notice',
      icon: CgNotifications,
    },
    {
      name: 'Activity',

      subpath: [
        {
          name: 'Admin Logs',
          path: '/admin/dashboard/admin-activity',
          icon: FiActivity,
        },
        {
          name: 'System Logs',
          path: '/admin/dashboard/system-activity',
          icon: FiActivity,
        },
      ],
      icon: RxActivityLog,
    },
    {
      name: 'Settings',
      path: '/admin/dashboard/settings',
      icon: FcSettings,
    },
  ];
  useEffect(() => {
    if (pathname.includes('activity')) {
      setActivity(true);
    }
  }, [pathname]);
  return (
    <div className='font-lato text-sm'>
      <div
        className={isMenuOpen ? 'w-[220px] md:w-[220px]' : 'md:w-[120px] w-0'}
      >
        <div className='flex items-center justify-center'>
          <Link href='/'>
            <Image
              src={logo}
              alt='logo'
              className='h-12 w-min text-white left-2 -z-10'
            ></Image>
          </Link>
          <div>
            <CgMenu
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='cursor-pointer text-white m-2 block'
            />
          </div>
        </div>
        <div className=' menuDrawer text-start'>
          <div className='py-5 '>
            {/* Drawer groups */}
            {drawerData.map((link: any) => {
              if (link.name === 'Marketing') {
                return (
                  <div
                    className={
                      link.path === pathname
                        ? ' hovered_bg menuDrawer-item flex  items-center space-x-3'
                        : 'menuDrawer-item flex  items-center  space-x-3'
                    }
                    onClick={() => router.push('/admin/dashboard/marketing')}
                    key={link.name}
                  >
                    <div>
                      <link.icon className='h-6 w-6' />
                    </div>
                    <div className={isMenuOpen ? 'md:block' : 'hidden '}>
                      <p>{link.name}</p>
                    </div>
                  </div>
                );
              }
              if (link.name === 'Organizer') {
                return (
                  <div
                    className={
                      link.path === pathname
                        ? ' hovered_bg menuDrawer-item flex  items-center space-x-3'
                        : 'menuDrawer-item flex  items-center  space-x-3'
                    }
                    key={link.name}
                  >
                    <div
                      className='flex justify-center items-center space-x-3'
                      onClick={() => router.push(link.path)}
                    >
                      <div>
                        <link.icon className='h-6 w-6' />
                      </div>
                      <div className={isMenuOpen ? 'md:block' : 'hidden '}>
                        <p>{link.name}</p>
                      </div>
                    </div>

                    <div>
                      <p>
                        <BsPlusCircle
                          className='h-6 w-6'
                          onClick={() =>
                            router.push('/admin/dashboard/addOrganizer')
                          }
                        />
                      </p>
                    </div>
                  </div>
                );
              } else if (link.name === 'Activity') {
                return (
                  <div key={link.name}>
                    <div
                      onClick={() => setActivity(!activity)}
                      className={
                        activity
                          ? 'hovered_bg menuDrawer-item'
                          : 'menuDrawer-item'
                      }
                    >
                      <div className='flex items-center'>
                        <div className='mr-2'>
                          <link.icon />
                        </div>
                        <div className={isMenuOpen ? '' : 'hidden'}>
                          <p>{link.name}</p>
                        </div>
                        <div className='ml-6'>
                          <MdArrowDropDown fontSize='medium' />
                        </div>
                      </div>
                      <div
                        className={
                          isMenuOpen ? 'subdrawer' : 'absolute subdrawer'
                        }
                      >
                        <div className={activity ? 'block' : 'hidden'}>
                          {link.subpath.map((subLink: any) => (
                            <div
                              onClick={() => router.push(subLink.path)}
                              className={
                                subLink.path === pathname
                                  ? 'subLink subLink_bg'
                                  : 'subLink'
                              }
                              key={subLink.name}
                            >
                              <div className='mr-2'>
                                <subLink.icon fontSize='small' />
                              </div>
                              <small>{subLink.name}</small>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              } else {
                // single drawer route
                return (
                  <div
                    className={
                      link.path === pathname
                        ? ' hovered_bg menuDrawer-item flex  items-center space-x-2 relative'
                        : 'menuDrawer-item flex  items-center  space-x-2 relative'
                    }
                    onClick={() => router.push(link.path)}
                    key={link.name}
                  >
                    <div>
                      <link.icon className='h-6 w-6' />
                    </div>
                    <div className={isMenuOpen ? 'md:block' : 'hidden '}>
                      <p>{link.name}</p>
                    </div>
                    <div className='absolute top-[1.5] right-4'>
                      {link.name === 'Request' && pendingData.length > 0 ? (
                        <div className='text-white px-2 py-1 rounded-md bg-red-500'>
                          {pendingData.length}
                        </div>
                      ) : null}
                    </div>
                    <div className='absolute top-[1.5] right-4'>
                      {link.name === 'Notice' && notification.length > 0 ? (
                        <div className='text-white px-2 py-1 rounded-md bg-red-500'>
                          {notification.length}
                        </div>
                      ) : null}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default LeftSidebar;
