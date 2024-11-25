// import { useRouter } from 'next/router';

// const Dashboard = () => {
//   const router = useRouter();
//   const { query } = router;

//   const renderContent = () => {
    
//     switch (query.page) {
//       case 'profile':
//         return <div>Profile Page Content</div>;
//       case 'history':
//         return <div>History Page Content</div>;
//       case 'attended-events':
//         return <div>Attended Events Content</div>;
//       case 'download-tickets':
//         return <div>Download Tickets Content</div>;
//       default:
        
//         return <div>Welcome to the Dashboard</div>;
//     }
//   };

//   return (
//     <div className="p-4">
//       {renderContent()}
//     </div>
//   );
// };

// export default Dashboard;


import React from 'react';
import Tab from './tab';

const Dashboard = () => {
  return (
    <div className='w-full h-full'>
      <Tab />
    </div>
  );
};

export default Dashboard;

