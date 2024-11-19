import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import Search from '../../common/Search';
import TablePagination from '../../ui/TablePagination';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAllAgentByAdmin } from 'redux/slices/agentSlice';
import Loader from '@/components/common/Loader';
import { Router, useRouter } from 'next/router';

const Organizer = () => {
  const admin = useAppSelector((state) => state.adminReducer.adminInfo.token);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllAgentByAdmin(admin));
  }, [dispatch, admin]);
  const agentsData = useAppSelector(
    (state) => state.agentReducer.getAllAgentByAdmin
  );

  const { data, status } = agentsData;

  const [searchedUsers, setSearchedUsers] = useState<any>([]);

  useEffect(() => {
    setSearchedUsers(data);
  }, [data]);

  // table config
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    if (searchedUsers?.length > 0) {
      return searchedUsers.slice((current - 1) * pageSize, current * pageSize);
    } else return [];
  };
  function handleSearch({ searchText }: { searchText: any }) {
    if (searchText) {
      const searchTerm = searchText.toLowerCase();

      const users_by_email = data.filter((user: any) =>
        user?.email.toLowerCase().includes(searchTerm)
      );

      const users__by_name = data.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm)
      );

      setSearchedUsers([...users_by_email, ...users__by_name]);
    } else {
      setSearchedUsers(data);
    }
  }
  const csvData = searchedUsers;
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'businessDetails',
      className: 'm-2',
      key: 'name',
      align: 'left',
      render: (businessDetails: any) => <p>{businessDetails.brandName}</p>,
    },
    {
      title: 'Representative',
      dataIndex: 'representativeDetails',
      className: 'm-2',
      key: 'representativeDetails',
      align: 'left',
      render: (representativeDetails: any) => (
        <p>{representativeDetails.representativeName}</p>
      ),
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
      dataIndex: 'businessDetails',

      className: 'm-2',
      key: 'businessDetails',

      align: 'center',
      render: (businessDetails: any) => <p>{businessDetails.businessPhone}</p>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      className: 'm-2',
      key: 'category',
      align: 'center',
    },
    {
      title: 'Seat Limit',
      dataIndex: 'limits',
      className: 'm-2',
      key: 'limits',
      align: 'center',
      render: (limits: any) => <p>{limits.maxSeats}</p>,
    },
    {
      title: 'No of Events',
      dataIndex: 'analytics',
      className: 'm-2',
      key: 'analytics',
      align: 'center',
      render: (analytics: any) => <p>{analytics.totalEvents}</p>,
    },
  ];
  const router = useRouter();
  return (
    <Loader status={status}>
      <div className='text-black p-4'>
        <p className='dashboard_title'>All Organizer</p>

        <div className='bg-white mt-4'>
          <div className='flex justify-between items-center'>
            <div className='w-full md:w-1/2 flex flex-col md:flex-row align-center ms-auto'>
              <Search onSearch={handleSearch} title={'Find an organizer'} />
            </div>
            <div>
              <Link href='/admin/dashboard/addOrganizer'>
                <div className='text-xl justify-center items-center flex space-x-2 mb-2 bg-brand_gradient px-4 py-2 rounded-3xl text-white w-max'>
                  <p>Add Organizer </p> <BsPlusCircle />
                </div>
              </Link>
            </div>
          </div>
          <div className='w-full h-full grid grid-cols-1'>
            <Table
              //@ts-ignore
              columns={columns}
              className='w-full py-2'
              rowClassName='px-2 h-10 border-b-[1px] border-brand_color cursor-pointer'
              emptyText={'Empty table data'}
              data={getData(current, size)}
              onRow={(record, index) => ({
                onClick: () => {
                  router.push('/admin/dashboard/organizer/' + record._id);
                },
              })}
              scroll={{ x: true }}
              rowKey='_id'
            />

            <TablePagination
              current={current}
              size={size}
              setSize={setSize}
              setCurrent={setCurrent}
              data={data}
            />
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default Organizer;
