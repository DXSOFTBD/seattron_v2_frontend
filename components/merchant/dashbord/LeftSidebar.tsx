import { GoDash } from 'react-icons/go';
import {
  MdLocalOffer,
  MdOutlineEventAvailable,
  MdOutlineSupportAgent,
} from 'react-icons/md';
import logo from 'public/assets/logo/Seattorn Logo-02.svg';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import { CgInsights, CgMenu } from 'react-icons/cg';
import { TfiAnnouncement, TfiTicket } from 'react-icons/tfi';
import { BsPlusCircle } from 'react-icons/bs';
import { FiActivity, FiUser } from 'react-icons/fi';
import { AiOutlineOrderedList } from 'react-icons/ai';
import { FcMoneyTransfer } from 'react-icons/fc';

const LeftSidebar = ({ isMenuOpen, setIsMenuOpen }: any) => {
  const router = useRouter();
  const { pathname } = router;

  const drawerData: any = [
    {
      name: 'Dashboard',
      path: '/merchant/dashboard',
      icon: GoDash,
    },

    {
      name: 'Events',
      path: '/merchant/dashboard/events',
      icon: MdOutlineEventAvailable,
    },
    {
      name: 'Order',
      path: '/merchant/dashboard/order',
      icon: AiOutlineOrderedList,
    },
    {
      name: 'Report',
      path: '/merchant/dashboard/report',
      icon: CgInsights,
    },
    // {
    //   name: 'User',
    //   path: '/merchant/dashboard/user',
    //   icon: FiUser,
    // },
    // {
    //   name: 'Discount',
    //   path: '/merchant/dashboard/discount',
    //   icon: MdLocalOffer,
    // },
    {
      name: 'Settlement',
      path: '/merchant/dashboard/settlement',
      icon: FcMoneyTransfer,
    },
    {
      name: 'Store Setting',
      path: '/merchant/dashboard/store-setting',
      icon: MdOutlineSupportAgent,
    },
    {
      name: 'Ticket Checker',
      path: '/merchant/dashboard/ticket-checking',
      icon: TfiTicket,
    },
    {
      name: 'Support',
      path: '/merchant/dashboard/support',
      icon: MdOutlineSupportAgent,
    },
    // {
    //   name: 'Marketing',
    //   icon: TfiAnnouncement,
    //   path: 'merchant/dashboard/marketing',
    // },
    {
      name: 'Activity',
      icon: FiActivity,
      path: 'merchant/dashboard/activity',
    },
  ];

  return (
    <div className='font-lato text-sm z-[3000]'>
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
                    onClick={() => router.push('/merchant/dashboard/marketing')}
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
              if (link.name === 'Activity') {
                return (
                  <div
                    className={
                      link.path === pathname
                        ? ' hovered_bg menuDrawer-item flex  items-center space-x-3'
                        : 'menuDrawer-item flex  items-center  space-x-3'
                    }
                    onClick={() => router.push('/merchant/dashboard/activity')}
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

              if (link.name === 'Events') {
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
                            router.push('/merchant/dashboard/addEvents')
                          }
                        />
                      </p>
                    </div>
                  </div>
                );
              } else {
                // single drawer route
                return (
                  <div
                    className={
                      link.path === pathname
                        ? ' hovered_bg menuDrawer-item flex  items-center space-x-3'
                        : 'menuDrawer-item flex  items-center  space-x-3'
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
