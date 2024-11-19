import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAgentEventById } from 'redux/slices/EventSlice';
const Layout = dynamic(import('@/components/layouts/Agent'));
const UpdateEvent = dynamic(import('@/components/merchant/events/updateEvent'));

const Index = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.agentReducer.agentInfo.token);
  const eventData = useAppSelector(
    (state) => state.eventReducer.agentEventById
  );
  const { query } = router;
  const { slug } = query;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentEventById({ token, slug }));
  }, [slug, token, dispatch]);

  return (
    <div className='w-full h-full'>
      <UpdateEvent eventData={eventData} />
    </div>
  );
};

Index.Layout = Layout;
export default Index;
