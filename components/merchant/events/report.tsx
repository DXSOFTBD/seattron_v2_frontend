import React, { useEffect, useState } from 'react';
import ColumnChart from '../../common/widgets/column-chart';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getAgentEvents } from 'redux/slices/EventSlice';
import Table from 'rc-table';
import TablePagination from '@/components/ui/TablePagination';
import { format } from 'date-fns';
import Search from '@/components/common/Search';
import { CSVLink } from 'react-csv';
import { ordersByAgent } from 'redux/slices/orderSlice';
import { getAgentAnalytics } from 'redux/slices/analyticsSlice';
import StickerCard from '@/components/common/dashboard/sticker-card';
import Loader from '@/components/common/Loader';
const Report = () => {
  // agent info
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentEvents(agent.token));
    dispatch(ordersByAgent(agent.token));
    dispatch(getAgentAnalytics(agent.token));
  }, [dispatch, agent.token]);
  // agent all orders
  const orders = useAppSelector(
    (state) => state.orderReducer.ordersByAgent.data
  );
  const status = useAppSelector(
    (state) => state.orderReducer.ordersByAgent.status
  );
  const analytics = useAppSelector(
    (state) => state.analyticsReducer.getAgentAnalytics.data
  );
  const [searchedOrders, setSearchedOrders] = useState<any>([]);
  useEffect(() => {
    setSearchedOrders(orders);
  }, [orders]);
  // table config
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    if (searchedOrders.length > 0) {
      return searchedOrders.slice((current - 1) * pageSize, current * pageSize);
    } else return [];
  };

  // searching orders
  function handleSearch({ searchText }: { searchText: any }) {
    if (searchText) {
      const searchTerm = searchText.toLowerCase();

      const order_by_id = orders.filter((order: any) =>
        order?._id.toLowerCase().includes(searchTerm)
      );

      const orders_by_name = orders.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm)
      );
      const order_by_event = orders.filter((order: any) =>
        order.event.name.toLowerCase().includes(searchTerm)
      );

      setSearchedOrders([...order_by_id, ...orders_by_name, ...order_by_event]);
    } else {
      setSearchedOrders(orders);
    }
  }

  // export data function
  const csvData = orders;
  const columns = [
    {
      title: 'Order ID',
      className: '',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 200,
      render: (_id: any) => <p className=''>{_id}</p>,
    },
    {
      title: 'Customer Details',
      dataIndex: 'name',
      className: 'px-2 border-r-[1px] border-l-[1px] border-brand_color',
      key: 'name',
      align: 'left',
      width: 200,
      render: (
        name: any,
        {
          email,
          phone,
          country,
          city,
          gender,
          occupation,
          age,
          postal_code,
        }: any
      ) => (
        <div className=' p-2 text-start'>
          <p className=''>Name: {name}</p>
          <p className=''>Email: {email}</p>
          <div className=''>{phone ? <p>Phone: {phone}</p> : null}</div>
          <div className=''>{age ? <p>Age: {age}</p> : null}</div>

          <div className=''>{gender ? <p>Gender: {gender}</p> : null}</div>
          <div className=''>
            {occupation ? <p>Occupation: {occupation}</p> : null}
          </div>
          <div className=''>{city ? <p>City: {city}</p> : null}</div>
          <div className=''>{country ? <p>Country: {country}</p> : null}</div>
          <div className=''>
            {postal_code ? <p>Postal Code: {postal_code}</p> : null}
          </div>
        </div>
      ),
    },

    {
      title: 'Event',
      dataIndex: 'event',
      className: 'm-2',
      key: 'event',
      align: 'center',
      width: 200,
      render: (event: any) => event.name,
    },
    {
      title: 'Package Name',
      dataIndex: 'package',
      className: 'm-2',
      key: 'package',
      align: 'center',
      width: 200,
    },
    {
      title: 'Paid',
      dataIndex: 'paid',
      className: 'm-2',
      key: 'paid',
      align: 'center',
      width: 200,
      render: (paid: any) => (
        <div className=''>{paid ? <p className=''>YES</p> : 'NO'}</div>
      ),
    },
    {
      title: 'price',
      className: '',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      width: 200,
    },
    {
      title: 'Payment Information',
      dataIndex: 'paymentInfo',
      className: 'px-2 border-r-[1px] border-l-[1px] border-brand_color ',
      key: 'paymentInfo',
      align: 'center',
      width: 200,
      render: (paymentInfo: any) => {
        return (<div>
          {
            paymentInfo?.tran_id === 'FREE!' ? <p className='p-4'>FREE!</p> : null

          }
          {paymentInfo ?
            <div className='p-4'>
              <div className=''>
                {paymentInfo?.card_brand ? (
                  <p>Card brand: {paymentInfo.card_brand}</p>
                ) : null}
              </div>
              <div className=''>
                {paymentInfo?.card_category ? (
                  <p>Card category: {paymentInfo.card_category}</p>
                ) : null}
              </div>
              <div className=''>
                {paymentInfo.card_issuer ? (
                  <p>Card issuer: {paymentInfo.card_issuer}</p>
                ) : null}
              </div>
              <div className=''>
                {paymentInfo.card_issuer_country ? (
                  <p>Card issuer country: {paymentInfo.card_issuer_country}</p>
                ) : null}
              </div>

              <div className=''>
                {paymentInfo.card_type ? (
                  <p>Card type: {paymentInfo.card_type}</p>
                ) : null}
              </div>
            </div> : null
          }
        </div>)

      },
    },

    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      className: 'm-2 px-2',
      key: 'createdAt',
      align: 'left',
      width: 100,
      render: (createdAt: any) => {
        if (createdAt) {
          return <p> {format(new Date(createdAt), 'Pp')}</p>;
        }
      },
    },
  ];

  const events = useAppSelector(
    (state: any) => state.eventReducer.getAgentEvents.data
  );

  const [event, setEvent] = useState();
  const [showEvent, setShowEvent] = useState(false);
  return (
    <>
      <div className='my-4'>
        <p className='dashboard_title'>Report</p>
      </div>
      {/* total  cards */}
      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6 mt-2'>
        <div className='w-full '>
          <StickerCard title='Total Sell' value={analytics.totalSoldAmount} />
        </div>
        <div className='w-full '>
          <StickerCard
            title='Total Received Amount'
            value={analytics.settledAmount}
          />
        </div>
        <div className='w-full '>
          <StickerCard
            title='Total Receivable Amount'
            value={analytics.remainingAmount}
          />
        </div>
      </div>
      {/* bar chart of total revenue */}
      <div className='text-center'>
        <p className='font-medium text-3xl text-gray-900 my-4 mx-auto px-auto'>
          Life time Revenue
        </p>
        <div className='w-full h-full'>
          <ColumnChart
            colors={['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']}
            series={[
              223, 324, 324, 234, 223, 324, 324, 234, 223, 324, 324, 234,
            ]}
            categories={[
              'jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]}
            totalValue={2344}
          />
        </div>
      </div>
      <div className='text-center relative my-4'>
        <div
          className='flex items-center px-4 py-2 rounded-lg relative justify-center space-x-3 cursor-pointer bg-brand_gradient text-white'
          onClick={() => setShowEvent(!showEvent)}
        >
          <p>{event ? event : 'Select event'}</p>

          <span>
            {showEvent ? (
              <IoMdArrowDropup className='h-6 w-6' />
            ) : (
              <IoMdArrowDropdown className='h-6 w-6' />
            )}
          </span>
        </div>
        <div
          className={`bg-gray-300 text-black w-full absolute top-10 md:top-10 left-0 rounded-md ro z-50 py-4 flex-col flex items-start justify-start space-y-2 ${showEvent ? 'block' : 'hidden'
            }`}
        >
          {showEvent &&
            events.map((event: any) => (
              <div
                key={event._id}
                onClick={() => setEvent(event.name)}
                className='cursor-pointer text-start w-full h-full py-2 px-4 text-gray-900 hover:text-gray-100 hover:bg-brand_color hover:text-gray-brand_color'
              >
                {event.name}
              </div>
            ))}
        </div>
        <p className='font-medium text-3xl text-gray-900 my-4 mx-auto px-auto'>
          Individual Revenue
        </p>
        <div className='w-full h-full'>
          <ColumnChart
            colors={['#2E93fA', '#66DA26', '#546E7A', '#E91E63', '#FF9800']}
            series={[
              223, 324, 324, 234, 223, 324, 324, 234, 223, 324, 324, 234,
            ]}
            categories={[
              'jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ]}
            totalValue={2344}
          />
        </div>
      </div>
      <Loader status={status}>
        <div className='bg-white mt-4'>
          <div className='flex justify-between items-center'>
            <div className='w-full md:w-1/2 flex flex-col md:flex-row align-center ms-auto'>
              <Search onSearch={handleSearch} />
            </div>
            <div className=''>
              <CSVLink
                data={csvData}
                className='bg-brand_color text-white text-lg px-4 py-2 rounded-md flex space-x-2 items-center'
              >
                Export
              </CSVLink>
            </div>
          </div>
          <div className='w-full h-full grid grid-cols-1'>
            <Table
              //@ts-ignore
              columns={columns}
              className='w-full py-2'
              rowClassName={({ paid }) =>
                paid
                  ? 'px-2 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-green-100'
                  : 'px-2 border-b-[1px] border-brand_color w-full overflow-x-scroll'
              }
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
              data={orders}
            />
          </div>
        </div>
      </Loader>
    </>
  );
};

export default Report;
