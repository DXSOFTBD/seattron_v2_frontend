import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const BankInformation = ({ agent, setStoreDetails, storeDetails }: any) => {
  const businessDetailsSchema = Yup.object().shape({
    bankName: Yup.string(),
    bankAccountNumber: Yup.string(),
    bankAccountTitle: Yup.string(),
    bankBranch: Yup.string(),
    bankRoutingNumber: Yup.string(),
    bankAddress: Yup.string(),
  });
  return (
    <div className='w-full h-max border-2 border-brand_color rounded-md  text-center p-4'>
      <p className='dashboard_secondary_title '>Bank Information</p>
      <div className='w-full'>
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
          onSubmit={(values: any) => {
            const bankDetails = {
              bankName: values.bankName
                ? values.bankName
                : agent.bankDetails.bankName,
              bankAccountNumber: values.bankAccountNumber
                ? values.bankAccountNumber
                : agent.bankDetails.bankAccountNumber,
              bankAccountTitle: values.bankAccountTitle
                ? values.bankAccountTitle
                : agent.bankDetails.bankAccountTitle,
              bankBranch: values.bankBranch
                ? values.bankBranch
                : agent.bankDetails.bankBranch,
              bankRoutingNumber: values.bankRoutingNumber
                ? values.bankRoutingNumber
                : agent.bankDetails.bankRoutingNumber,
              bankAddress: values.bankAddress
                ? values.bankAddress
                : agent.bankDetails.bankAddress,
            };
            setStoreDetails({ ...storeDetails, bankDetails });
          }}
        >
          {({ errors, touched, setFieldValue }: any) => (
            <Form className='mt-4 text-start font-lato w-full'>
              <div className='grid grid-cols-1 gap-2'>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Bank Name
                  </label>

                  <div>
                 <Field
                     disabled
                      name='bankName'
                      placeholder={agent.bankDetails.bankName}
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white   h-6 w-[280px]  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.bankName && touched.bankName ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.bankName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Account No
                  </label>

                  <div>
                 <Field
                     disabled
                      name='bankAccountNumber'
                      type='text'
                      placeholder={agent.bankDetails.bankAccountNumber}
                      className='border-[1px] h-6 w-[280px] border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.bankAccountNumber && touched.bankAccountNumber ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.bankAccountNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Account Title
                  </label>

                  <div>
                 <Field
                     disabled
                      name='bankAccountTitle'
                      placeholder={agent.bankDetails.bankAccountTitle}
                      type='text'
                      className='border-[1px] h-6 w-[280px] border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.bankAccountTitle && touched.bankAccountTitle ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.bankAccountTitle}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Branch
                  </label>

                  <div>
                 <Field
                     disabled
                      name='bankBranch'
                      placeholder={agent.bankDetails.bankBranch}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-6 w-[280px]   px-2 rounded-md outline-none'
                    />
                    {errors.bankBranch && touched.bankBranch ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.bankBranch}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Routing No
                  </label>

                  <div>
                 <Field
                     disabled
                      name='bankRoutingNumber'
                      type='text'
                      placeholder={agent.bankDetails.bankRoutingNumber}
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-6 w-[280px]   px-2 rounded-md outline-none'
                    />
                    {errors.bankRoutingNumber && touched.bankRoutingNumber ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.bankRoutingNumber}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Bank Address
                  </label>

                  <div>
                 <Field
                     disabled
                      name='bankAddress'
                      type='text'
                      placeholder={agent.bankDetails.bankAddress}
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-6 w-[280px]   px-2 rounded-md outline-none'
                    />
                    {errors.bankAddress && touched.bankAddress ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.bankAddress}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* <button
                className='justify-center items-center my-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                type='submit'
              >
                {storeDetails?.bankDetails?.bankName ? 'Saved' : 'Save'}
              </button>
              {storeDetails?.bankDetails?.bankName ? (
                <button
                  onClick={() =>
                    setStoreDetails({
                      ...storeDetails,
                      bankDetails: {},
                    })
                  }
                  className='justify-center cursor-pointer items-center mx-2 bg-gray-300 px-4 py-2 rounded-lg text-gray-900 w-max'
                >
                  Discard Changes
                </button>
              ) : null} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BankInformation;
