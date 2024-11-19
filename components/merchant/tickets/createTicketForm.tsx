import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import Modal from '@/components/common/Modal';
import { ImWarning } from 'react-icons/im';
import { formats, modules } from '@/components/common/editor';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
const TicketForm = ({ setTicketData, setShowModal, seatData }: any) => {
  const [showWarning, setShowWarning] = useState(false)
  const [isFree, setIsFree] = useState(false)
  const [isFreeGuestPrimary, setIsFreeGuestPrimary] = useState(false)
  const [isNoneGuestPrimary, setIsNoneGuestPrimary] = useState(false)
  const [isFreeGuestSecondary, setIsFreeGuestSecondary] = useState(false)
  const [isNoneGuestSecondary, setIsNoneGuestSecondary] = useState(false)
  const [isFreeGuestTertiary, setIsFreeGuestTertiary] = useState(false)
  const [isNoneGuestTertiary, setIsNoneGuestTertiary] = useState(false)
  const [isFreeSouvenir, setIsFreeSouvenir] = useState(false)
  const [isNoneSouvenir, setIsNoneSouvenir] = useState(false)
  const remainingSeat = seatData.maxSeats - seatData.currentSeatCount; 
  const createTicketSchema = Yup.object().shape({
    package: Yup.string().required('Package is required'),
    limit: Yup.number()
      .max(
        remainingSeat,
        'Exceeded seat limit. Available seat ' + remainingSeat
      )
      .required('Ticket limit is required'),
    isPaid: Yup.string(),
    price: isFree ? Yup.number() : Yup.number().min(10, 'Please set a minimum price of BDT 10 or higher.').required('Ticket price is required'),
    details: Yup.string().test(
      'details',
      'Details not exceed 300 characters',
      (val): any => val?.length ? val.toString().length <= 300 : true
    ),
  });

  // paid unpaid hannler 
  const handleWarning = () => {
    // setShowWarning(true)
    setIsFree(false)
  }

  const handlPaidGuestPrimaryStatus = () => {
    setIsFreeGuestPrimary(false)
    setIsNoneGuestPrimary(false)
  }

  const handlFreeGuestPrimaryStatus = () => {
    setIsFreeGuestPrimary(true)
    setIsNoneGuestPrimary(false)
  }

  const handlNoneGuestPrimaryStatus = () => {
    setIsFreeGuestPrimary(false)
    setIsNoneGuestPrimary(true)
  }

  const handlPaidGuestSecondaryStatus = () => {
    setIsFreeGuestSecondary(false)
    setIsNoneGuestSecondary(false)
  }

  const handlFreeGuestSecondaryStatus = () => {
    setIsFreeGuestSecondary(true)
    setIsNoneGuestSecondary(false)
  }

  const handlNoneGuestSecondaryStatus = () => {
    setIsFreeGuestSecondary(false)
    setIsNoneGuestSecondary(true)
  }

  const handlPaidGuestTertiaryStatus = () => {
    setIsFreeGuestTertiary(false)
    setIsNoneGuestTertiary(false)
  }

  const handlFreeGuestTertiaryStatus = () => {
    setIsFreeGuestTertiary(true)
    setIsNoneGuestTertiary(false)
  }

  const handlNoneGuestTertiaryStatus = () => {
    setIsFreeGuestTertiary(false)
    setIsNoneGuestTertiary(true)
  }

  const handlPaidSouvenirStatus = () => {
    setIsFreeSouvenir(false)
    setIsNoneSouvenir(false)
  }

  const handlFreeSouvenirStatus = () => {
    setIsFreeSouvenir(true)
    setIsNoneSouvenir(false)
  }

  const handlNoneSouvenirStatus = () => {
    setIsFreeSouvenir(false)
    setIsNoneSouvenir(true)
  }

  return (
    <div className=''>
      {/* <Breadcrumb from='giftCard' /> */}
      <Modal
        showModal={showWarning}
        setShowModal={setShowWarning}
        cancel='Make Paid'
        cancelClr='bg-teal-600'
        confirmCrl='bg-red-500'
        title='Are you sure you switch ticket type?'
        confirmText='Make Free'
        setIsFree={setIsFree}
      >
        <p className='text-yellow-500 flex_center space-x-2'><span> <ImWarning /></span> <span > If this ticket is made free, entry to the event will be without charge.</span></p>
      </Modal>

      <div className='my-4'>
        <Formik
          initialValues={{
            package: '',
            limit: '',
            details: '',
            isPaid: '',
            price: '',
          }}
          validationSchema={createTicketSchema}
          onSubmit={(values: any) => {
            // console.log(values)
            const ticketDetails = {
              package: values.package,
              limit: values.limit,
              details: values.details,
              isPaid: !isFree,
              price: isFree ? 0 : values.price,
              isGuestPrimary: !isNoneGuestPrimary,
              priceGuestPrimary: isFreeGuestPrimary || isNoneGuestPrimary ? 0 : values.priceGuestPrimary,
              isGuestSecondary: !isNoneGuestSecondary,
              priceGuestSecondary: isFreeGuestSecondary || isNoneGuestSecondary ? 0 : values.priceGuestSecondary,
              isGuestTertiary: !isNoneGuestTertiary,
              priceGuestTertiary: isFreeGuestTertiary || isNoneGuestTertiary ? 0 : values.priceGuestTertiary,
              isSouvenir: !isNoneSouvenir,
              priceSouvenir: isFreeSouvenir || isNoneSouvenir ? 0 : values.priceSouvenir,
              isAcceptContribution: true,
            };
            // console.log(ticketDetails)
            setTicketData(ticketDetails);
            setShowModal(true);
          }}
        >
          {({ errors, touched }: any) => (
            <Form className='mt-4 text-start font-lato max-w-[700px] mb-4'>
              <div className='grid grid-cols-2 gap-6'>

                {/* Primary Ticket Price */}
                <div className='relative flex justify-start items-center space-x-2 my-4'>
                  <p className='w-32 font-semibold'>Ticket Type: </p>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handleWarning()}>
                    <Field type="radio" name="isPaid" value='true' id='paid' checked={!isFree} />

                    <label htmlFor='paid'>Paid</label>
                  </div>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handleWarning()}>
                    <Field type="radio" name="isPaid" value='false' id='free' checked={isFree} />

                    <label htmlFor='free'>Free</label>
                  </div>
                </div>

                <div className='child_center'>
                  {
                    !isFree ? <div className='relative flex_center w-full'>
                      <label htmlFor="price" className='w-full'>Ticket Price:</label>
                      <div className='w-full'>
                        <Field
                          name='price'
                          type='number'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Ticket price'
                        />
                        <div>
                          {errors.price && touched.price ? (
                            <small className='text-red-400 '>
                              {errors.price}
                            </small>
                          ) : null}
                        </div>
                      </div>

                    </div> : null
                  }
                </div>
                {/* Primary Ticket Price */}

                {/* Primary Guest Ticket Price */}
                <div className='relative flex justify-start items-center space-x-2 my-6'>
                  <p className='w-32 font-semibold'>Guest (Primary): </p>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlPaidGuestPrimaryStatus()}>
                    <Field type="radio" name="isGuestPrimary" value='false' id='isGuestPrimary' checked={!isFreeGuestPrimary && !isNoneGuestPrimary} />

                    <label htmlFor='isGuestPrimary'>Paid</label>
                  </div>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlFreeGuestPrimaryStatus()}>
                    <Field type="radio" name="isGuestPrimary" value='false' id='isGuestPrimaryFree' checked={isFreeGuestPrimary && !isNoneGuestPrimary} />

                    <label htmlFor='isGuestPrimaryFree'>Free</label>
                  </div>

                  <div className='flex space-x-2 items-center w-40' onClick={() => handlNoneGuestPrimaryStatus()}>
                    <Field type="radio" name="isGuestPrimary" value='false' id='guestPrimaryNone' checked={!isFreeGuestPrimary && isNoneGuestPrimary} />

                    <label htmlFor='guestPrimaryNone'>N/A</label>
                  </div>
                </div>

                <div className='child_center'>
                  {
                    !isFreeGuestPrimary && !isNoneGuestPrimary? <div className='relative flex_center w-full'>
                      <label htmlFor="price" className='w-full'>Guest Ticket Price:</label>
                      <div className='w-full'>
                        <Field
                          name='priceGuestPrimary'
                          type='number'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Guest Ticket price'
                        />
                        <div>
                          {errors.priceGuestPrimary && touched.priceGuestPrimary ? (
                            <small className='text-red-400 '>
                              {errors.priceGuestPrimary}
                            </small>
                          ) : null}
                        </div>
                      </div>

                    </div> : null
                  }
                </div>
                {/* Primary Guest Ticket Price */}

                {/* Secondary Guest Ticket Price */}
                <div className='relative flex justify-start items-center space-x-2 my-6'>
                  <p className='w-32 font-semibold'>Guest (Secondary): </p>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlPaidGuestSecondaryStatus()}>
                    <Field type="radio" name="isGuestSecondary" value='false' id='isGuestSecondary' checked={!isFreeGuestSecondary && !isNoneGuestSecondary} />

                    <label htmlFor='isGuestSecondary'>Paid</label>
                  </div>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlFreeGuestSecondaryStatus()}>
                    <Field type="radio" name="isGuestSecondary" value='false' id='isGuestSecondaryFree' checked={isFreeGuestSecondary && !isNoneGuestSecondary} />

                    <label htmlFor='isGuestSecondaryFree'>Free</label>
                  </div>

                  <div className='flex space-x-2 items-center w-40' onClick={() => handlNoneGuestSecondaryStatus()}>
                    <Field type="radio" name="isGuestSecondary" value='false' id='guestSecondaryNone' checked={!isFreeGuestSecondary && isNoneGuestSecondary} />

                    <label htmlFor='guestSecondaryNone'>N/A</label>
                  </div>
                </div>

                <div className='child_center'>
                  {
                    !isFreeGuestSecondary && !isNoneGuestSecondary ? <div className='relative flex_center w-full'>
                      <label htmlFor="price" className='w-full'>Guest Ticket Price:</label>
                      <div className='w-full'>
                        <Field
                          name='priceGuestSecondary'
                          type='number'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Guest Ticket price'
                        />
                        <div>
                          {errors.priceGuestSecondary && touched.priceGuestSecondary ? (
                            <small className='text-red-400 '>
                              {errors.priceGuestSecondary}
                            </small>
                          ) : null}
                        </div>
                      </div>

                    </div> : null
                  }
                </div>
                {/* Secondary Guest Ticket Price */}

                {/* Tertiary Guest Ticket Price */}
                <div className='relative flex justify-start items-center space-x-2 my-6'>
                  <p className='w-32 font-semibold'>Guest (Tertiary): </p>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlPaidGuestTertiaryStatus()}>
                    <Field type="radio" name="isGuestTertiary" value='false' id='isGuestTertiary' checked={!isFreeGuestTertiary && !isNoneGuestTertiary} />

                    <label htmlFor='isGuestTertiary'>Paid</label>
                  </div>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlFreeGuestTertiaryStatus()}>
                    <Field type="radio" name="isGuestTertiary" value='false' id='isGuestTertiaryFree' checked={isFreeGuestTertiary && !isNoneGuestTertiary} />

                    <label htmlFor='isGuestTertiaryFree'>Free</label>
                  </div>

                  <div className='flex space-x-2 items-center w-40' onClick={() => handlNoneGuestTertiaryStatus()}>
                    <Field type="radio" name="isGuestTertiary" value='false' id='guestTertiaryNone' checked={!isFreeGuestTertiary && isNoneGuestTertiary} />

                    <label htmlFor='guestTertiaryNone'>N/A</label>
                  </div>
                </div>

                <div className='child_center'>
                  {
                    !isFreeGuestTertiary && !isNoneGuestTertiary ? <div className='relative flex_center w-full'>
                      <label htmlFor="price" className='w-full'>Guest Ticket Price:</label>
                      <div className='w-full'>
                        <Field
                          name='priceGuestTertiary'
                          type='number'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Guest Ticket price'
                        />
                        <div>
                          {errors.priceGuestTertiary && touched.priceGuestTertiary ? (
                            <small className='text-red-400 '>
                              {errors.priceGuestTertiary}
                            </small>
                          ) : null}
                        </div>
                      </div>

                    </div> : null
                  }
                </div>
                {/* Tertiary Guest Ticket Price */}

                {/* Souvenir Ticket Price */}
                <div className='relative flex justify-start items-center space-x-2 my-6'>
                  <p className='w-32 font-semibold'>Souvenir: </p>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlPaidSouvenirStatus()}>
                    <Field type="radio" name="isSouvenir" value='false' id='isSouvenir' checked={!isFreeSouvenir && !isNoneSouvenir} />

                    <label htmlFor='isSouvenir'>Paid</label>
                  </div>
                  <div className='flex space-x-2 items-center w-40' onClick={() => handlFreeSouvenirStatus()}>
                    <Field type="radio" name="isSouvenir" value='false' id='isSouvenirFree' checked={isFreeSouvenir && !isNoneSouvenir} />

                    <label htmlFor='isSouvenirFree'>Free</label>
                  </div>

                  <div className='flex space-x-2 items-center w-40' onClick={() => handlNoneSouvenirStatus()}>
                    <Field type="radio" name="isSouvenir" value='false' id='isSouvenirNone' checked={!isFreeSouvenir && isNoneSouvenir} />

                    <label htmlFor='isSouvenirNone'>N/A</label>
                  </div>
                </div>

                <div className='child_center'>
                  {
                    !isFreeSouvenir && !isNoneSouvenir ? <div className='relative flex_center w-full'>
                      <label htmlFor="price" className='w-full'>Souvenir Price:</label>
                      <div className='w-full'>
                        <Field
                          name='priceSouvenir'
                          type='number'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Guest Ticket price'
                        />
                        <div>
                          {errors.priceSouvenir && touched.priceSouvenir ? (
                            <small className='text-red-400 '>
                              {errors.priceSouvenir}
                            </small>
                          ) : null}
                        </div>
                      </div>

                    </div> : null
                  }
                </div>
                {/* Souvenir Ticket Price */}

                <div className='relative flex_center w-full col-span-2'>
                  <label htmlFor="package" className='w-full'>Package Name:</label>
                  <div className='w-full'>
                    <Field
                      name='package'
                      placeholder='Enter ticket name'
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  h-10  text-sm px-2 py-1 rounded-md '
                    ></Field>
                    <div>
                      {errors.package && touched.package ? (
                        <small className='text-red-400 '>
                          {errors.package}
                        </small>
                      ) : null}
                    </div>
                  </div>

                </div>

                <div className='relative flex_center w-full col-span-2'>
                  <label htmlFor="limit" className='w-full'>Ticket Limit:</label>
                  <div className='w-full'>
                    <Field
                      name='limit'
                      type='number'
                      className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                      placeholder='Enter seat capacity'
                    />
                    <div>
                      {errors.limit && touched.limit ? (
                        <small className='text-red-400 '>
                          {errors.limit}
                        </small>
                      ) : null}
                    </div>
                  </div>

                </div>
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
                Publish Tickets
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TicketForm;
