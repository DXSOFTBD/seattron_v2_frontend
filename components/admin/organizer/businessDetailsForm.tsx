import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const BusinessDetails = ({
  businessDetails,
  setBusinessDetails,
  setBank,
  setBusiness,
}: any) => {
  const logoSize = 1024 * 512;

  const businessDetailsSchema = Yup.object().shape({
    legalBusinessName: Yup.string().required('Business Name is required'),
    brandName: Yup.string().required('Brand Name is required'),
    logo: Yup.mixed()
      .test(
        'fileSize',
        'Logo size will be less than 1 MB',
        (value) => value === null || (value && value.size <= logoSize)
      )
      .required('Logo is required'),

    address: Yup.string().required('Address is required'),
    website: Yup.string().required('Website is required'),
    businessEmail: Yup.string()
      .email('Invalid email')
      .required('Business Email is required'),
    businessPhone: Yup.string().required('Business Phone number is required'),
    businessType: Yup.string().required('Business Type is required'),
    binNumber: Yup.string().required('BIN is required'),
    tinNumber: Yup.string().required('TIN is required'),
    file: Yup.string().required('Files is required'),
    representativeName: Yup.string().required(
      'Representative Name is required'
    ),
    representativeDesignation: Yup.string().required(
      'Representative Designation is required'
    ),
    representativeEmail: Yup.string()
      .email('Invalid email')
      .required('Representative Email is required'),
    representativePhone: Yup.string().required(
      'Representative Phone number is required'
    ),
    representativeIDNumber: Yup.string().required(
      'Representative ID number is required'
    ),
  });
  console.log(businessDetails);
  return (
    <div className='font-lato relative'>
      <div className='w-full rounded-md'>
        <div className='text-gray-800 max-w-1280'>
          <div>
            <p className='dashboard_title'>Add Organizer</p>

            {/* for someone else information */}

            <div className='my-4'>
              <Formik
                initialValues={{
                  legalBusinessName: '',
                  brandName: '',
                  address: '',
                  website: '',
                  businessEmail: '',
                  businessPhone: '',
                  businessType: '',
                  binNumber: '',
                  tinNumber: '',
                  file: '',
                  representativeName: '',
                  representativeDesignation: '',
                  representativeEmail: '',
                  representativePhone: '',
                  representativeIDNumber: '',
                  logo: '',
                }}
                validationSchema={businessDetailsSchema}
                onSubmit={(values: any) => {
                  const businessDetails = {
                    legalBusinessName: values.legalBusinessName,
                    brandName: values.brandName,
                    address: values.address,
                    website: values.website,
                    businessEmail: values.businessEmail,
                    businessPhone: values.businessPhone,
                    businessType: values.businessType,
                    binNumber: values.binNumber,
                    tinNumber: values.tinNumber,
                  };
                  const representativeDetails = {
                    representativeName: values.representativeName,
                    representativeDesignation: values.representativeDesignation,
                    representativeEmail: values.representativeEmail,
                    representativePhone: values.representativePhone,
                    representativeIDNumber: values.representativeIDNumber,
                  };

                  setBusinessDetails({
                    businessDetails,
                    representativeDetails,
                    logo: values.logo,
                    file: values.file,
                  });
                  setBank(true);
                  setBusiness(false);
                }}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form className='mt-4 text-start font-lato'>
                    <div className='grid grid-cols-1  max-w-[400px]'>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Legal Business Name*
                        </label>
                        <Field
                          name='legalBusinessName'
                          className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  d h-6  text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.legalBusinessName &&
                          touched.legalBusinessName ? (
                            <small className='text-red-400 mt-1'>
                              {errors.legalBusinessName}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Brand Name*
                        </label>
                        <Field
                          name='brandName'
                          type='text'
                          className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 h-6 rounded-md '
                        ></Field>
                        <div>
                          {errors.brandName && touched.brandName ? (
                            <small className='text-red-400 mt-1'>
                              {errors.brandName}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Address*
                        </label>
                        <Field
                          name='address'
                          type='text'
                          className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 h-6 rounded-md '
                        ></Field>
                        <div>
                          {errors.address && touched.address ? (
                            <small className='text-red-400 mt-1'>
                              {errors.address}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Website
                        </label>
                        <Field
                          name='website'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.website && touched.website ? (
                            <small className='text-red-400 mt-1'>
                              {errors.website}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Business Email*
                        </label>
                        <Field
                          name='businessEmail'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.businessEmail && touched.businessEmail ? (
                            <small className='text-red-400 mt-1'>
                              {errors.businessEmail}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Business Phone Number*
                        </label>
                        <Field
                          name='businessPhone'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.businessPhone && touched.businessPhone ? (
                            <small className='text-red-400 mt-1'>
                              {errors.businessPhone}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Representative Name*
                        </label>
                        <Field
                          name='representativeName'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.representativeName &&
                          touched.representativeName ? (
                            <small className='text-red-400 mt-1'>
                              {errors.representativeName}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Representative Designation*
                        </label>
                        <Field
                          name='representativeDesignation'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.representativeDesignation &&
                          touched.representativeDesignation ? (
                            <small className='text-red-400 mt-1'>
                              {errors.representativeDesignation}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Representative Email*
                        </label>
                        <Field
                          name='representativeEmail'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.representativeEmail &&
                          touched.representativeEmail ? (
                            <small className='text-red-400 mt-1'>
                              {errors.representativeEmail}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Representative Phone Number*
                        </label>
                        <Field
                          name='representativePhone'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.representativePhone &&
                          touched.representativePhone ? (
                            <small className='text-red-400 mt-1'>
                              {errors.representativePhone}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Representative NID/Passport*
                        </label>
                        <Field
                          name='representativeIDNumber'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.representativeIDNumber &&
                          touched.representativeIDNumber ? (
                            <small className='text-red-400 mt-1'>
                              {errors.representativeIDNumber}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Business Type*
                        </label>
                        <Field
                          name='businessType'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.businessType && touched.businessType ? (
                            <small className='text-red-400 mt-1'>
                              {errors.businessType}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          BIN number*
                        </label>
                        <Field
                          name='binNumber'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.binNumber && touched.binNumber ? (
                            <small className='text-red-400 mt-1'>
                              {errors.binNumber}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          TIN Number*
                        </label>
                        <Field
                          name='tinNumber'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-full  px-2 rounded-md outline-none'
                        />
                        <div>
                          {errors.tinNumber && touched.tinNumber ? (
                            <small className='text-red-400 mt-1'>
                              {errors.tinNumber}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Add Logo*
                        </label>
                        <Field
                          name='logo'
                          value={undefined}
                          onChange={(e: any) => {
                            // validateImageDimensions(e.target.files[0],setDimension)
                            setFieldValue('logo', e.target.files[0]);
                          }}
                          type='file'
                          className=' custom-file-input '
                        />

                        <div>
                          {errors.logo && touched.logo ? (
                            <small className='text-red-400 mt-1'>
                              {errors.logo}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Add File*
                        </label>
                        <Field
                          name='file'
                          type='file'
                          value={undefined}
                          onChange={(e: any) =>
                            setFieldValue('file', e.target.files[0])
                          }
                          className='custom-file-input'
                        />
                        <div>
                          {errors.file && touched.file ? (
                            <small className='text-red-400 mt-1'>
                              {errors.file}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <button
                      className='text-xl justify-center items-center my-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                      type='submit'
                    >
                      Save & Next
                    </button>
                  </Form>
                )}
              </Formik>
              <div className='float-right border-[1px] border-brand_color px-2 py-1 rounded-md'>
                step 1/3
              </div>
            </div>
          </div>{' '}
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
