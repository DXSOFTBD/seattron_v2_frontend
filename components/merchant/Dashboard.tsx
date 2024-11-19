import ColumnChart from '../common/widgets/column-chart';
import Table from 'rc-table';
import TablePagination from '../ui/TablePagination';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAgentEvents } from 'redux/slices/EventSlice';
import Loader from '../common/Loader';
import Image from 'next/image';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import Link from 'next/link';
import NotificationCard from '../common/dashboard/NotificationCard';
import ActivityCard from '../common/dashboard/activityCard';
import { ordersByAgent } from 'redux/slices/orderSlice';
import { format } from 'date-fns';
import { notificationByAgent } from 'redux/slices/notificationSlice';
import { getLogsByAgent } from 'redux/slices/logSlice';
import { getAgentAnalytics } from 'redux/slices/analyticsSlice';
import StickerCard from '../common/dashboard/sticker-card';
const Dashboard = (props: any) => {
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const [event, setEvent] = useState('');
  const [showEvent, setShowEvent] = useState(false);
  const dates = ['Last 30 days', 'Last week', 'Last year'];
  const [date, setDate] = useState('');
  const [showDates, setShowDates] = useState(false);
  const dispatch = useAppDispatch();

  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);

  useEffect(() => {
    dispatch(getAgentEvents(agent.token));
    dispatch(ordersByAgent(agent.token));
    dispatch(notificationByAgent(agent.token));
    dispatch(getLogsByAgent(agent.token));
    dispatch(getAgentAnalytics(agent.token));
  }, [dispatch, agent.token]);

  const eventsData = useAppSelector((state) => state.eventReducer.getAgentEvents);
  // activities
  const agentLogs = useAppSelector(
    (state) => state.logReducer.getLogsByAgent.data
  );
  //analytics
  const analytics = useAppSelector(
    (state) => state.analyticsReducer.getAgentAnalytics.data
  );
  //  events
  const { status } = eventsData;
  const events = eventsData.data;

  // notification
  const notification = useAppSelector(
    (state) => state.notificationReducer.notificationByAgent.data
  );

  // read notification function

  // get table data
  const orders = useAppSelector((state) => state.orderReducer.ordersByAgent.data);
  const order_status = useAppSelector(
    (state) => state.orderReducer.ordersByAgent.status
  );
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    return orders.slice((current - 1) * pageSize, current * pageSize);
  };

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

  return (
    <div className='w-full font-lato pb-4'>
      <div>
        <div className='flex items-center justify-start space-x-4 my-2'>
          <div className='flex items-center justify-center h-10 w-auto'>
            {agent.logo && (
              <Image
                src={process.env.NEXT_PUBLIC_SERVER_HOST + agent.logo}
                alt='logo'
                className='h-10 w-full  object-cover'
                width={30}
                height={30}
              ></Image>
            )}
          </div>
          <p className='dashboard_secondary_title'>
            {agent?.businessDetails?.brandName}
          </p>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6'>
          <div className='w-full '>
            <StickerCard title='Total Orders' value={analytics.totalTicketSold} />
          </div>
          <div className='w-full '>
            <StickerCard
              title='Total Sell'
              value={Number(analytics.totalSoldAmount).toFixed(2)}
            />
          </div>
          <div className='w-full '>
            <StickerCard title='Total Events' value={analytics.totalEvents} />
          </div>
        </div>

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6'>
          <div className='w-full '>
            <StickerCard
              title='Total Received Amount'
              value={Number(analytics.settledAmount).toFixed(2)}
            />
          </div>
          <div className='w-full '>
            <StickerCard
              title='Total Receivable Amount '
              value={Number(analytics.remainingAmount).toFixed(2)}
            />
          </div>
          <div className='w-full '>
            <StickerCard
              title='Remaining Seats'
              value={analytics.remainingSeats}
            />
          </div>
        </div>
      </div>
      <Loader status={status}>
        <div className='w-full h-full grid grid-cols-1 pb-20'>
          <div>
            <p className='dashboard_secondary_title'>Life time ticket sales</p>
            <div className='p-8 float-right'>
              <div className='flex lg:space-x-10 relative'>
                <div
                  className='flex items-center z-20 justify-center space-x-3 cursor-pointer'
                  onClick={() => setShowEvent(!showEvent)}
                >
                  <p>{event ? event : 'Select event'}</p>

                  <span>
                    {showEvent ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                  </span>
                </div>
                <div
                  className={`bg-gray-300 text-black absolute top-10 md:top-10 left-0 rounded-md ro z-50 py-4 flex-col flex items-start justify-start space-y-2`}
                >
                  {showEvent && (
                    <div>
                      <div
                        onClick={() => {
                          setEvent('All events');
                          setShowEvent(false);
                        }}
                        className='cursor-pointer text-start w-full h-full py-2 px-4 text-gray-900 hover:text-gray-100 hover:bg-brand_color hover:text-gray-brand_color'
                      >
                        All Events
                      </div>
                      {events &&
                        events.map((event: any) => (
                          <div
                            key={event._id}
                            onClick={() => {
                              setEvent(event.name);
                              const newOrder = orders.filter(
                                (order: any) => order.event._id === event._id
                              );

                              setShowEvent(false);
                            }}
                            className='cursor-pointer text-start w-full h-full py-2 px-4 text-gray-900 hover:text-gray-100 hover:bg-brand_color hover:text-gray-brand_color'
                          >
                            {event.name}
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div
                  className='flex items-center z-20 justify-center space-x-3 cursor-pointer'
                  onClick={() => setShowDates(!showDates)}
                >
                  <p>{date ? date : 'Last 30 days'} </p>
                  <span>
                    {showDates ? <IoMdArrowDropup /> : <IoMdArrowDropdown />}
                  </span>
                </div>
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
          <div className='w-full h-full'>
            <ColumnChart
              colors={['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']}
              series={[
                223, 324, 324, 234, 223, 324, 324, 234, 234, 123, 234, 234, 123,
                324, 324, 234, 234, 123, 234, 234, 123, 324, 324, 234, 234, 123,
                234, 234, 123,
              ]}
              categories={[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17.18, 19,
                20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
              ]}
              totalValue={2344}
            />
          </div>
        </div>
      </Loader>
      <div className='grid grid-cols-1  gap-6 mb-4 rounded-lg '>
        <div className='rounded mb-6  border-brand_color text-center'>
          <div className='flex justify-between items-center mx-auto  p-4 text-gray-900'>
            <p className='dashboard_secondary_title'>Recent orders</p>
            <Link href='/merchant/dashboard/order'>
              <p className='border-[1px] border-brand_color px-2 py-2 rounded-md hover:bg-brand_color hover:text-white'>
                View all orders
              </p>
            </Link>
          </div>
          <Loader status={order_status}>
            <Table
              //@ts-ignore
              columns={columns}
              rowClassName={({ paid }) =>
                paid
                  ? 'px-2 h-10 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-green-100'
                  : 'px-2 h-10 border-b-[1px] border-brand_color w-full overflow-x-scroll'
              }
              className='text-sm border-t-[1px] border-brand_color shadow-md'
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
          </Loader>
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
            <Link href={'/merchant/dashboard/activity'}>
              <p className='rounded-md px-2 py-1 bg-gray-200 cursor-pointer border-[1px] border-brand_color hover:text-white hover:bg-brand_color'>
                See all activity
              </p>
            </Link>
          </div>
          <div className='bg-white border-2 shadow-md rounded-md my-4 p-4 '>
            {agentLogs
              ? agentLogs
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
