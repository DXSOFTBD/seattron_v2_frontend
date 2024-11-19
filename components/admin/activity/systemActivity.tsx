import Loader from '@/components/common/Loader';
import TablePagination from '@/components/ui/TablePagination';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getSystemLogs } from 'redux/slices/logSlice';

const SystemActivity = () => {
  // get admin data
  const admin = useAppSelector((state) => state.adminReducer.adminInfo);
  // get log from redux
  const logData = useAppSelector((state) => state.logReducer.getSystemLogs);
  const { data, status } = logData;
  // call logs
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSystemLogs(admin.token));
  }, [dispatch, admin.token]);

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
      <p className='dashboard_title'>System Activity</p>
      <Loader status={status}>
        {limitedData.map((log: any) => (
          <div
            key={log._id}
            className={`
            ${
              log.type === 'success' ? 'border-t-[5px] border-green-200' : ''
            } ${log.type === 'failed' ? 'border-t-[5px] border-red-200' : ''}
               bg-gray-100 text-gray-900 flex justify-between items-center rounded-md my-3 w-full shadow-md text-md py-1 font-medium px-4`}
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
  );
};

export default SystemActivity;
