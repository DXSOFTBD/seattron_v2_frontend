import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getTicketById } from 'redux/slices/ticketSlice';
const Layout = dynamic(import('@/components/layouts/Agent'));
const UpdateTicket = dynamic(
  import('@/components/merchant/tickets/updateTicket')
);

const Index = () => {
  const router = useRouter();
  const token = useAppSelector((state) => state.agentReducer.agentInfo.token);
  const ticketData = useAppSelector(
    (state) => state.ticketReducer.getTicketById
  );
  const { query } = router;
  const { slug } = query;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTicketById({ token, id: slug }));
  }, [slug, token, dispatch]);

  return (
    <div className='w-full h-full'>
      <UpdateTicket ticket={ticketData} />
    </div>
  );
};

Index.Layout = Layout;
export default Index;
