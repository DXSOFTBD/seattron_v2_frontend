import TablePagination from '@/components/ui/TablePagination';
import { format } from 'date-fns';
import Table from 'rc-table';
import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
const EventOrderList = ({ order }: any) => {
  const csvData = order;
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
      className: 'h-20 px-2 border-r-[1px] border-l-[1px] border-brand_color',
      key: 'name',
      align: 'center',
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
        <div className=' p-4'>
          <p className='font-bold'>Name: {name}</p>
          <p className='font-bold'>Email: {email}</p>
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
      className: 'h-20 px-2 border-r-[1px] border-l-[1px] border-brand_color ',
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
      width: 200,
      render: (createdAt: any) => {
        if (createdAt) {
          return <p> {format(new Date(createdAt), 'Pp')}</p>;
        }
      },
    },
  ];
  const [perPage, setPerPage] = useState(5);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    return order.slice((current - 1) * pageSize, current * pageSize);
  };
  return (
    <div className='my-6'>
      <div className='flex justify-between my-2'>
        <p className='dashboard_secondary_title'>Order List</p>
        <CSVLink
          data={csvData}
          className='bg-brand_color text-white text-lg px-4 w-max py-2 rounded-md flex space-x-2 items-center'
        >
          Export
        </CSVLink>
      </div>

      <Table
        //@ts-ignore
        columns={columns}
        rowClassName={({ paid }) =>
          paid
            ? 'px-2 h-10 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-green-100'
            : 'px-2 h-10 border-b-[1px] border-brand_color w-full overflow-x-scroll'
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
        data={order}
      />
    </div>
  );
};

export default EventOrderList;
