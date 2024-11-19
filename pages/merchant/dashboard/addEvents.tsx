import React from 'react';

import dynamic from 'next/dynamic';
const Layout = dynamic(import('../../../components/layouts/Agent'));
const CreateEvent = dynamic(import('@/components/merchant/events/createEvent'));
const addEvents = () => {
  return (
    <div className='w-full h-full'>
      <CreateEvent />
    </div>
  );
};
addEvents.Layout = Layout;
export default addEvents;
