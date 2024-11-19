import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { formats, modules } from '@/components/common/editor';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
const UpdateTicketForm = ({
  setTicketData,
  setShowModal,
  seatData,
  ticket,
}: any) => {
  const remainingSeat = (seatData.maxSeats - seatData.currentSeatCount) + ticket.limit;
  const createTicketSchema = Yup.object().shape({
    package: Yup.string().required('Package is required'),
    limit: Yup.number()
      .max(
        remainingSeat,
        'Exceeded seat limit. Available seat ' + remainingSeat
      )
      .min(1, 'Enter positive number ')
      .required('Ticket limit is required'),

    price: Yup.string(),
    details: Yup.string().test(
      'details',
      'Details not exceed 300 characters',
      (val): any => val && val.toString().length <= 300
    ),
  });

  return (
    <div className=''>
      {/* <Breadcrumb from='giftCard' /> */}

      <div className='my-4'>
        <Formik
          initialValues={{
            package: ticket.package,
            limit: ticket.limit,
            details: ticket.details,
            price: ticket.price,
            date: ticket.date,
            time: ticket.time,
          }}
          validationSchema={createTicketSchema}
          onSubmit={(values: any) => {
            const ticketDetails = {
              package: values.package,
              limit: values.limit,
              details: values.details,
              price: values.price,
            };

            setTicketData(ticketDetails);
            setShowModal(true);
          }}
        >
          {({ errors, touched }: any) => (
            <Form className='mt-4 text-start font-lato max-w-[700px] mb-4'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='relative'>
                  <label htmlFor='package'>Package Name</label>
                  <Field
                    name='package'
                    placeholder='Enter ticket name'
                    className='border-[1px] border-brand_color outline-none mt-2 text-gray-800 bg-white w-full  h-10  text-sm px-2 py-1 rounded-md '
                  ></Field>
                  <div>
                    {errors.package && touched.package ? (
                      <small className='text-red-400'>{errors.package}</small>
                    ) : null}
                  </div>
                </div>

                <div className='relative'>
                  <label htmlFor='limit'>Seat Capacity</label>
                  <Field
                    name='limit'
                    type='number'
                    className='bg-gray-50 mt-2 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                    placeholder='Enter seat capacity'
                  />
                  <div>
                    {errors.limit && touched.limit ? (
                      <small className='text-red-400'>{errors.limit}</small>
                    ) : null}
                  </div>
                </div>
                {
                  ticket.isPaid && <div className='relative'>
                    <label htmlFor='price'>Ticket Price</label>
                    <Field
                      name='price'
                      type='number'
                      className='bg-gray-50 mt-2 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                      placeholder='Ticket price'
                    />
                    <div>
                      {errors.price && touched.price ? (
                        <small className='text-red-400'>{errors.price}</small>
                      ) : null}
                    </div>
                  </div>
                }

              </div>
              <div className='relative col-span-2 mt-4'>
                <label htmlFor='' className='w-full font-semibold'>
                  Enter ticket details <small className='font-normal'>(max 300 characters)</small>
                </label>

                <Field name='details' className='my-2'>
                  {({ field }: any) => (
                    <ReactQuill
                      value={field.value}
                      onChange={field.onChange(field.name)}
                      className=' my-4'
                      formats={formats}
                      modules={modules}
                      bounds={'#root'}
                    />
                  )}
                </Field>

                <div>
                  {errors.details && touched.details ? (
                    <small className='text-red-400'>{errors.details}</small>
                  ) : null}
                </div>
              </div>

              <button
                className='py-2 mt-6 mb-4 px-2 w-fit rounded-md hover:bg-cyan-700 bg-brand_color text-white'
                type='submit'
              >
                Update Ticket
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateTicketForm;
