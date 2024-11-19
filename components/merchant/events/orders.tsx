import Table from 'rc-table';
import React, { useEffect, useState } from 'react';
import { BsPlusCircle } from 'react-icons/bs';
import Search from '../../common/Search';
import { CSVLink } from 'react-csv';
import TablePagination from '../../ui/TablePagination';
import { format } from 'date-fns';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import { getAgentEvents } from 'redux/slices/EventSlice';
import { ordersByAgent } from 'redux/slices/orderSlice';
import Loader from '@/components/common/Loader';

const Orders = () => {
  // agent info
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAgentEvents(agent.token));
    dispatch(ordersByAgent(agent.token));
  }, [dispatch, agent.token]);
  const events = useAppSelector(
    (state: any) => state.eventReducer.getAgentEvents.data
  );
  const [event, setEvent] = useState<any>();
  const [showEvent, setShowEvent] = useState(false);
  // agent all orders
  const orders = useAppSelector(
    (state) => state.orderReducer.ordersByAgent.data
  );
  const status = useAppSelector(
    (state) => state.orderReducer.ordersByAgent.status
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
      className: 'px-2',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      width: 200,
      render: (_id: any) => <p className=''>{_id}</p>,
    },
    {
      title: 'Customer Details',
      dataIndex: 'name',
      className: 'border-r-[1px] border-l-[1px] border-brand_color',
      key: 'name',
      align: 'center',
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
          id_number,
        }: any
      ) => (
        <div className='p-2 text-start w-full'>
          {/* <p className=''>Name: {name}</p>
          <p className=''>Email: {email}</p> */}
          <div className=''>{name ? <p>Name: {name}</p> : null}</div>
          <div className=''>{email ? <p>Email: {email}</p> : null}</div>
          <div className=''>{id_number ? <p>ID: {id_number}</p> : null}</div>
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
      render: (event: any) => <p> {event.name}</p>,
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
      className: 'border-r-[1px] border-l-[1px] border-brand_color ',
      key: 'paymentInfo',
      align: 'left',
      render: (paymentInfo: any) => {
        return (
          <div>
            {paymentInfo?.tran_id === 'FREE!' ? (
              <p className='p-4'>FREE!</p>
            ) : null}
            {paymentInfo ? (
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
                    <p>
                      Card issuer country: {paymentInfo.card_issuer_country}
                    </p>
                  ) : null}
                </div>

                <div className=''>
                  {paymentInfo.card_type ? (
                    <p>Card type: {paymentInfo.card_type}</p>
                  ) : null}
                </div>
              </div>
            ) : null}
          </div>
        );
      },
    },

    {
      title: 'CreatedAt',
      dataIndex: 'createdAt',
      className: 'm-2 min-w-32 px-2',
      key: 'createdAt',
      align: 'left',
      width: 200,
      render: (createdAt: any) => <p> {format(new Date(createdAt), 'Pp')}</p>,
    },
  ];
  // console.log(orders)
  return (
    <Loader status={status}>
      <div className='text-black bg-white'>
        <p className='dashboard_title'>All Orders</p>
        {/* <div>
          <Link href='/merchant/dashboard/createOrders'>
            <div className='text-xl justify-center items-center flex space-x-2 mb-2 bg-brand_gradient px-4 py-2 rounded-3xl text-white w-max'>
              <p>Create order </p> <BsPlusCircle />
            </div>
          </Link>
        </div> */}

        <div className='bg-white mt-4'>
          <div className='flex  flex-col md:flex-row justify-start md:justify-between items-start md:items-center'>
            <div className='w-150 md:w-1/2 flex flex-col md:flex-row align-center ms-auto'>
              <Search onSearch={handleSearch} />
            </div>
            <div className='flex space-x-4 items-center justify-center relative'>
              <div
                className='flex items-center px-4 py-2 rounded-lg  relative justify-center space-x-3 cursor-pointer bg-brand_gradient text-white'
                onClick={() => setShowEvent(!showEvent)}
              >
                <p>{event ? event : 'Select event'}</p>

                <div>
                  {showEvent ? (
                    <IoMdArrowDropup className='h-6 w-6' />
                  ) : (
                    <IoMdArrowDropdown className='h-6 w-6' />
                  )}
                </div>
              </div>
              <div
                className={`bg-gray-300 text-black absolute top-10 md:top-10 left-0 rounded-md ro z-50 py-4 flex-col flex items-start justify-start space-y-2`}
              >
                {showEvent && (
                  <div>
                    <div
                      onClick={() => {
                        setSearchedOrders(orders);
                        setShowEvent(false);
                        setEvent('All events');
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

                            setSearchedOrders(newOrder);
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
              <CSVLink
                data={csvData}
                className='bg-brand_color text-white text-lg px-4 py-2 rounded-md flex space-x-2 items-center'
              >
                Export
              </CSVLink>
            </div>
          </div>
          {searchedOrders && (
            <div className='w-full overflow-x-scroll h-full grid grid-cols-1'>
              <Table
                //@ts-ignore
                columns={columns}
                className='w-full'
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
          )}
        </div>
      </div>
    </Loader>
  );
};

export default Orders;
