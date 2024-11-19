import { Field, Form, Formik } from 'formik';
import Table from 'rc-table';
import React, { useState } from 'react';
import ComingSoon from '../common/comingSoon';
import TablePagination from '../ui/TablePagination';

const Discount = () => {
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const discounts = [
    {
      _id: 234353,
      discount_code: 'jahid',
      email: 'jahid@.com',
      event: 'Helping hands',
      amount: '12-12-23',
      discount_type: 234,
      percentage: 'paid',
      limit: 23,
    },
    {
      _id: 2342353,
      discount_code: 'jahid',
      email: 'jahid@.com',
      event: 'Helping hands',
      amount: '12-12-23',
      discount_type: 234,
      percentage: 'paid',
      limit: 23,
    },
    {
      _id: 2345233,
      discount_code: 'jahid',
      email: 'jahid@.com',
      event: 'Helping hands',
      amount: '12-12-23',
      discount_type: 234,
      percentage: 'paid',
      limit: 23,
    },
    {
      _id: 234453,
      discount_code: 'jahid',
      email: 'jahid@.com',
      event: 'Helping hands',
      amount: '12-12-23',
      discount_type: 234,
      percentage: 'paid',
      limit: 23,
    },
  ];

  const getData = (current: any, pageSize: any) => {
    // Normally you should get the data from the server
    return discounts.slice((current - 1) * pageSize, current * pageSize);
  };

  const columns = [
    {
      title: 'Discount Code',
      dataIndex: 'discount_code',
      className: 'h-20 px-2',
      key: 'discount_code',
      align: 'left',
      width: 200,
    },

    {
      title: 'Event Name',
      dataIndex: 'event',
      className: 'm-2',
      key: 'event',
      align: 'center',
      width: 200,
    },
    {
      title: 'Limit of use',
      dataIndex: 'limit',
      className: 'm-2',
      key: 'limit',
      align: 'center',
      width: 200,
    },
    {
      title: 'Discount type',
      className: '',
      dataIndex: 'discount_type',
      key: 'discount_type',
      align: 'center',
      width: 200,
    },
    {
      title: 'Amount',
      className: '',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      width: 200,
    },
    {
      title: 'Percentage',
      className: '',
      dataIndex: 'percentage',
      key: 'percentage',
      align: 'center',
      width: 200,
    },
  ];
  return (
    <ComingSoon>
      <div className='p-4 text-gray-800 bg-white'>
        <p className='dashboard_title'>Create New Discount</p>
        <div>
          <p className='text-2xl'>Select Event</p>
          <Formik
            initialValues={{}}
            validationSchema={''}
            onSubmit={(values: any) => {}}
          >
            {({ errors, touched }) => (
              <Form>
                <div>
                  <div className='flex items-center justify-start my-4'>
                    <p className='w-150'>All</p>
                    <div className='toggle-switch'>
                      <Field
                        type='checkbox'
                        discount_code='admin'
                        value='admin'
                        className='toggle-input'
                      />
                      <label className='toggle-label' />
                    </div>
                  </div>

                  <div className='flex items-center justify-start my-4'>
                    <p className='w-150'>Rocknival</p>
                    <div className='toggle-switch '>
                      <Field
                        type='checkbox'
                        discount_code='editor'
                        value='editor'
                        className='toggle-input'
                      />
                      <label className='toggle-label' />
                    </div>
                  </div>
                  <div className='flex items-center justify-start my-4'>
                    <p className='w-150'>Donation Town</p>
                    <div className='toggle-switch '>
                      <Field
                        type='checkbox'
                        discount_code='ticketChecker'
                        value='ticketChecker'
                        className='toggle-input'
                      />
                      <label className='toggle-label' />
                    </div>
                  </div>
                </div>
                <button
                  className='py-2 mt-6 mb-4 px-2 w-fit rounded-md bg-brand_gradient text-white'
                  type='submit'
                >
                  Next step
                </button>
              </Form>
            )}
          </Formik>
        </div>
        <div>
          <p>Ongoing Discount</p>
          <div>
            <Table
              //@ts-ignore
              columns={columns}
              rowClassName='border-2 px-2 h-16'
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
              data={discounts}
            />
          </div>
        </div>
      </div>
    </ComingSoon>
  );
};

export default Discount;
