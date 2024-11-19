import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const BankDetails = ({
  bankDetails,
  setBusiness,
  setBankDetails,
  setBank,
  setOrganizer,
}: any) => {
  const businessDetailsSchema = Yup.object().shape({
    bankName: Yup.string(),
    bankAccountNumber: Yup.string(),
    bankAccountTitle: Yup.string(),
    bankBranch: Yup.string(),
    bankRoutingNumber: Yup.string(),
    bankAddress: Yup.string(),
  });

  return (
    <div className='font-lato relative'>
      <div className='w-fullrounded-md'>
        <div className='text-gray-800 max-w-1280'>
          <div>
            <p className='dashboard_title'>Create an event</p>

            {/* for someone else information */}

            <div className='my-4 max-w-[800px]'>
              <Formik
                initialValues={{
                  bankName: '',
                  bankAccountNumber: '',
                  bankAccountTitle: '',
                  bankBranch: '',
                  bankRoutingNumber: '',
                  bankAddress: '',
                }}
                validationSchema={businessDetailsSchema}
                onSubmit={(values: any, { setSubmitting }: any) => {
                  setBankDetails({
                    bankName: values.bankName,
                    bankAccountNumber: values.bankAccountNumber,
                    bankAccountTitle: values.bankAccountTitle,
                    bankBranch: values.bankBranch,
                    bankRoutingNumber: values.bankRoutingNumber,
                    bankAddress: values.bankAddress,
                  });
                  setBank(false);
                  setOrganizer(true);
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form className='mt-4 text-start font-lato'>
                    <div className='grid grid-cols-1 md:grid-cols-2   gap-y-2 gap-x-6'>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Bank Name*
                        </label>
                        <Field
                          name='bankName'
                          className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  h-8  text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.bankName && touched.bankName ? (
                            <small className='text-red-400 mt-1'>
                              {errors.bankName}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Account No*
                        </label>
                        <Field
                          name='bankAccountNumber'
                          type='text'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.bankAccountNumber &&
                          touched.bankAccountNumber ? (
                            <small className='text-red-400 mt-1'>
                              {errors.bankAccountNumber}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Account Title*
                        </label>
                        <Field
                          name='bankAccountTitle'
                          type='text'
                          className='border-[1px] h-8 border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.bankAccountTitle &&
                          touched.bankAccountTitle ? (
                            <small className='text-red-400 mt-1'>
                              {errors.bankAccountTitle}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Branch*
                        </label>
                        <Field
                          name='bankBranch'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.bankBranch && touched.bankBranch ? (
                            <small className='text-red-400 mt-1'>
                              {errors.bankBranch}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Routing No*
                        </label>
                        <Field
                          name='bankRoutingNumber'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.bankRoutingNumber &&
                          touched.bankRoutingNumber ? (
                            <small className='text-red-400 mt-1'>
                              {errors.bankRoutingNumber}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Bank Address*
                        </label>
                        <Field
                          name='bankAddress'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-8 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.bankAddress && touched.bankAddress ? (
                            <small className='text-red-400 mt-1'>
                              {errors.bankAddress}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <button
                      className='text-xl justify-center items-center  flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                      type='submit'
                    >
                      Save & Next
                    </button>
                  </Form>
                )}
              </Formik>
              <div className='flex w-full justify-end space-x-4'>
                <div
                  onClick={() => {
                    setBusiness(true);
                    setBank(false);
                  }}
                  className='cursor-pointer border-[1px] border-brand_color px-2 py-1 rounded-md'
                >
                  Back
                </div>
                <div className=' border-[1px] border-brand_color px-2 py-1 rounded-md'>
                  step 2/3
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetails;
