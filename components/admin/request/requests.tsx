import Loader from '@/components/common/Loader';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAdminRequest } from 'redux/slices/requestSlice';
import Request from './request';

const Requests = () => {
  const [selectedTab, setSelectedTab] = useState('Pending');
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
  const approvedData = data.filter(
    (request: any) => request.isApproved === true
  );
  const rejectedData = data.filter(
    (request: any) => request.isRejected === true
  );

  const tabs = ['Pending', 'Approved', 'Rejected', 'All'];
  return (
    <Loader status={status}>
      <div className='flex items-center w-375 justify-between border-b-2 border-brand_color'>
        {tabs.map((tab, index) => (
          <div
            key={index + 1}
            className={` py-2 px-4 cursor-pointer text-lg ${
              selectedTab === tab
                ? 'border-b-[2px] border-brand_color bg-brand_color rounded-t-lg text-white '
                : ''
            }`}
            onClick={() => setSelectedTab(tab)}
          >
            {tab}
          </div>
        ))}
      </div>
      <div>
        {selectedTab === 'All' &&
          data.map((req: any) => <Request key={req._id} req={req} />)}
      </div>
      <div>
        {selectedTab === 'Pending' ? (
          pendingData?.length ? (
            pendingData.map((req: any) => <Request key={req._id} req={req} />)
          ) : (
            <p className='dashboard_secondary_title py-16 pl-16 '>
              No New Request!
            </p>
          )
        ) : null}
      </div>
      <div>
        {selectedTab === 'Approved' &&
          approvedData &&
          approvedData.map((req: any) => <Request key={req._id} req={req} />)}
      </div>
      <div>
        {selectedTab === 'Rejected' &&
          rejectedData &&
          rejectedData.map((req: any) => <Request key={req._id} req={req} />)}
      </div>
    </Loader>
  );
};

export default Requests;
