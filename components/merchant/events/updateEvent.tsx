import React, { useEffect, useRef, useState } from 'react';
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
import { defaultTerms } from 'lib/db';
import { format } from 'date-fns';
import { TiTick } from 'react-icons/ti';
import { MdClose } from 'react-icons/md';
import { setPopup } from 'redux/slices/popupslice';
import { getEventQuota, getEventSeatQuota } from 'redux/slices/EventSlice';
import UpdateTerms from './updateTerms';
import Image from 'next/image';
import Loader from '@/components/common/Loader';
import { RiArrowGoBackFill } from 'react-icons/ri';
import { ImWarning } from 'react-icons/im';
import { formats, modules } from '@/components/common/editor';

const UpdateEvent = (event: any) => {
  const data = event.eventData.data;
  const status = event.eventData.status;
  const eventStartTime = new Date(data.eventTime).toLocaleString();
  const eventEndTime = new Date(data.eventEndTime).toLocaleString();
  const eventTime = useRef();
  const EndTime = useRef();
  const [showModal, setShowModal] = useState(false);

  const [showTermsModal, setShowTermsModal] = useState(false);
  const [terms, setTerms] = useState<any>([]);
  const [showTerms, setShowTerms] = useState(true);

  const [eventData, setEventData] = useState<any>();
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [cover, setCover] = useState<any>(null);
  const [footer, setFooter] = useState<any>(null);

  // const [showLineup, setShowLineup] = useState(true)
  // const [lineups, setLineups] = useState<any>([])
  const [isPrivate, setisPrivate] = useState(data.isPrivate);
  const [ageRestriction, setAgeRestriction] = useState(
    data?.ageRestriction ? true : false
  );
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getEventQuota(agent.token));
    dispatch(getEventSeatQuota(agent.token));
  }, [dispatch, agent.token]);
  useEffect(() => {
    setTerms(data.termsAndConditions);
  }, [data.termsAndConditions]);
  // useEffect(() => {
  //   setLineups(data?.eventLineup ? data.eventLineup : [])
  // }, [data.eventLineup]);
  const seatQuota = useAppSelector(
    (state) => state.eventReducer.getEventSeatQuota.data
  );
  // private public hannler
  // const handleWarning = () => {
  //   setShowWarning(true)
  // }
  const updateEventHandler = (updateData: any) => {
    // console.log(updateData)
    axios
      .put('events/' + data._id, updateData, {
        headers: {
          Authorization: `Bearer ${agent.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Event updated successfully',
            show: true,
          })
        );
        router.push(`/merchant/dashboard/events/${res.data.data._id}`);

        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
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
  const ThumbSize = 1024 * 512;
  const CoverSize = 1024 * 512;
  const FooterSize = 1024 * 512;

  const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
  const createEventSchema = Yup.object().shape({
    name: Yup.string(),
    thumb: Yup.mixed()
      .test('fileSize', 'Image size will be less than 1 MB', (value) =>
        value?.size ? value.size <= ThumbSize : true
      )
      .test('fileFormat', 'Unsupported Format', (value) =>
        value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
      ),
    cover: Yup.mixed()
      .test('fileSize', 'Image size will be less than 1 MB', (value) =>
        value?.size ? value.size <= CoverSize : true
      )
      .test('fileFormat', 'Unsupported Format', (value) =>
        value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
      ),

    footer: Yup.mixed()
      .test('fileSize', 'Image size will be less than 1 MB', (value) =>
        value?.size ? value.size <= FooterSize : true
      )
      .test('fileFormat', 'Unsupported Format', (value) =>
        value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
      ),
    description: Yup.string().test(
      'description',
      'Must not exceed 500 characters',
      (val): any => val && val.toString().length <= 500
    ),
    details: Yup.string()
      .notRequired()
      .test('description', 'Must not exceed 5000 characters', (val): any =>
        val ? val.toString().length <= 5000 : true
      ),
    eventEndTime: Yup.mixed(),
    eventTime: Yup.mixed(),
    eventDuration: Yup.mixed(),
    ageRestriction: Yup.mixed(),
    venue: Yup.string(),
    isPrivate: Yup.boolean(),
    capacity: Yup.number(),
    videoTrailer: Yup.string(),
    googleMapLink: Yup.string(),
    userName: Yup.mixed(),
    userEmail: Yup.mixed(),
    userPhone: Yup.mixed(),
    userId_type: Yup.mixed(),
    userAge: Yup.mixed(),
    userGender: Yup.mixed(),
    userOccupation: Yup.mixed(),
    userCity: Yup.mixed(),
    userCountry: Yup.mixed(),
    userPostal_code: Yup.mixed(),
    // userTshirtSize: Yup.array(),
  });

  return (
    <Loader status={status}>
      <div
        onClick={() => router.back()}
        className='h-12 w-12 my-2 rounded-lg bg-gray-300 flex items-center justify-center cursor-pointer'
      >
        <RiArrowGoBackFill className='h-6 w-6 text-gray-700 hover:text-gray-900' />
      </div>
      {/* <Modal
        showModal={showWarning}
        setShowModal={setShowWarning}
        cancel='Make Public'
        cancelClr='bg-teal-600'
        confirmCrl='bg-red-500'
        title='Are you sure you switch ticket type?'
        confirmText='Make Private'
        setIsFree={setisPrivate}
      >
        <p className='text-yellow-500 flex_center space-x-2'><span> <ImWarning /></span> <span > If this event is made Private,  Entry and ticket acquisition will now be facilitated exclusively through private links. Unauthorized link sharing is prohibited and may result in entry denial.</span></p>
      </Modal> */}
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={updateEventHandler}
        title='Are you sure?'
        confirmText='Update Event'
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
                    <small>{eventData.isInviteOnly ? 'Yes' : 'No'}</small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Start Time:</p>
                    <small>
                      {eventData.eventTime
                        ? format(
                            new Date(eventData.eventTime),
                            "MMM dd 'at' hh:MM a"
                          )
                        : null}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>End time:</p>
                    <small>
                      {eventData.eventEndTime
                        ? format(
                            new Date(eventData.eventEndTime),
                            "MMM dd 'at' hh:MM a"
                          )
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
              Update {data.name}
              {/* <span>
                {quota.eligible ? null : (
                  <span className='text-lg'>
                    (
                    <span className='text-red-500'>
                      OOPS! You have exceeded your event limit, please contact
                      Seattron.
                    </span>
                    )
                  </span>
                )}
              </span> */}
            </p>

            {/* for someone else information */}
            {data.name && (
              <div className='my-4'>
                <Formik
                  initialValues={{
                    name: data.name,
                    cover: null,
                    thumb: null,
                    description: data.description,
                    details: data.details,
                    eventTime: data.eventTime,
                    eventEndTime: data.eventEndTime,
                    ageRestriction: data.ageRestriction,
                    eventDuration: data.eventDuration,
                    venue: data.venue,
                    category: data.category,
                    capacity: data.capacity,
                    footer: null,
                    isPrivate: data.isPrivate,
                    videoTrailer: data.videoTrailer,
                    googleMapLink: data.googleMapLink,
                    agent: agent._id,
                    userName: data.userName,
                    userEmail: data.userEmail,
                    userPhone: data.userPhone,
                    userId_type: data.userId_type,
                    userAge: data.userAge,
                    userGender: data.userGender,
                    userOccupation: data.userOccupation,
                    userCity: data.userCity,
                    userCountry: data.userCountry,
                    userPostal_code: data.userPostal_code,
                    // userTshirtSize: data.userTshirtSize ? data.userTshirtSize  : null,
                  }}
                  validationSchema={createEventSchema}
                  onSubmit={(values: any) => {
                    const newTerms = terms.filter((term: any) => term !== '');
                    // const newlineup = lineups.filter((l: any) => l !== '');
                    let formData = values;

                    formData.ageRestriction = ageRestriction
                      ? values.ageRestriction
                      : 0;

                    setEventData({
                      ...formData,
                      isPrivate: isPrivate,
                      termsAndConditions: newTerms,
                    });
                    setShowModal(true);
                  }}
                >
                  {({ errors, touched, setFieldValue }: any) => (
                    <Form className='mt-4 text-start font-lato'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className='relative col-span1 md:col-span-2'>
                          <label htmlFor='' className='form_label'>
                            Event Name*
                          </label>
                          <Field
                            name='name'
                            // defaultValue={data.name}
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
                            <span className='text-sm'>
                              (max 500 characters)
                            </span>
                          </label>
                          <Field
                            name='description'
                            // defaultValue={data.description}
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

                          <Field name='details' className='my-4'>
                            {({ field }: any) => (
                              <ReactQuill
                                // defaultValue={data.details}
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
                          <div className='flex items-center justify-start py-2'>
                            <Field
                              name='thumb'
                              value={undefined}
                              onChange={(e: any) => {
                                setFieldValue('thumb', e.target.files[0]);

                                setThumbnail(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                              type='file'
                              className='custom-file-event  text-gray-800 text-red  text-sm  my-1  w-200 px-2 rounded-md outline-none'
                              placeholder='Enter thumbnail url'
                            />
                            {thumbnail ? (
                              <Image
                                src={thumbnail}
                                height={70}
                                width={120}
                                alt='thumb'
                                className='h-[70px] w-[120px] object-cover rounded-md'
                              ></Image>
                            ) : (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_SERVER_HOST +
                                  data.thumb
                                }
                                height={70}
                                width={120}
                                alt='thumb'
                                className='h-[70px] w-[120px] object-cover rounded-md'
                              ></Image>
                            )}
                          </div>

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
                          <div className='flex items-center justify-start py-2'>
                            <Field
                              name='cover'
                              value={undefined}
                              onChange={(e: any) => {
                                setFieldValue('cover', e.target.files[0]);

                                setCover(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                              type='file'
                              className='custom-file-event  text-gray-800 text-red  text-sm  my-1  w-200 px-2 rounded-md outline-none'
                              placeholder='Enter thumbnail url'
                            />
                            {cover ? (
                              <Image
                                src={cover}
                                height={70}
                                width={120}
                                alt='cover'
                                className='h-[70px] w-[120px] object-cover rounded-md'
                              ></Image>
                            ) : (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_SERVER_HOST +
                                  data.cover
                                }
                                height={70}
                                width={120}
                                alt='cover'
                                className='h-[70px] w-[120px] object-cover rounded-md'
                              ></Image>
                            )}
                          </div>
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
                          <div className='flex items-center justify-start py-2'>
                            <Field
                              name='footer'
                              value={undefined}
                              onChange={(e: any) => {
                                setFieldValue('footer', e.target.files[0]);

                                setFooter(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                              type='file'
                              className='custom-file-event  text-gray-800 text-red  text-sm  my-1  w-200 px-2 rounded-md outline-none'
                              placeholder='Enter thumbnail url'
                            />
                            {footer ? (
                              <Image
                                src={footer}
                                height={70}
                                width={120}
                                alt='footer'
                                className='h-[70px] w-[120px] object-cover rounded-md'
                              ></Image>
                            ) : (
                              <Image
                                src={
                                  process.env.NEXT_PUBLIC_SERVER_HOST +
                                  data.footer
                                }
                                height={70}
                                width={120}
                                alt='footer'
                                className='h-[70px] w-[120px] object-cover rounded-md'
                              ></Image>
                            )}
                          </div>
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
                            // defaultValue={data.venue}
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
                            // defaultValue={data.videoTrailer}
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
                            // defaultValue={data.googleMapLink}
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
                            Event capacity*{' '}
                            <span>
                              (
                              {seatQuota.eligible ? (
                                <span className='text-green-800'>
                                  Available seat:
                                  <span className='text-gray-900'>
                                    {' '}
                                    {seatQuota.maxSeats -
                                      seatQuota.currentSeatCount}{' '}
                                  </span>
                                </span>
                              ) : (
                                <span className='text-red-500'>
                                  You have reached your event seat capacity
                                  limit, please contact with Seattron.
                                </span>
                              )}
                              )
                            </span>
                          </label>
                          <Field
                            name='capacity'
                            // defaultValue={data.capacity}
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

                        {
                          <div className='flex justify-start space-x-4 items-center'>
                            <div className='flex justify-start space-x-2 items-center'>
                              <input
                                type='checkbox'
                                name=''
                                className='cursor pointer'
                                defaultChecked={data.ageRestriction}
                                onChange={() =>
                                  setAgeRestriction(!ageRestriction)
                                }
                                id=''
                              />
                              <p>Age Restriction</p>
                            </div>
                            {ageRestriction && (
                              <div className='relative'>
                                <p>Minimum age</p>
                                <Field
                                  name='ageRestriction'
                                  type='number'
                                  className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
                                  placeholder='Enter minimum age'
                                />
                                <div>
                                  {errors.ageRestriction &&
                                  touched.ageRestriction ? (
                                    <small className='text-red-400 mt-1'>
                                      {errors.ageRestriction}
                                    </small>
                                  ) : null}
                                </div>
                              </div>
                            )}
                          </div>
                        }

                        <div className='grid grid-cols-1 lg:grid-cols-1 text-black'>
                          <div className='relative '>
                            <label htmlFor='' className='form_label'>
                              Event Time*
                            </label>

                            <Field
                              name='eventTime'
                              // defaultValue={eventStartTime}
                              ref={eventTime}
                              type='text'
                              onFocus={(e: any) =>
                                (e.target.type = 'datetime-local')
                              }
                              onBlur={(e: any) => {
                                e.target.type = 'text';
                                e.target.value = e.target.value
                                  ? e.target.value
                                  : eventStartTime;
                              }}
                              className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full  px-2 rounded-md outline-none'
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
                            // defaultValue={eventEndTime}
                            ref={EndTime}
                            type='text'
                            onFocus={(e: any) =>
                              (e.target.type = 'datetime-local')
                            }
                            onBlur={(e: any) => {
                              e.target.type = 'text';
                              e.target.value = e.target.value
                                ? e.target.value
                                : eventEndTime;
                            }}
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
                            // defaultValue={data.eventDuration}
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
                        <div className='flex space-x-2 items-center w-40'>
                          <Field
                            type='radio'
                            name='isPrivate'
                            value='false'
                            id='public'
                            checked={!isPrivate}
                          />

                          <label htmlFor='public'>Public</label>
                        </div>
                        <div className='flex space-x-2 items-center w-40'>
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
                      {/* <div className='relative flex justify-start items-center space-x-2 my-4'>
                        <p className='w-32 font-semibold'>Event Type: </p>
                        <div className='flex space-x-2 items-center w-40' onClick={() => handleWarning()}>
                          <Field type="radio" name="isPaid" value='true' id='paid' checked={!isFree} />

                          <label htmlFor='paid'>Paid</label>
                        </div>
                        <div className='flex space-x-2 items-center w-40' onClick={() => handleWarning()}>
                          <Field type="radio" name="isPaid" value='false' id='free' checked={isFree} />

                          <label htmlFor='free'>Free</label>
                        </div>
                      </div> */}
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
                                name='userPhone'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userPhone}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>Phone</p>
                          </div>
                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userAge'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userAge}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>Age</p>
                          </div>
                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userGender'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userGender}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>Gender</p>
                          </div>
                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userOccupation'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userOccupation}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>Occupation</p>
                          </div>

                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userCity'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userCity}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>City</p>
                          </div>
                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userCountry'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userCountry}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>Country</p>
                          </div>

                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userPostal_code'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userPostal_code}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>Postal code</p>
                          </div>

                          <div className='flex items-center justify-start '>
                            <div className='toggle-switch '>
                              <Field
                                name='userTshirtSize'
                                type='checkbox'
                                className='my-4'
                              >
                                {({ field }: any) => (
                                  <input
                                    type='checkbox'
                                    value={field.value}
                                    defaultChecked={data.userTshirtSize ? data.userTshirtSize : false}
                                    onChange={field.onChange(field.name)}
                                    className='toggle-input'
                                  />
                                )}
                              </Field>
                              <label className='toggle-label' />
                            </div>
                            <p>T-Shirt Size</p>
                          </div>

                          <div className='relative flex items-center justify-start space-x-3'>
                            <label htmlFor='' className='form_label w-full'>
                              Select id type:
                            </label>
                            <Field
                              name='userId_type'
                              as='select'
                              className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                              placeholder='Event category'
                            >
                              <option
                                value={
                                  data.userId_type ? data.userId_type : null
                                }
                                defaultChecked
                              >
                                {data.userId_type ? data.userId_type : 'None'}
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
                        className='text-xl justify-center items-center absolute bottom-6 flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                        type='submit'
                      >
                        Update Event
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 col-span-2 text-start min-h-200'>
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
                    onClick={(e: any) => {
                      if (e.target.value === 'default') {
                        setShowTerms(false);
                        setTerms(defaultTerms);
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
                    defaultChecked
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
                          Write Terms and Conditions up to 12. Each one must not
                          exceed 280 characters
                        </div>
                        {terms?.map((term: any, i: any) => (
                          <div key={i} className='relative'>
                            <UpdateTerms
                              setTerms={setTerms}
                              terms={terms}
                              i={i}
                              term={term}
                            />
                          </div>
                        ))}
                        {/* add tickets button */}
                        <div
                          onClick={() => {
                            if (terms?.length <= 12) {
                              setTerms([...terms, '']);
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
            {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-6 col-span-2 text-start mb-6 min-h-200'>
              <div>
                <p className='w-full  font-semibold'>
                  Event Lineup
                </p>
                <div
                  onClick={() => {
                    setLineups([...lineups, '']);
                  }}
                  className='my-2 bg-[#4a8d59] px-4 py-2 flex items-center justify-start space-x-3 rounded-xl text-white w-max cursor-pointer'
                >
                  Add new one
                  <BsPlus />
                </div>
              </div>

              <div className='col-span-2 my-2'>
                {showLineup ?
                  <div>

                    <div>
                      {lineups?.map((lineup: any, i: any) => (
                        <div key={i} className='relative'>
                          <UpdateLineup
                            setLineups={setLineups}
                            lineups={lineups}
                            i={i}
                            lineup={lineup}
                          />
                        </div>
                      ))}

                    </div>

                  </div> : null
                }
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </Loader>
  );
};

export default UpdateEvent;
