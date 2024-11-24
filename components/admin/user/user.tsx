import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import Search from '../../common/Search';
import TablePagination from '../../ui/TablePagination';
import Link from 'next/link';
import { useAppSelector } from 'redux/hooks';
import axios from '@/axios/config';
import { VscUnverified } from 'react-icons/vsc';
import { format } from 'date-fns';
import { MdVerified } from 'react-icons/md';
import Loader from '@/components/common/Loader';

const User = () => {
  const admin: any = useAppSelector((state) => state.adminReducer.adminInfo);
  const [searchedUsers, setSearchedUsers] = useState<any>([]);
  const [status, setStatus] = useState('loading');
  const [users, setUsers] = useState<any>([]);

  useEffect(() => {
    axios
      .get(`users/`, {
        headers: { Authorization: `Bearer ${admin.token}` },
      })
      .then((res) => {
        setUsers(res.data);
        setStatus('success');
        setSearchedUsers(res.data);
      })
      .catch((err) => {
        // console.log(err);
        setStatus('failed');
      });
  }, [admin.token]);

  // useEffect(() => {
  //   setSearchedUsers(users);
  // }, [users]);

  // table config
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    if (searchedUsers.length > 0) {
      return searchedUsers.slice((current - 1) * pageSize, current * pageSize);
    } else return [];
  };
  function handleSearch({ searchText }: { searchText: any }) {
    if (searchText) {
      setCurrent(1);
      const searchTerm = searchText.toLowerCase().trim();

      const users_email = users.filter((user: any) =>
        user?.email.toLowerCase().includes(searchTerm)
      );

      const users__by_name = users.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm)
      );

      setSearchedUsers([...users_email, ...users__by_name]);
    } else {
      setSearchedUsers(users);
    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      className: '',
      key: 'name',
      align: 'left',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      className: '',
      key: 'email',
      align: 'left',
    },
    {
      title: 'Verified',
      dataIndex: 'emailVerified',
      className: '',
      key: 'emailVerified',
      align: 'left',
      render: (emailVerified: any) => (
        <div className='text-left w-full p-1'>
          {emailVerified ? (
            <div className='w-6 h-6 text-green-500 rounded-full'>
              <MdVerified />
            </div>
          ) : (
            <VscUnverified className='text-red-500 w-6 h-6' />
          )}
        </div>
      ),
    },
    {
      title: 'Registered At',
      dataIndex: 'createdAt',
      className: ' min-w-32 px-2',
      key: 'createdAt',
      align: 'left',
      width: 200,
      render: (createdAt: any) => <p> {format(new Date(createdAt), 'Pp')}</p>,
    },
  ];

  return (
    <div>
      <div className='text-black p-4'>
        <p className='dashboard_title'>All Users</p>

        <div className='bg-white mt-4'>
          <div className='flex justify-between items-center'>
            <div className='w-full md:w-1/2 flex flex-col md:flex-row align-center ms-auto'>
              <Search title='Find a user' onSearch={handleSearch} />
            </div>
            <div>
              <Link href='/merchant/dashboard/createOrders'>
                <div className='text-xl justify-center items-center flex space-x-2 mb-2 bg-brand_gradient px-4 py-2 rounded-3xl text-white w-max'>
                  <p>Add User </p> <BsPlusCircle />
                </div>
              </Link>
            </div>
          </div>
          <Loader status={status}>
            <div className='w-full h-full grid grid-cols-1'>
              <Table
                //@ts-ignore
                columns={columns}
                className='w-full'
                rowClassName='p-2 border-b-[1px] border-brand_color'
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
                data={searchedUsers}
              />
            </div>
          </Loader>
        </div>
      </div>
    </div>
  );
};

export default User;
