import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import Search from '../../common/Search';
import TablePagination from '../../ui/TablePagination';
import Link from 'next/link';
import { useAppDispatch } from 'redux/hooks';
import { getAgentEvents } from 'redux/slices/EventSlice';
import { TiTick } from 'react-icons/ti';
import ComingSoon from '@/components/common/comingSoon';

const User = () => {
  const users = [
    {
      _id: 23,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 23345,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 231453,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 23345,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 23246554,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 2342353,

      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 2345233,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 234453,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 213453,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 23443153,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 2345312,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 234531235,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
    {
      _id: 23423153,
      name: 'jahid',
      type: 'admin',
      email: 'jahid@.com',
      phone: '01423434643',
      status: 'ok',
      amount: 234,
      ticketType: 'Classic',
      quantity: 23,
      time: '11:00 pm',
    },
  ];

  const [searchedUsers, setSearchedUsers] = useState<any>([]);

  // useEffect(() => {
  //   setSearchedUsers(users);
  // }, [users]);

  // table config
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    if (users.length > 0) {
      return users.slice((current - 1) * pageSize, current * pageSize);
    } else return [];
  };
  function handleSearch({ searchText }: { searchText: any }) {
    if (searchText) {
      const searchTerm = searchText.toLowerCase();

      const users_by_id = users.filter((user: any) =>
        user?.userId.toLowerCase().includes(searchTerm)
      );

      const users__by_name = users.filter((user: any) =>
        user.userName.toLowerCase().includes(searchTerm)
      );

      setSearchedUsers([...users_by_id, ...users__by_name]);
    } else {
      setSearchedUsers(users);
    }
  }
  const csvData = searchedUsers;
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: 'm-2',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      className: 'm-2',
      key: 'type',
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: 'm-2',
      key: 'email',
      align: 'left',
    },

    {
      title: 'Phone',
      dataIndex: 'phone',
      className: 'm-2',
      key: 'phone',
      align: 'left',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      className: 'm-2',
      key: 'status',
      align: 'left',
      render: (status: any) => (
        <div className='w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center'>
          <TiTick />
        </div>
      ),
    },
  ];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentEvents);
  }, [dispatch]);

  return (
    <ComingSoon>
      <div className='text-black p-4'>
        <p className='dashboard_title'>All Users</p>

        <div className='bg-white mt-4'>
          <div className='flex justify-between items-center'>
            <div className='w-full md:w-1/2 flex flex-col md:flex-row align-center ms-auto'>
              <Search onSearch={handleSearch} />
            </div>
            <div>
              <Link href='/merchant/dashboard/createOrders'>
                <div className='text-xl justify-center items-center flex space-x-2 mb-2 bg-brand_gradient px-4 py-2 rounded-3xl text-white w-max'>
                  <p>Add User </p> <BsPlusCircle />
                </div>
              </Link>
            </div>
          </div>
          <div className='w-full h-full grid grid-cols-1'>
            <Table
              //@ts-ignore
              columns={columns}
              className='w-full py-1'
              rowClassName='px-2 h-10 border-b-[1px] border-brand_color'
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
              data={users}
            />
          </div>
        </div>
      </div>
    </ComingSoon>
  );
};

export default User;
