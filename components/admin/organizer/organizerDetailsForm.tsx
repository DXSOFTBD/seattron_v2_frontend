import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const OrganizerDetails = ({
  setOrganizerDetails,
  bankDetails,
  businessDetails,
  setOrganizerAllData,
  organizerDetails,
  setShowModal,
  setBank,
  setOrganizer,
}: any) => {
  const organizerDetailSchema = Yup.object().shape({
    name: Yup.string().required('Admin name is required'),
    password: Yup.string()
      .required('No password provided.')
      .min(6, 'Password is too short - should be 6 chars minimum.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
    email: Yup.string().email('Invalid email').required('Required'),
    confirmEmail: Yup.string()
      .email('Invalid email')
      .oneOf([Yup.ref('email'), null], 'Emails must match'),
    category: Yup.string().required('category is required'),
    percentage: Yup.number().required('percentage is required'),
    maxEvents: Yup.number().required('Maximum Events number is required'),
    maxTickets: Yup.number().required('Maximum Tickets number is required'),
    maxSeats: Yup.number().required('Maximum Seats number is required'),
  });

  return (
    <div className='font-lato relative'>
      <div className='w-full rounded-md'>
        <div className='text-gray-800 max-w-1280'>
          <div>
            <p className='dashboard_title'>Add Organizer</p>

            {/* for someone else information */}

            <div className='my-4 max-w-[800px]'>
              <Formik
                initialValues={{
                  name: '',
                  password: '',
                  confirmPassword: '',
                  email: '',
                  confirmEmail: '',
                  category: '',
                  percentage: '',
                  maxEvents: '',
                  maxTickets: '',
                  maxSeats: '',
                }}
                validationSchema={organizerDetailSchema}
                onSubmit={(values: any) => {
                  setOrganizerDetails({
                    name: values.name,
                    password: values.password,
                    email: values.email,
                    category: values.category,
                    percentage: values.percentage,
                    limits: {
                      maxEvents: values.maxEvents,
                      maxTickets: values.maxTickets,
                      maxSeats: values.maxSeats,
                    },
                  });
                  setOrganizerAllData({
                    name: values.name,
                    password: values.password,
                    email: values.email,
                    category: values.category,
                    percentage: values.percentage,
                    limits: {
                      maxEvents: values.maxEvents,
                      maxTickets: values.maxTickets,
                      maxSeats: values.maxSeats,
                    },
                    ...businessDetails,
                    bankDetails,
                  });
                  setShowModal(true);
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form className='mt-4 text-start font-lato'>
                    <div className='grid grid-cols-2  gap-x-6 gap-y-2'>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Admin Name*
                        </label>
                        <Field
                          name='name'
                          className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  h-8  text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.name && touched.name ? (
                            <small className='text-red-400 mt-1'>
                              {errors.name}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative text-black'>
                        <label htmlFor='' className='form_label'>
                          Organizer Category
                        </label>
                        <Field
                          name='category'
                          as='select'
                          onClick={(e: any) =>
                            setFieldValue('category', e.target.value)
                          }
                          defaultValue='concert'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                        >
                          <option value='none' defaultChecked>
                            None
                          </option>
                          <option value='concert'>Concert</option>
                          <option value='sport'>Sport</option>

                          <option value='movie'>Movie</option>
                          <option value='party'>Party</option>
                          <option value='comedy'>Comedy</option>
                        </Field>
                        <div>
                          {errors.category && touched.category ? (
                            <small className='text-red-400 mt-1'>
                              {errors.category}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Email
                        </label>
                        <Field
                          name='email'
                          type='email'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter event video trailer'
                        />
                        <div>
                          {errors.email && touched.email ? (
                            <small className='text-red-400 mt-1'>
                              {errors.email}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Confirm Email*
                        </label>
                        <Field
                          name='confirmEmail'
                          type='email'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.confirmEmail && touched.confirmEmail ? (
                            <small className='text-red-400 mt-1'>
                              {errors.confirmEmail}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Password
                        </label>
                        <Field
                          name='password'
                          type='password'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.password && touched.password ? (
                            <small className='text-red-400 mt-1'>
                              {errors.password}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Confirm Password
                        </label>
                        <Field
                          name='confirmPassword'
                          type='password'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.confirmPassword && touched.confirmPassword ? (
                            <small className='text-red-400 mt-1'>
                              {errors.confirmPassword}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Seattron Cut
                        </label>
                        <Field
                          name='percentage'
                          type='number'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.percentage && touched.percentage ? (
                            <small className='text-red-400 mt-1'>
                              {errors.percentage}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Maximum Events
                        </label>
                        <Field
                          name='maxEvents'
                          type='number'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.maxEvents && touched.maxEvents ? (
                            <small className='text-red-400 mt-1'>
                              {errors.maxEvents}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Maximum Tickets
                        </label>
                        <Field
                          name='maxTickets'
                          type='number'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.maxTickets && touched.maxTickets ? (
                            <small className='text-red-400 mt-1'>
                              {errors.maxTickets}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Maximum Seats
                        </label>
                        <Field
                          name='maxSeats'
                          type='number'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.maxSeats && touched.maxSeats ? (
                            <small className='text-red-400 mt-1'>
                              {errors.maxSeats}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <button
                      className='text-xl justify-center items-center flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                      type='submit'
                    >
                      Save & Create Organizer
                    </button>
                  </Form>
                )}
              </Formik>
              <div className='flex w-full justify-end space-x-4'>
                <div
                  onClick={() => {
                    setOrganizer(false);
                    setBank(true);
                  }}
                  className='cursor-pointer border-[1px] border-brand_color px-2 py-1 rounded-md'
                >
                  Back
                </div>
                <div className=' border-[1px] border-brand_color px-2 py-1 rounded-md'>
                  step 3/3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerDetails;
