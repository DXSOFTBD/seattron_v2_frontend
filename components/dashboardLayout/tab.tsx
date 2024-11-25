// "use client"
// import { useRouter } from 'next/router';

// const Tab = () => {
//   const router = useRouter();
  
//   // Handle page navigation
//   const handleClick = (page: string) => {
//     router.push(`/dashboard?page=${page}`);
//   };

//   // Handle redirect to the home page
//   const handleHomeRedirect = () => {
//     router.push('/');
//   };

//   return (
//     <div className="w-[200px] h-screen bg-[#131921] p-4 text-white">
//       <ul className="space-y-4">
//       <li>
//           <button
//             onClick={handleHomeRedirect}
//             className="text-white hover:text-blue-500"
//           >
//             Home
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => handleClick('profile')}
//             className="text-white hover:text-blue-500"
//           >
//             Profile
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => handleClick('history')}
//             className="text-white hover:text-blue-500"
//           >
//             History
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => handleClick('attended-events')}
//             className="text-white hover:text-blue-500"
//           >
//             Attended Events
//           </button>
//         </li>
//         <li>
//           <button
//             onClick={() => handleClick('download-tickets')}
//             className="text-white hover:text-blue-500"
//           >
//             Download Tickets
//           </button>
//         </li>
//         {/* Home Button */}
        
//       </ul>
//     </div>
//   );
// };

// export default Tab;


'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  MdMoney,
  MdOutlineProductionQuantityLimits,
  MdReport,
  MdSell,
} from 'react-icons/md';
import ProfilePublic from '../dashboardPublicContent/Profile/ProfilePublic';
import HistoryPublic from '../dashboardPublicContent/History/HistoryPublic';
import AttendedEventsPublic from '../dashboardPublicContent/AttendedEvents/AttendedEventsPublic';
import DownloadTicketsPublic from './../dashboardPublicContent/DownloadTickets/DownloadTicketsPublic';


const Tab = () => {
  const items = [
    {
      name: 'Profile',
      path: 'profile',
      icon: MdSell,
      component: <ProfilePublic />, // Add the respective component here
    },
    {
      name: 'History',
      path: 'history',
      icon: MdOutlineProductionQuantityLimits,
      component: <HistoryPublic />,
    },
    {
      name: 'Attended Events',
      path: 'attended-events',
      icon: MdReport,
      component: <AttendedEventsPublic />,
    },
    {
      name: 'Download Tickets',
      path: 'download-tickets',
      icon: MdMoney,
      component: <DownloadTicketsPublic />,
    },
  ];

  const [activeTab, setActiveTab] = useState('profile'); // Default active tab

  return (
    <div className='flex'>
      {/* Sidebar */}
      <div
        className={`w-[200px] block border-gray-100 pl-primary py-primary bg-brand_gradient
          transition-all duration-200 h-screen text-black p-2`}
      >
        <div>
          {items.map((item) => (
            <div
              key={item.name}
              onClick={() => setActiveTab(item.path)} // Set active tab on click
              className={`flex items-center justify-start space-x-2 px-2 py-2 relative cursor-pointer hover:bg-white hover:text-black 
                ${
                  activeTab === item.path
                    ? 'relative active_menu bg-white text-black rounded-l-lg'
                    : 'menu'
                }`}
            >
              <item.icon
                className={`${
                  activeTab === item.path ? 'active_menu_icon' : 'menu_icon'
                }`}
              />
              <p className='paragraph'>{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className='flex-1 p-4'>
        {items.find((item) => item.path === activeTab)?.component}
      </div>
    </div>
  );
};

export default Tab;


