import React, { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import axios from '@/axios/config';
import Modal from '@/components/common/Modal';
import dynamic from 'next/dynamic';

// import sharp from 'sharp'
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import { BsPlus } from 'react-icons/bs';
import Terms from './CreateTerms';
import { defaultTerms } from 'lib/db';
import { format } from 'date-fns';
import { TiTick } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import { setPopup } from 'redux/slices/popupslice';
import { getEventQuota, getEventSeatQuota } from 'redux/slices/EventSlice';
import { ImWarning } from 'react-icons/im';
import { formats, modules } from '@/components/common/editor';

const CreateEvent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [isPrivate, setisPrivate] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [eventData, setEventData] = useState<any>();
  const [ageRestriction, setAgeRestriction] = useState<any>(false);
  const [terms, setTerms] = useState<any>([]);
  const [showTerms, setShowTerms] = useState(false);
  const [count, setCount] = useState(1);
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEventQuota(agent.token));
    dispatch(getEventSeatQuota(agent.token));
  }, [dispatch, agent.token]);
  const quota = useAppSelector(
    (state) => state.eventReducer.getEventQuota.data
  );
  const seatQuota = useAppSelector(
    (state) => state.eventReducer.getEventSeatQuota.data
  );
  const handleWarning = () => {
    setShowWarning(true);
  };
  const createEventHandler = (data: any) => {
    // console.log(data)
    axios
      .post('events/', data, {
        headers: {
          Authorization: `Bearer ${agent.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Saved as draft successfully',
            show: true,
          })
        );
        router.push(`/merchant/dashboard/add-tickets/${res.data.data._id}`);

        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        // console.log(err)
        dispatch(
          setPopup({
            type: 'failed',
            message: err.response.data.error,
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      });
  };
  const ThumbSize = 1024 * 1024;
  const CoverSize = 1024 * 1024;
  const FooterSize = 1024 * 1024;
  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const createEventSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    thumb: Yup.mixed()
      .test('fileSize', 'Image size will be less than 1 MB', (value) =>
        value?.size ? value.size <= ThumbSize : true
      )
      .required('Thumbnail is required')
      .test('fileFormat', 'Unsupported Format', (value) =>
        value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
      ),
    cover: Yup.mixed()
      .test('fileSize', 'Image size will be less than 1 MB', (value) =>
        value?.size ? value.size <= CoverSize : true
      )
      .required('Cover is required')
      .test('fileFormat', 'Unsupported Format', (value) =>
        value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
      ),

    footer: Yup.mixed()
      .required('Footer is required')
      .test('fileSize', 'Image size will be less than 1 MB', (value) =>
        value?.size ? value.size <= FooterSize : true
      )
      .test('fileFormat', 'Unsupported Format', (value) =>
        value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
      ),
    description: Yup.string()
      .required('Description is required')
      .test(
        'description',
        'Must not exceed 500 characters',
        (val): any => val && val.toString().length <= 500
      ),
    details: Yup.string()
      .notRequired()
      .test('description', 'Must not exceed 5000 characters', (val): any =>
        val ? val.toString().length <= 5000 : true
      ),
    eventEndTime: Yup.date(),
    eventTime: Yup.string().required('Event time is required'),
    eventDuration: Yup.string(),
    ageRestriction: Yup.number(),
    venue: Yup.string().required('Event venue is required'),
    isPrivate: Yup.string(),
    capacity: Yup.number(),
    videoTrailer: Yup.string(),
    googleMapLink: Yup.string(),
    userName: Yup.array(),
    userEmail: Yup.array(),
    userPhone: Yup.array(),
    userId_type: Yup.array(),
    userAge: Yup.array(),
    userGender: Yup.array(),
    userOccupation: Yup.array(),
    userCity: Yup.array(),
    userCountry: Yup.array(),
    userPostal_code: Yup.array(),
    userTshirtSize: Yup.array(),
  });

  return (
    <div
      className={`font-lato relative ${
        quota.eligible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <Modal
        showModal={showWarning}
        setShowModal={setShowWarning}
        cancel='Make Public'
        cancelClr='bg-teal-600'
        confirmCrl='bg-red-500'
        title='Are you sure you switch ticket type?'
        confirmText='Make Private'
        setIsFree={setisPrivate}
      >
        <p className='text-yellow-500 flex_center space-x-2'>
          <span>
            {' '}
            <ImWarning />
          </span>{' '}
          <span>
            {' '}
            If this event is made Private, Entry and ticket acquisition will now
            be facilitated exclusively through private links. Unauthorized link
            sharing is prohibited and may result in entry denial.
          </span>
        </p>
      </Modal>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={createEventHandler}
        title='Are you sure?'
        confirmText='Create an Event'
        data={eventData}
      >
        {eventData && (
          <div className='font-lato flex flex-col space-y-2 min-w-300 text-gray-600 bg-gray-200 p-4 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='border-r-2 text-gray-800 p-4'>
                <p className='dashboard_secondary_title pb-2'>
                  Event Information
                </p>
                <div className=''>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Name:</p>
                    <small>{eventData.name ? eventData.name : 'N/A'}</small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Description:</p>
                    <small>
                      {eventData.description ? eventData.description : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Venue:</p>
                    <small>{eventData.venue ? eventData.venue : 'N/A'}</small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Video Trailer:</p>
                    <small>
                      {eventData.videoTrailer ? eventData.videoTrailer : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Capacity:</p>
                    <small>
                      {eventData.capacity ? eventData.capacity : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Private:</p>
                    <small>{eventData.isPrivate ? 'Yes' : 'No'}</small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Invite Only:</p>
                    <small>{eventData.isInviteOnly}</small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Start Time:</p>
                    <small>
                      {eventData.eventTime
                        ? format(new Date(eventData.eventTime), 'Pp')
                        : null}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>End time:</p>
                    <small>
                      {eventData.eventEndTime
                        ? format(new Date(eventData.eventEndTime), 'Pp')
                        : null}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Duration:</p>
                    <small>
                      {eventData.eventDuration
                        ? eventData.eventDuration + 'Hr'
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Min. Age:</p>
                    <small>
                      {eventData.ageRestriction
                        ? eventData.ageRestriction
                        : 'N/A'}
                    </small>
                  </div>
                </div>
              </div>
              <div className='p-4 '>
                <p className='dashboard_secondary_title pb-2'>
                  User Information
                </p>
                <div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Name:</p>
                    <small>
                      {eventData.userName ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>

                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Email:</p>
                    <small>
                      {eventData.userEmail ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Phone:</p>
                    <small>
                      {eventData.userPhone ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Age:</p>
                    <small>
                      {eventData.userAge ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Gender:</p>
                    <small>
                      {eventData.userGender ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Occupation:</p>
                    <small>
                      {eventData.userOccupation ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>City:</p>
                    <small>
                      {eventData.userCity ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Country:</p>
                    <small>
                      {eventData.userCountry ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>Postal code:</p>
                    <small>
                      {eventData.userPostal_code ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-44 text-gray-900'>T-Shirt Size:</p>
                    <small>
                      {eventData.userTshirtSize ? (
                        <TiTick className='text-green-600' />
                      ) : (
                        <MdClose className='text-red-600' />
                      )}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        showModal={showTermsModal}
        setShowModal={setShowTermsModal}
        cancel='Back'
        title='Terms and Conditions'
      >
        {defaultTerms.map((terms, index) => (
          <div key={index + 1}>
            <p className='text-sm text-gray-600 my-1 font-lato'>
              <span className='font-bold text-black'>{index + 1}</span>. &nbsp;
              {terms}
            </p>
          </div>
        ))}
      </Modal>

      <div className='w-full rounded-md'>
        <div className='text-gray-800 max-w-1280'>
          <div>
            <p className='dashboard_title'>
              Create an event&nbsp;
              <span>
                {quota.eligible ? null : (
                  <span className='text-lg'>
                    (
                    <span className='text-red-500'>
                      OOPS! You have exceeded your event limit, please contact
                      Seattron
                    </span>
                    )
                  </span>
                )}
              </span>
            </p>

            {/* for someone else information */}

            <div className='my-4'>
              <Formik
                initialValues={{
                  name: '',
                  cover: '',
                  thumb: '',
                  description: '',
                  details: '',
                  eventTime: '',
                  eventEndTime: '',
                  ageRestriction: '',
                  eventDuration: '',
                  venue: '',
                  category: '',
                  capacity: '',
                  footer: null,
                  isPrivate: '',
                  videoTrailer: '',
                  googleMapLink: '',
                  agent: agent._id,
                  userName: '',
                  userEmail: '',
                  userPhone: '',
                  userId_type: '',
                  userAge: '',
                  userGender: '',
                  userOccupation: '',
                  userCity: '',
                  userCountry: '',
                  userPostal_code: '',
                }}
                validationSchema={createEventSchema}
                onSubmit={(values: any) => {
                  const event = {
                    name: values.name,
                    cover: values.cover,
                    thumb: values.thumb,
                    footer: values.footer,
                    description: values.description,
                    details: values.details,
                    eventTime: values.eventTime,
                    eventEndTime: values.eventEndTime,
                    ageRestriction: ageRestriction ? values.ageRestriction : 0,
                    eventDuration: values.eventDuration,
                    venue: values.venue,
                    isPrivate: isPrivate,
                    capacity: values.capacity,
                    videoTrailer: values.videoTrailer,
                    googleMapLink: values.googleMapLink,
                    termsAndConditions: terms.length ? terms : defaultTerms,
                    agent: agent._id,
                    userName: true,
                    userEmail: true,
                    userPhone: values.userPhone[0] ? true : false,
                    userAge: values.userAge[0] ? true : false,
                    userGender: values.userGender[0] ? true : false,
                    userOccupation: values.userOccupation[0] ? true : false,
                    userCity: values.userCity[0] ? true : false,
                    userCountry: values.userCountry[0] ? true : false,
                    userPostal_code: values.userPostal_code[0] ? true : false,
                  };

                  setEventData(event);
                  // console.log(event)
                  setShowModal(true);
                }}
              >
                {({ errors, touched, setFieldValue }: any) => (
                  <Form className='mt-4 text-start font-lato'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div className='relative col-span1 md:col-span-2'>
                        <label htmlFor='' className='form_label'>
                          Event Name*
                        </label>
                        <Field
                          name='name'
                          placeholder='Event name'
                          className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  h-10  text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.name && touched.name ? (
                            <small className='text-red-400 mt-1'>
                              {errors.name}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative col-span1 md:col-span-2'>
                        <label htmlFor='' className='form_label'>
                          Event Description*
                          <span className='text-sm'>(max 500 characters)</span>
                        </label>
                        <Field
                          name='description'
                          as='textarea'
                          placeholder='Event description'
                          className='border-[1px] h-[80px] border-brand_color outline-none text-gray-800 bg-white w-full text-sm px-2 py-1 my-1 rounded-md '
                        ></Field>
                        <div>
                          {errors.description && touched.description ? (
                            <small className='text-red-400 mt-1'>
                              {errors.description}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative col-span1 md:col-span-2'>
                        <label htmlFor='' className='form_label'>
                          Event Details
                          <span className='text-sm'>
                            (Details is optional and must not exceed 5000
                            characters)
                          </span>
                        </label>

                        <Field name='details' as='textarea' className='my-4'>
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
                            <small className='text-red-400'>
                              {errors.details}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Event Thumbnail* (width*height = 1080*600)
                        </label>
                        <Field
                          name='thumb'
                          value={undefined}
                          onChange={(e: any) => {
                            // validateImageDimensions(e.target.files[0],setDimension)
                            setFieldValue('thumb', e.target.files[0]);
                          }}
                          type='file'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full px-2 rounded-md outline-none'
                          placeholder='Enter thumbnail url'
                        />

                        <div>
                          {errors.thumb && touched.thumb ? (
                            <small className='text-red-400 mt-1'>
                              {errors.thumb}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Event cover image* (width*height = 1920*1080)
                        </label>
                        <Field
                          name='cover'
                          type='file'
                          value={undefined}
                          onChange={(e: any) =>
                            setFieldValue('cover', e.target.files[0])
                          }
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter cover URL'
                        />
                        <div>
                          {errors.cover && touched.cover ? (
                            <small className='text-red-400 mt-1'>
                              {errors.cover}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Event Footer image (width*height = 1920*1080)
                        </label>
                        <Field
                          name='footer'
                          value={undefined}
                          onChange={(e: any) =>
                            setFieldValue('footer', e.target.files[0])
                          }
                          type='file'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Event footer'
                        />
                        <div>
                          {errors.footer && touched.footer ? (
                            <small className='text-red-400 mt-1'>
                              {errors.footer}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Event venue*
                        </label>
                        <Field
                          name='venue'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter venue'
                        />
                        <div>
                          {errors.venue && touched.venue ? (
                            <small className='text-red-400 mt-1'>
                              {errors.venue}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Video trailer
                        </label>
                        <Field
                          name='videoTrailer'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter event video trailer'
                        />
                        <div>
                          {errors.videoTrailer && touched.videoTrailer ? (
                            <small className='text-red-400 mt-1'>
                              {errors.videoTrailer}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative'>
                        <label htmlFor='' className='form_label'>
                          Google map link
                        </label>
                        <Field
                          name='googleMapLink'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter google map link'
                        />
                        <div>
                          {errors.googleMapLink && touched.googleMapLink ? (
                            <small className='text-red-400 mt-1'>
                              {errors.googleMapLink}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className={`relative `}>
                        <label htmlFor='' className='form_label'>
                          Event capacity*&nbsp;
                          <span>
                            (
                            {seatQuota.eligible ? (
                              <span className='text-green-800'>
                                Available seat:
                                <span className='text-gray-900'>
                                  {seatQuota.maxSeats -
                                    seatQuota.currentSeatCount}
                                </span>
                              </span>
                            ) : (
                              <span className='text-red-500'>
                                You have reached your event seat capacity limit,
                                please contact with Seattron
                              </span>
                            )}
                            )
                          </span>
                        </label>
                        <Field
                          name='capacity'
                          type='number'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter capacity'
                        />
                        <div>
                          {errors.capacity && touched.capacity ? (
                            <small className='text-red-400 mt-1'>
                              {errors.capacity}
                            </small>
                          ) : null}
                        </div>
                      </div>
                      <div className='flex items-center space-x-4 justify-start'>
                        <input
                          type='checkbox'
                          name=''
                          className='cursor pointer'
                          onChange={() => setAgeRestriction(!ageRestriction)}
                          id=''
                        />
                        <p>Age Restriction</p>
                        {
                          <div>
                            {ageRestriction && (
                              <div>
                                <div className='relative'>
                                  <Field
                                    name='ageRestriction'
                                    type='number'
                                    className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                                    placeholder='Enter minimum age'
                                  />
                                  <div>
                                    {errors.capacity && touched.capacity ? (
                                      <small className='text-red-400 mt-1'>
                                        {errors.capacity}
                                      </small>
                                    ) : null}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        }
                      </div>

                      <div className='grid grid-cols-1 lg:grid-cols-1 text-black'>
                        <div className='relative '>
                          <label htmlFor='' className='form_label'>
                            Event Time*
                          </label>

                          <Field
                            name='eventTime'
                            type='datetime-local'
                            className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                            placeholder='Enter date and time'
                          />
                          <div>
                            {errors.eventTime && touched.eventTime ? (
                              <small className='text-red-400 mt-1'>
                                {errors.eventTime}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                      <div className='relative text-black'>
                        <label htmlFor='' className='form_label'>
                          Event End Time
                        </label>
                        <Field
                          name='eventEndTime'
                          type='datetime-local'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Enter date and time'
                        />
                        <div>
                          {errors.eventEndTime && touched.eventEndTime ? (
                            <small className='text-red-400 mt-1'>
                              {errors.eventEndTime}
                            </small>
                          ) : null}
                        </div>
                      </div>

                      <div className='relative '>
                        <label htmlFor='' className='form_label'>
                          Event Duration (hours)
                        </label>
                        <Field
                          name='eventDuration'
                          type='text'
                          className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                          placeholder='Event end time'
                        />
                        <div>
                          {errors.eventDuration && touched.eventDuration ? (
                            <small className='text-red-400 mt-1'>
                              {errors.eventDuration}
                            </small>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className='relative flex justify-start items-center space-x-2 my-4'>
                      <p className='w-32 font-semibold'>Visibility: </p>
                      <div
                        className='flex space-x-2 items-center w-40'
                        onClick={() => handleWarning()}
                      >
                        <Field
                          type='radio'
                          name='isPrivate'
                          value='false'
                          id='public'
                          checked={!isPrivate}
                        />

                        <label htmlFor='public'>Public</label>
                      </div>
                      <div
                        className='flex space-x-2 items-center w-40'
                        onClick={() => handleWarning()}
                      >
                        <Field
                          type='radio'
                          name='isPrivate'
                          value='true'
                          id='private'
                          checked={isPrivate}
                        />

                        <label htmlFor='private'>Private</label>
                      </div>
                    </div>

                    <div>
                      <p className='text-2xl text-brand_color mt-6'>
                        User information
                      </p>
                      <p className='text-lg my-4 text-gray-600'>
                        Select options for ticket
                      </p>

                      <div className='grid grid-cols-2 md:grid-cols-3 gap-6'>
                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch'>
                            <Field
                              type='checkbox'
                              name='userName'
                              value='userName'
                              checked={true}
                              className='toggle-input '
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Name</p>
                        </div>

                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userEmail'
                              value='userEmail'
                              checked={true}
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Email</p>
                        </div>

                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userPhone'
                              value='userPhone'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Phone</p>
                        </div>
                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userAge'
                              value='userAge'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Age</p>
                        </div>
                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userGender'
                              value='userGender'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Gender</p>
                        </div>
                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userOccupation'
                              value='userOccupation'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Occupation</p>
                        </div>

                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userCity'
                              value='userCity'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>City</p>
                        </div>
                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userCountry'
                              value='userCountry'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Country</p>
                        </div>

                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userPostal_code'
                              value='userPostal_code'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>Postal code</p>
                        </div>

                        <div className='flex items-center justify-start '>
                          <div className='toggle-switch '>
                            <Field
                              type='checkbox'
                              name='userTshirtSize'
                              value='userTshirtSize'
                              className='toggle-input'
                            />
                            <label className='toggle-label' />
                          </div>
                          <p>T-Shirt Size</p>
                        </div>


                        <div className='relative flex items-center justify-start space-x-3'>
                          <label htmlFor='' className='form_label w-full'>
                            Select id type:
                          </label>
                          <Field
                            name='id_type'
                            as='select'
                            className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                            placeholder='Event category'
                          >
                            <option value='none' defaultChecked>
                              None
                            </option>
                            <option value='NID'>NID</option>
                            <option value='passportID'>Passport ID</option>
                            <option value='studentID'>Student ID</option>
                            <option value='jobID'>Job ID</option>
                          </Field>
                          <div>
                            {errors.userId_type && touched.userId_type ? (
                              <small className='text-red-400 absolute left-0 top-11'>
                                {errors.userId_type}
                              </small>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      className='text-xl justify-center items-center absolute bottom-0 flex space-x-2 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                      type='submit'
                    >
                      Save to draft and Add Ticket
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className='w-full min-h-[200px]'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 col-span-2 text-start my-6'>
                <div className='text-start'>
                  <label htmlFor='' className='w-full  font-semibold'>
                    Event Terms and Conditions*
                  </label>
                  <div className='flex justify-start items-center space-x-2 my-2'>
                    <input
                      type='radio'
                      name='terms'
                      className='cursor-pointer'
                      value='default'
                      defaultChecked
                      onChange={(e) => {
                        if (e.target.value === 'default') {
                          setShowTerms(false);
                        }
                      }}
                      id='default'
                    />

                    <label htmlFor='default'>
                      Default
                      <span
                        className='mx-4 py-1 px-2 text-sm rounded-md bg-gray-200 cursor-pointer'
                        onClick={() => setShowTermsModal(!showTermsModal)}
                      >
                        See default terms and conditions
                      </span>
                    </label>
                  </div>
                  <div className='flex justify-start items-center space-x-2 my-2'>
                    <input
                      type='radio'
                      name='terms'
                      className='cursor-pointer'
                      value='custom'
                      onChange={(e) => {
                        if (e.target.value === 'custom') {
                          setShowTerms(true);
                        }
                      }}
                      id='custom'
                    />
                    <label htmlFor='custom'>Custom</label>
                  </div>
                </div>

                <div className='col-span-2 my-2'>
                  {
                    <div>
                      {showTerms && (
                        <div>
                          <div>
                            Write Terms and Conditions up to 12. Each one must
                            not exceed 280 characters
                          </div>
                          {[...Array(count)].map((e, i) => (
                            <div key={i} className='relative'>
                              <Terms setTerms={setTerms} terms={terms} />
                              <div></div>
                            </div>
                          ))}
                          {/* add tickets button */}
                          <div
                            onClick={() => {
                              let newCount = count;
                              if (newCount <= 12) {
                                let increasedCount = newCount + 1;

                                setCount(increasedCount);
                              }
                            }}
                            className='my-2 float-right bg-brand_gradient px-4 py-2 flex items-center justify-center space-x-3 rounded-xl text-white w-max cursor-pointer'
                          >
                            Add More
                            <BsPlus />
                          </div>
                        </div>
                      )}
                    </div>
                  }
                </div>
              </div>
              {/* event lineup */}
              {/* <div className='grid grid-cols-1 col-span-2 text-start mb-6 '>
                <div className="text-start">
                  <button onClick={() => {
                    setShowLineup(true)
                  }} className='text-sm justify-center items-center flex space-x- mt-6 mb-4 bg-[#4a8d59] px-4 py-2 rounded-lg text-white w-max'>
                    <BsPlus /> Add Lineup
                  </button>
                </div>
                <div className='my-2'>
                  {showLineup ?
                    <div>

                      <div>
                        {lineup.map((e: any, i: any) => (
                          <div key={i} className='relative my-2'>
                            <CreateLineup setLineUp={setLineUp} lineup={lineup} index={i} />
                            <div></div>
                          </div>
                        ))}
                        <div
                          onClick={() => {
                            setLineUp([...lineup, '']);
                          }}
                          className='my-1 float-right bg-brand_gradient px-4 py-2 flex items-center justify-center space-x-3 rounded-xl text-white w-max cursor-pointer'
                        >
                          Add More
                          <BsPlus />
                        </div>
                      </div>

                    </div> : null
                  }
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
