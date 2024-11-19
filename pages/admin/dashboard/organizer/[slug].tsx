import StoreSetting from '@/components/admin/organizerDetailsPage/storeSetting';
import Loader from '@/components/common/Loader';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAdminEventById, getAgentEventById } from 'redux/slices/EventSlice';
import { getAgentById } from 'redux/slices/agentSlice';
const Layout = dynamic(import('@/components/layouts/Admin'));

const Index = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.adminReducer.adminInfo.token);
  const agent = useAppSelector((state) => state.agentReducer.getAgentById.data);
  const status = useAppSelector(
    (state) => state.agentReducer.getAgentById.status
  );

  const { query } = router;
  const { slug } = query;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentById({ token, id: slug }));
  }, [slug, token, dispatch]);

  return (
    <Loader status={status}>
      <div className='w-full h-full relative'>
        <StoreSetting agent={agent} />{' '}
      </div>
    </Loader>
  );
};

Index.Layout = Layout;
export default Index;
