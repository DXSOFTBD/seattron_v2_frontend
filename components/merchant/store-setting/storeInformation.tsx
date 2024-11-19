import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { Formik, Field, Form } from 'formik';
import axios from '@/axios/config';
import * as Yup from 'yup';
import Image from 'next/image';
import { setPopup } from 'redux/slices/popupslice';
import Modal from '@/components/common/Modal';
const StoreInformation = ({ agent, setStoreDetails, storeDetails }: any) => {
  const logoSize = 1024 * 512;
  const [logo, setLogo] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();

  const updateLogo = () => {
    axios
      .put('agents/logo', logo, {
        headers: {
          'Authorization': `Bearer ${agent.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Logo updated successfully',
            show: true,
          })
        );

        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        dispatch(
          setPopup({
            type: 'failed',
            message: err.response.data.message,
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      });
  };
  const logoSchema = Yup.object().shape({
    logo: Yup.mixed().required('select a logo') .test(
      'fileSize',
      'Image size will be less than 500 kB',
      (value) => value === null || (value && value.size <= logoSize)
    ),
  });
  const businessDetailsSchema = Yup.object().shape({
    legalBusinessName: Yup.string(),
    brandName: Yup.string(),
    logo: Yup.mixed(),
    file: Yup.mixed(),
    address: Yup.string(),
    website: Yup.string(),
    businessEmail: Yup.string().email('Invalid email'),
    businessPhone: Yup.string(),
    businessType: Yup.string(),
    binNumber: Yup.string(),
    tinNumber: Yup.string(),
    representativeName: Yup.string(),
    representativeDesignation: Yup.string(),
    representativeEmail: Yup.string().email('Invalid email'),
    representativePhone: Yup.string(),
    representativeIDNumber: Yup.string(),
  });
  return (
    <div className='w-full h-max border-2 border-brand_color rounded-md  text-center p-4'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={updateLogo}
        confirmText='Update'
        title='Are you  sure you want to update logo?'
      ></Modal>
      <p className='dashboard_secondary_title '>Store Information</p>
      <div className=''>
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
            representativeName: '',
            representativeDesignation: '',
            representativeEmail: '',
            representativePhone: '',
            representativeIDNumber: '',
            logo: '',
            file: '',
          }}
          validationSchema={businessDetailsSchema}
          onSubmit={(values: any) => {
            const businessDetails = {
              legalBusinessName: values.legalBusinessName
                ? values.legalBusinessName
                : agent.businessDetails.legalBusinessName,
              brandName: values.brandName
                ? values.brandName
                : agent.businessDetails.brandName,
              address: values.address
                ? values.address
                : agent.businessDetails.address,
              website: values.website
                ? values.website
                : agent.businessDetails.website,
              businessEmail: values.businessEmail
                ? values.businessEmail
                : agent.businessDetails.businessEmail,
              businessPhone: values.businessPhone
                ? values.businessPhone
                : agent.businessDetails.businessPhone,
              businessType: values.businessType
                ? values.businessType
                : agent.businessDetails.businessType,
              binNumber: values.binNumber
                ? values.binNumber
                : agent.businessDetails.binNumber,
              tinNumber: values.tinNumber
                ? values.tinNumber
                : agent.businessDetails.tinNumber,
            };
            const representativeDetails = {
              representativeName: values.representativeName
                ? values.representativeName
                : agent.representativeDetails.representativeName,
              representativeDesignation: values.representativeDesignation
                ? values.representativeDesignation
                : agent.representativeDetails.representativeDesignation,
              representativeEmail: values.representativeEmail
                ? values.representativeEmail
                : agent.representativeDetails.representativeEmail,
              representativePhone: values.representativePhone
                ? values.representativePhone
                : agent.representativeDetails.representativePhone,
              representativeIDNumber: values.representativeIDNumber
                ? values.representativeIDNumber
                : agent.representativeDetails.representativeIDNumber,
            };
            setStoreDetails({
              ...storeDetails,
              businessDetails,
              representativeDetails,
              logo: values.logo,
              file: values.file,
            });
          }}
        >
          {({ errors, touched, setFieldValue }: any) => (
            <Form className='mt-4 text-start font-lato'>
              <div className='grid grid-cols-1 gap-2'>
                <div className='flex justify-between space-x-4 items-center'>
                  <p>Logo</p>
                  <div className='w-[280px] text-start'>
                    {agent.logo && (
                      <Image
                        src={process.env.NEXT_PUBLIC_SERVER_HOST + agent.logo}
                        alt='logo'
                        className='h-16 w-16  object-cover'
                        width={50}
                        height={50}
                      ></Image>
                    )}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Legal Business Name
                  </label>

                  <div>
                    <Field
                      name='legalBusinessName'
                      disabled
                      placeholder={agent.businessDetails.legalBusinessName}
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-[280px]  d h-6  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.legalBusinessName && touched.legalBusinessName ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.legalBusinessName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Brand Name
                  </label>

                  <div>
                    <Field
                      name='brandName'
                      type='text'
                      disabled
                      placeholder={agent.businessDetails.brandName}
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-[280px] text-sm px-2 py-1 my-1 h-6 rounded-md '
                    ></Field>
                    {errors.brandName && touched.brandName ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.brandName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Address
                  </label>

                  <div>
                    <Field
                      name='address'
                      disabled
                      placeholder={agent.businessDetails.address}
                      type='text'
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-[280px] text-sm px-2 py-1 my-1 h-6 rounded-md '
                    ></Field>
                    {errors.address && touched.address ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.address}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Website
                  </label>

                  <div>
                    <Field
                      name='website'
                      disabled
                      placeholder={agent.businessDetails.website}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.website && touched.website ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.website}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Business Email
                  </label>

                  <div>
                    <Field
                      name='businessEmail'
                      disabled
                      placeholder={agent.businessDetails.businessEmail}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.businessEmail && touched.businessEmail ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.businessEmail}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Business Phone Number
                  </label>

                  <div>
                    <Field
                      name='businessPhone'
                      disabled
                      placeholder={agent.businessDetails.businessPhone}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.businessPhone && touched.businessPhone ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.businessPhone}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Business Type
                  </label>

                  <div>
                    <Field
                      name='businessType'
                      disabled
                      placeholder={agent.businessDetails.businessType}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.businessType && touched.businessType ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.businessType}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    BIN number
                  </label>

                  <div>
                    <Field
                      disabled
                      name='binNumber'
                      placeholder={agent.businessDetails.binNumber}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.binNumber && touched.binNumber ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.binNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    TIN Number
                  </label>

                  <div>
                    <Field
                      name='tinNumber'
                      disabled
                      placeholder={agent.businessDetails.tinNumber}
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.tinNumber && touched.tinNumber ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.tinNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Representative Name
                  </label>

                  <div>
                    <Field
                      name='representativeName'
                      disabled
                      placeholder={
                        agent.representativeDetails.representativeName
                      }
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.representativeName && touched.representativeName ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.representativeName}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Representative Designation
                  </label>

                  <div>
                    <Field
                      name='representativeDesignation'
                      disabled
                      placeholder={
                        agent.representativeDetails.representativeDesignation
                      }
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.representativeDesignation &&
                    touched.representativeDesignation ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.representativeDesignation}
                      </p>
                    ) : null}
                  </div>
                </div>

                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Representative Email
                  </label>

                  <div>
                    <Field
                      name='representativeEmail'
                      disabled
                      placeholder={
                        agent.representativeDetails.representativeEmail
                      }
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.representativeEmail &&
                    touched.representativeEmail ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.representativeEmail}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Representative Phone Number
                  </label>

                  <div>
                    <Field
                      name='representativePhone'
                      disabled
                      placeholder={
                        agent.representativeDetails.representativePhone
                      }
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.representativePhone &&
                    touched.representativePhone ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.representativePhone}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label ml-4'>
                    Representative NID/Passport
                  </label>

                  <div>
                    <Field
                      name='representativeIDNumber'
                      disabled
                      placeholder={
                        agent.representativeDetails.representativeIDNumber
                      }
                      type='text'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 d h-6 w-[280px]  px-2 rounded-md outline-none'
                    />
                    {errors.representativeIDNumber &&
                    touched.representativeIDNumber ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.representativeIDNumber}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>

              {/* <button
                className='justify-center items-center my-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                type='submit'
              >
                {storeDetails?.businessDetails?.brandName ? 'Saved' : 'Save'}
              </button>
              {storeDetails?.businessDetails?.brandName ? (
                <button
                  onClick={() =>
                    setStoreDetails({
                      ...storeDetails,
                      businessDetails: {},
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
        <Formik
          initialValues={{
            logo: '',
          }}
          validationSchema={logoSchema}
          onSubmit={(values: any) => {
            setLogo({ logo: values.logo });
            setShowModal(true);
          }}
        >
          {({ errors, touched, setFieldValue }: any) => (
            <Form className='mt-4 text-start font-lato'>
              <div className='relative flex justify-between items-center'>
                <div>
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
                  {errors.logo && touched.logo ? (
                    <p className='text-red-400 mt-1 text-sm'>{errors.logo}</p>
                  ) : null}
                </div>
                <button
                  type='submit'
                  className='text-md justify-center items-center  flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                >
                  Update Logo
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default StoreInformation;
