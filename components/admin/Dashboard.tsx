import StickerCard from '../common/dashboard/sticker-card';
import ColumnChart from '../common/widgets/column-chart';
import Table from 'rc-table';
import TablePagination from '../ui/TablePagination';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAdminEvents, getAgentEvents } from 'redux/slices/EventSlice';
import Loader from '../common/Loader';
import Image from 'next/image';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Link from 'next/link';
import NotificationCard from '../common/dashboard/NotificationCard';
import ActivityCard from '../common/dashboard/activityCard';
import { getAllAdminOrders } from 'redux/slices/orderSlice';
import { format } from 'date-fns';
import { getAdminAnalytics } from 'redux/slices/analyticsSlice';
import { getLogsByAdmin } from 'redux/slices/logSlice';
import { notificationByAdmin } from 'redux/slices/notificationSlice';
import { Dropdown } from '../common/dashboard/dropdown';
const Dashboard = (props: any) => {
  const [perPage, setPerPage] = useState(5);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [event, setEvent] = useState<any>({});
  const [showEvent, setShowEvent] = useState(false);
  const dates = ['Last 30 days', 'Last week', 'Last year'];
  const [date, setDate] = useState('');
  const [showDates, setShowDates] = useState(false);
  const [toggleChart, setToggleChart] = useState('Sales Amount');
  const [showChart, setShowChart] = useState(false);
  const chartTypes = ['Sales Amount', 'Success Orders'];
  const dispatch = useAppDispatch();
  // admin details
  const admin: any = useAppSelector((state) => state.adminReducer.adminInfo);

  //calling necessary data for dashboard
  useEffect(() => {
    dispatch(getAdminEvents(admin.token));
    dispatch(getAllAdminOrders(admin.token));
    dispatch(getAdminAnalytics(admin.token));
    dispatch(getLogsByAdmin(admin.token));
    dispatch(notificationByAdmin(admin.token));
  }, [dispatch, admin.token]);

  //  events
  const eventsData = useAppSelector(
    (state) => state.eventReducer.getAdminEvents
  );
  const { status } = eventsData;
  const events = eventsData.data;

  // activities
  const adminLogs = useAppSelector(
    (state) => state.logReducer.getLogsByAdmin.data
  );

  //analytics
  const analytics = useAppSelector(
    (state) => state.analyticsReducer.getAdminAnalytics.data
  );

  // notification
  const notification = useAppSelector(
    (state) => state.notificationReducer.notificationByAdmin.data
  );

  // get table data
  const orders = useAppSelector(
    (state) => state.orderReducer.getAllAdminOrders.data
  );

  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    return orders.slice((current - 1) * pageSize, current * pageSize);
  };
  // graph data
  const graphDates = analytics?.ordersByDay?.map((order: any) => {
    return new Date(order.date).toDateString();
  });
  const graphData = analytics?.ordersByDay?.map((order: any) => {
    return order.count;
  });

  const saleAmount = analytics?.ordersByDay?.map((order: any) => {
    return order.totalAmount;
  });

  const columns = [
    {
      title: 'Order ID',
      dataIndex: '_id',
      key: '_id',
      className: 'px-2',
      align: 'center',
      width: 100,

      render: (_id: any) => <p className=''>{_id}</p>,
    },
    {
      title: 'Customer Details',
      dataIndex: 'name',
      className: 'px-2',
      key: 'name',
      align: 'center',

      render: (name: any, { email }: any) => (
        <div>
          <p className=''>{name}</p>
          <p className=''>{email}</p>
        </div>
      ),
    },

    {
      title: 'Event',
      dataIndex: 'event',
      className: 'm-2',
      key: 'event',
      align: 'center',

      render: (event: any) => event.name,
    },
    {
      title: 'Package Name',
      dataIndex: 'package',
      className: 'm-2',
      key: 'package',
      align: 'center',
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      className: 'm-2',
      key: 'paid',
      align: 'center',

      render: (paid: any) => <p className=''>{paid ? 'Yes' : 'NO'}</p>,
    },
    {
      title: 'price',
      className: '',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
    },
    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      className: 'm-2 min-w-32',
      key: 'createdAt',
      align: 'left',
      width: 200,
      render: (createdAt: any) => <p> {format(new Date(createdAt), 'Pp')}</p>,
    },
  ];
  console.log(event);
  return (
    <div className='w-full font-lato pb-4'>
      <div>
        <div className='flex items-center justify-start space-x-4 my-2'>
          {admin.logo && (
            <div className='flex items-center justify-center h-10 w-auto'>
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_HOST + admin.logo}
                alt='logo'
                className='h-10 w-full  object-cover'
                width={30}
                height={30}
              ></Image>
            </div>
          )}

          <p className='dashboard_secondary_title'>{admin.name}</p>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6'>
          <div className='w-full '>
            <StickerCard
              title='Live Events'
              pillColor='green-500'
              value={Number(analytics.liveEvents)}
            />
          </div>
          <div className='w-full '>
            <StickerCard title='Total Events' value={analytics.totalEvents} />
          </div>
          <div className='w-full '>
            <StickerCard
              title='Total Order'
              value={Number(analytics.totalOrders).toFixed(2)}
            />
          </div>
          <div className='w-full '>
            <StickerCard title='Total Agents' value={analytics.totalAgents} />
          </div>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6'>
          <div className='w-full '>
            <StickerCard title='Total User' value={analytics.totalUsers} />
          </div>
          <div className='w-full '>
            <StickerCard
              title='Total Revenue'
              value={Number(analytics.totalRevenue).toFixed(2)}
            />
          </div>
          <div className='w-full'>
            <StickerCard
              title='Total Paid'
              value={Number(analytics.totalPaidToAgents).toFixed(2)}
            />
          </div>
          <div className='w-full '>
            <StickerCard
              title='Total Payable'
              pillColor='red-500'
              value={Number(analytics.totalPayableToAgents).toFixed(2)}
            />
          </div>
        </div>
      </div>
      <Loader status={status}>
        <div className='w-full h-full grid grid-cols-1 pb-20'>
          <div>
            <p className='dashboard_secondary_title'>Life time ticket sales</p>
            <div className='p-8'>
              <div className='flex justify-between lg:space-x-10 relative'>
                <div className='relative'>
                  <div
                    className='flex items-center z-20 justify-center space-x-3 cursor-pointer'
                    onClick={() => setShowChart(!showChart)}
                  >
                    <p>{toggleChart}</p>

                    <span>
                      {showChart ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </span>
                  </div>
                  <div
                    className={`bg-gray-200  text-gray-900 absolute top-10 md:top-6 right-0 rounded-md ro z-10 py-4 flex-col flex items-start justify-start space-y-2`}
                  >
                    {showChart &&
                      chartTypes.map((type: any, index) => (
                        <div
                          key={index + 1}
                          onClick={() => {
                            setToggleChart(type);
                            setShowChart(false);
                          }}
                          className='cursor-pointer text-start w-full h-full py-2 px-4 text-gray-900 hover:text-gray-100 hover:bg-brand_color hover:text-gray-brand_color'
                        >
                          {type}
                        </div>
                      ))}
                  </div>
                </div>

                <div className='flex items-center justify-center space-x-6'>
                  <div
                    className='flex items-center z-20 justify-center space-x-3 cursor-pointer relative'
                    onClick={() => setShowEvent(!showEvent)}
                  >
                    <p>{event?.name ? event.name : 'Select event'}</p>

                    <span>
                      {showEvent ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </span>
                    <div>
                      <div>
                        <Dropdown
                          borderRadius='5px'
                          data={events}
                          width='100%'
                          name='goodsName'
                          setFieldValue={setEvent}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className='flex items-center z-20 justify-center space-x-3 cursor-pointer relative'
                    onClick={() => setShowDates(!showDates)}
                  >
                    <p>{date ? date : 'Last 30 days'} </p>
                    <span>
                      {showDates ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                    </span>

                    <div
                      className={`bg-gray-200 text-gray-900 absolute top-10 md:top-6 right-0 rounded-md ro z-10 py-4 flex-col flex items-start justify-start space-y-2`}
                    >
                      {events &&
                        showDates &&
                        dates.map((date: any, index) => (
                          <div
                            key={index + 1}
                            onClick={() => setDate(date)}
                            className='cursor-pointer text-start w-full h-full py-2 px-4 text-gray-900 hover:text-gray-100 hover:bg-brand_color hover:text-gray-brand_color'
                          >
                            {date}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          {graphDates && graphData && (
            <div className='w-full h-full'>
              {toggleChart === 'Success Orders' && (
                <ColumnChart
                  colors={[
                    '#2E93fA',
                    '#66DA26',
                    '#546E7A',
                    '#E91E63',
                    '#FF9800',
                  ]}
                  categories={graphDates}
                  series={graphData}
                  title={'Sale Count'}
                />
              )}
              {toggleChart === 'Sales Amount' && (
                <ColumnChart
                  colors={[
                    '#2E93fA',
                    '#66DA26',
                    '#546E7A',
                    '#E91E63',
                    '#FF9800',
                  ]}
                  categories={graphDates}
                  series={saleAmount}
                  title={'Sale Amount'}
                />
              )}
            </div>
          )}
        </div>
      </Loader>
      <div className='grid lg:grid-cols-3 grid-cols-1 gap-6 mb-4 rounded-lg '>
        <div>
          <div className=' mx-auto  p-4 text-gray-900'>
            <p className='dashboard_secondary_title'>Employee Role</p>
          </div>
          <Table
            //@ts-ignore
            columns={[
              {
                title: 'Name',
                dataIndex: 'name',
                className: '',
                key: 'name',
                align: 'center',
              },
              {
                title: 'Role',
                dataIndex: 'role',
                className: '',
                key: 'role',
                align: 'center',
              },
            ]}
            rowClassName='px-2 h-12 w-full overflow-x-scroll'
            className='text-sm p-2  shadow-md'
            emptyText={'Empty table data'}
            data={[
              { name: 'Rahim', role: 'Editor', _id: 1 },
              { name: 'Rahman', role: 'Editor', _id: 2 },
              { name: 'Rohit', role: 'Editor', _id: 3 },
              { name: 'Ayush', role: 'Admin', _id: 4 },
              { name: 'Farhan', role: 'Admin', _id: 5 },
            ]}
            rowKey='_id'
            scroll={{ x: true }}
          />
        </div>
        <div className='rounded mb-6  border-brand_color text-center md:col-span-2'>
          <div className='flex justify-between items-center mx-auto  p-4 text-gray-900'>
            <p className='dashboard_secondary_title'>Recent orders</p>
            <Link href='/merchant/dashboard/order'>
              <p className='border-[1px] border-brand_color px-2 py-2 rounded-md hover:bg-brand_color hover:text-white'>
                View all orders
              </p>
            </Link>
          </div>
          <Table
            //@ts-ignore
            columns={columns}
            rowClassName={({ paid }) =>
              paid
                ? 'px-2 h-16 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-green-100'
                : 'px-2 h-16 border-b-[1px] border-brand_color w-full overflow-x-scroll'
            }
            className='text-sm p-2 border-t-[1px] border-brand_color shadow-md'
            emptyText={'Empty table data'}
            data={getData(current, size)}
            rowKey='_id'
            scroll={{ x: true }}
          />
          <TablePagination
            current={current}
            size={size}
            setSize={setSize}
            setCurrent={setCurrent}
            data={orders}
          />
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 mt-4 gap-6 lg:gap-12 w-full h-full'>
        <div className='w-full h-full'>
          <p className='dashboard_secondary_title'>Notices</p>
          <div className='my-4'>
            {notification.length ? (
              notification
                .slice(0, 5)
                .map((notice: any) => (
                  <NotificationCard key={notice._id} data={notice} />
                ))
            ) : (
              <p
                className='px-4 py-4 text-black bg-gray-100
                '
              >
                Empty Notification
              </p>
            )}
          </div>
        </div>
        <div className='pb-6'>
          <div className='flex items-center justify-between'>
            <p className='dashboard_secondary_title'>Activity</p>
            <Link href={'/admin/dashboard/admin-activity'}>
              <p className='rounded-md px-2 py-1 bg-gray-200 cursor-pointer border-[1px] border-brand_color hover:text-white hover:bg-brand_color'>
                See all activity
              </p>
            </Link>
          </div>

          <div className='bg-white border-2 shadow-md rounded-md my-4 p-4'>
            {adminLogs
              ? adminLogs
                  .slice(0, 5)
                  .map((activity: any) => (
                    <ActivityCard key={activity._id} data={activity} />
                  ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
