import TablePagination from '@/components/ui/TablePagination';
import { format } from 'date-fns';
import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import DonutChart from '../../widgets/donut-chart';

const EventEntryList = ({ list }: any) => {
  // table data
  // console.log(list);
  const [perPage, setPerPage] = useState(5);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    return entryData.slice((current - 1) * pageSize, current * pageSize);
  };
  // filtering list
  const [showFilter, setShowFilter] = useState(false);
  const [entryType, setEntryType] = useState('');
  const entryTypes = ['All', 'Entered', 'Not Entered'];
  const enteredList = list.filter((entry: any) => entry.entry === true);
  const NotEnteredList = list.filter((entry: any) => entry.entry === false);
  const [entryData, setEntryData] = useState(list);
  useEffect(() => {
    if (entryType === 'All') {
      setEntryData(list);
    }
    if (entryType === 'Entered') {
      setEntryData(enteredList);
    }
    if (entryType === 'Not Entered') {
      setEntryData(NotEnteredList);
    }
  }, [entryType, enteredList, NotEnteredList, list]);
  // export data
  const csvData = entryData;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      className: 'px-2 ',
      align: 'center',
      width: 150,
      render: (_id: any) => <p className=''>{_id}</p>,
    },
    {
      title: 'Customer Details',
      dataIndex: 'name',
      className:
        'min-w-[300px] px-2 border-r-[1px] border-l-[1px] border-brand_color',
      key: 'name',
      align: 'center',
      width: 150,
      render: (name: any, { email, phone }: any) => (
        <div className=' p-4'>
          <p className='font-bold'>Name: {name}</p>
          <p className='font-bold'>Email: {email}</p>
          <div className=''>{phone ? <p>Phone: {phone}</p> : null}</div>
        </div>
      ),
    },
    {
      title: 'Ticket Type',
      dataIndex: 'package',
      className: 'm-2',
      key: 'package',
      width: 150,
      align: 'center',
    },

    {
      title: 'Price',
      className: '',
      dataIndex: 'price',
      width: 150,
      key: 'price',
      align: 'center',
    },
    {
      title: 'Entry',
      dataIndex: 'entry',
      className: 'm-2',
      width: 150,
      key: 'entry',
      align: 'center',

      render: (entry: any) => <p className=''>{entry ? 'Yes' : 'NO'}</p>,
    },
    {
      title: 'Entry By',
      dataIndex: 'entryBy',
      className: 'm-2',
      width: 150,
      key: 'entryBy',
      align: 'center',
      render: (entryBy: any) => <p>{entryBy?.name}</p>,
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      className: 'm-2 min-w-32',
      key: 'createdAt',
      align: 'left',
      width: 200,
      render: (entryTime: any) => <p> {format(new Date(entryTime), 'Pp')}</p>,
    },
  ];

  return (
    <div className='my-6 w-full h-full'>
      <div className='flex flex-wrap-reverse lg:grid grid-cols-4'>
        <div className='col-span-3'>
          <div className='flex justify-between my-2'>
            <p className='dashboard_secondary_title'>{entryType} List</p>
            <div className='flex justify-center space-x-4'>
              <div
                className='flex items-center z-20 justify-center space-x-1 cursor-pointer text-gray-800 relative'
                onClick={() => setShowFilter(!showFilter)}
              >
                <p>{entryType ? entryType : 'Filter'}</p>

                <span>
                  {showFilter ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                </span>
                <div
                  className={`bg-gray-100 text-black absolute top-10 md:top-10 right-0 rounded-md ro z-50 py-4 flex-col flex items-start justify-start space-y-2`}
                >
                  {showFilter && (
                    <div>
                      {entryTypes.map((type: any) => (
                        <div
                          key={type}
                          onClick={() => {
                            setEntryType(type);

                            setShowFilter(false);
                          }}
                          className='cursor-pointer text-start w-150 h-full py-2 px-4 text-gray-900 hover:text-gray-100 hover:bg-brand_color hover:text-gray-brand_color'
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <CSVLink
                data={csvData}
                className='bg-brand_color text-white text-lg px-4 w-max py-2 rounded-md flex space-x-2 items-center'
              >
                Export
              </CSVLink>
            </div>
          </div>
          <Table
            //@ts-ignore
            columns={columns}
            rowClassName={({ entry }) =>
              entry
                ? 'px-2 h-16 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-green-100'
                : 'px-2 h-16 border-b-[1px] border-brand_color w-full overflow-x-scroll'
            }
            className='text-sm p-2 border-t-[1px] border-brand_color shadow-md'
            emptyText={'Empty table data'}
            data={getData(current, size)}
            rowKey='id'
            scroll={{ x: true }}
          />
          <TablePagination
            current={current}
            size={size}
            setSize={setSize}
            setCurrent={setCurrent}
            data={entryData}
          />
        </div>

        <div className=' flex items-center justify-center'>
          <DonutChart
            series={[enteredList.length, NotEnteredList.length]}
            colors={['rgba(62, 240, 30, 0.61)', 'rgba(249, 35, 32, 0.7)']}
            labels={['Entered', 'Not Entered']}
          />
        </div>
      </div>
    </div>
  );
};

export default EventEntryList;
