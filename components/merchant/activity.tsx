import Loader from '@/components/common/Loader';
import TablePagination from '@/components/ui/TablePagination';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getLogsByAdmin, getLogsByAgent } from 'redux/slices/logSlice';

const Activity = () => {
  // get agent data
  const agent = useAppSelector((state) => state.agentReducer.agentInfo);
  // get log from redux
  const logData = useAppSelector((state) => state.logReducer.getLogsByAgent);
  const { data, status } = logData;
  // call logs
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLogsByAgent(agent.token));
  }, [dispatch, agent.token]);

  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    if (data.length > 0) {
      return data.slice((current - 1) * pageSize, current * pageSize);
    } else return [];
  };
  const limitedData = getData(current, size);
  return (
    <div>
      {' '}
      <div>
        <p className='dashboard_title'>System Activity</p>
        <Loader status={status}>
          {limitedData.map((log: any) => (
            <div
              key={log._id}
              className='bg-gray-100 text-gray-900 flex justify-between items-center rounded-md my-3 w-full shadow-md text-md py-1 font-medium px-4'
            >
              <div className='flex justify-between items-center w-full'>
                <div
                  className='text-sm py-2'
                  dangerouslySetInnerHTML={{
                    __html: log.msg,
                  }}
                />
                {log.date ? (
                  <p className='text-[12px] text-gray-600'>
                    {format(new Date(log.date), 'Pp')}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
          <TablePagination
            current={current}
            size={size}
            setSize={setSize}
            setCurrent={setCurrent}
            data={data}
          />
        </Loader>
      </div>
    </div>
  );
};

export default Activity;
