import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAdminEventById } from 'redux/slices/EventSlice';
const Layout = dynamic(import('@/components/layouts/Admin'));
const SingleEvent = dynamic(
  import('@/components/common/dashboard/event/singleEvent')
);

const Index = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.adminReducer.adminInfo.token);
  const eventData = useAppSelector(
    (state) => state.eventReducer.getAdminEventById
  );

  const { query } = router;
  const { slug } = query;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAdminEventById({ token, slug }));
  }, [slug, token, dispatch]);

  return (
    <div className='w-full h-full'>
      <SingleEvent eventData={eventData} />
    </div>
  );
};

Index.Layout = Layout;
export default Index;
