import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as Yup from 'yup';
import Modal from '@/components/common/Modal';
import Table from 'rc-table';
import { getAgentEvents } from 'redux/slices/EventSlice';
import { setPopup } from 'redux/slices/popupslice';
import { getCheckersByAgent, registerChecker } from 'redux/slices/checkerSlice';
import { format } from 'date-fns';
import TablePagination from '@/components/ui/TablePagination';
import Loader from '@/components/common/Loader';
import axios from '@/axios/config';


const Checker = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [checker_id, setChecker_id] = useState<any>('');
  const [event_id, setEvent_id] = useState<any>('');
  const [checkerData, setCheckerData] = useState<any>({});
  const [perPage, setPerPage] = useState(10);
  const [size, setSize] = useState(perPage);
  const [current, setCurrent] = useState(1);
  const dispatch = useAppDispatch();
  const [showRestrictModal, setRestrictModal] = useState(false);
  const [approveModal, setApproveModal] = useState(false);
  const [selectEvent, setSelectEvent] = useState(false);
  const [selectedChecker, setSelectedChecker] = useState({});
  // const router = useRouter();
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  useEffect(() => {
    dispatch(getAgentEvents(agent.token));
    dispatch(getCheckersByAgent(agent.token));
  }, [dispatch, agent.token]);

  const eventsData = useAppSelector(
    (state) => state.eventReducer.getAgentEvents.data
  );
  const allCheckers = useAppSelector(
    (state) => state.checkerReducer.getCheckersByAgent
  );
  const { data, status } = allCheckers;
  // if(allCheckers.length){
  //   allCheckers.sort((a:any, b:any) => new Date(b.createdAt) - new Date(a.createdAt) );
  // }
  console.log(allCheckers)
  const getData = (current: any, pageSize: any) => {
    // Normally you should get the allCheckers from the server
    if (data?.length > 0) {
      return data.slice((current - 1) * pageSize, current * pageSize);
    } else return [];
  };
  // console.log(allCheckers);
  const selectedEvent = eventsData.find(
    (e: any) => e._id === checkerData.event
  );
  const dateNow = new Date().getTime();
  const allUpcomingEvents = eventsData.filter((event: any) => {
    const endTime = new Date(event.eventEndTime).getTime();
    if (dateNow < endTime) {
      return event;
    }
  });
  // assign event handler
  const handleSelectEvent = () => {
    axios
      .get(`ticket-checker/assign/${event_id}/${checker_id}`, {
        headers: {
          Authorization: `Bearer ${agent.token}`,
        },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Event assigned successfully',
            show: true,
          })
        );
        dispatch(getCheckersByAgent(agent.token));
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
  // approve checker
  const handleUnRestrict = () => {
    axios
      .get('ticket-checker/un-restrict/' + selectedChecker, {
        headers: {
          Authorization: `Bearer ${agent.token}`,
        },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Un-restricted successfully',
            show: true,
          })
        );
        dispatch(getCheckersByAgent(agent.token));
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

  const handleRestrictChecker = () => {
    axios
      .get(`ticket-checker/restrict/` + selectedChecker, {
        headers: { Authorization: `Bearer ${agent.token}` },
      })
      .then((res) => {
        // console.log(res);
        dispatch(
          setPopup({
            type: 'success',
            message: 'Restricted successfully',
            show: true,
          })
        );
        dispatch(getCheckersByAgent(agent.token));
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
  const handleAddChecker = () => {
    dispatch(
      registerChecker({
        userName: checkerData.userName.toLowerCase(),
        event: checkerData.event,
        password: checkerData.password,
        token: agent.token,
      })
    ).then((res: any) => {
      // console.log(res);
      if (res.type === 'checker/registerChecker/fulfilled') {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Checker registration successful',
            show: true,
          })
        );
        dispatch(getCheckersByAgent(agent.token));
        // router.reload();
      } else {
        dispatch(
          setPopup({
            type: 'failed',
            message: res.payload.response.data.message,
            show: true,
          })
        );
      }
    });
    setTimeout(() => {
      // After 3 seconds set the show value to false
      dispatch(setPopup({ show: false, type: '', message: '' }));
    }, 5000);
  };
  const handleReset = (resetForm: any) => {
    setTimeout(() => {
      // After 3 seconds set the show value to false
      resetForm();
    }, 3000);
  };
  const addCheckerSchema = Yup.object().shape({
    userName: Yup.string()
      .min(3, 'Username should be 3 chars minimum.')
      .required('Username is required')
      .matches(/^\S*$/, 'Spaces are not allowed in userName'),
    password: Yup.string()
      .required('Password is required')
      .min(4, 'Password is too short - should be 4 chars minimum.'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
    event: Yup.string().required('Must select an event'),
  });
  return (
    <div className='h-full w-full'>
      <div className=''>
        {showModal ? (
          <Modal
            title='Register this checker with'
            setShowModal={setShowModal}
            showModal={showModal}
            handleConfirm={handleAddChecker}
            confirmText='Yes'
          >
            <div className='flex flex-col space-y-4 items-start'>
              <p>Username: {checkerData?.userName}</p>
              <p>Password: {checkerData?.password}</p>
              <p>Event: {selectedEvent.name}</p>
            </div>
          </Modal>
        ) : null}
      </div>
      <div className=''>
        {showRestrictModal ? (
          <Modal
            title='Are you sure you want to restrict this checker?'
            setShowModal={setRestrictModal}
            showModal={showRestrictModal}
            handleConfirm={handleRestrictChecker}
            confirmText='Yes'
          ></Modal>
        ) : null}
      </div>
      <div className=''>
        {selectEvent ? (
          <Modal
            title='Select an event to assign'
            setShowModal={setSelectEvent}
            showModal={selectEvent}
            handleConfirm={handleSelectEvent}
            confirmText='Confirm'
          >
            {allUpcomingEvents.map((event: any) => (
              <p
                key={event._id}
                className={`px-2 py-1 bg-gray-200 text-gray-800 my-1 rounded-md cursor-pointer hover:bg-gray-300 ${event_id === event._id ? 'bg-brand_gradient' : ''
                  }`}
                onClick={() => setEvent_id(event._id)}
              >
                {event.name}
              </p>
            ))}
          </Modal>
        ) : null}
      </div>
      <div className=''>
        {approveModal ? (
          <Modal
            title='Are you sure you want to restrict this checker?'
            setShowModal={setApproveModal}
            showModal={approveModal}
            handleConfirm={handleUnRestrict}
            confirmText='Yes'
          ></Modal>
        ) : null}
      </div>
      <div className='w-full text-start rounded-lg bg-gray-50 py-6 px-4 shadow-sm shadow-slate-400'>
        <p className='dashboard_secondary_title'>Register New Checker</p>

        <Formik
          initialValues={{
            userName: '',
            password: '',
            confirmPassword: '',
            event: '',
          }}
          validationSchema={addCheckerSchema}
          onSubmit={(values: any) => {
            setShowModal(true);
            setCheckerData(values);
          }}
        >
          {({ errors, touched, resetForm }: any) => (
            <Form className=' text-left mt-8 max-w-400'>
              <div className='flex flex-col space-y-4 items-left justify-start'>
                <div className='relative w-full text-start'>
                  <label htmlFor=''>User Name</label>
                  <Field
                    name='userName'
                    type='text'
                    className='bg-gray-50 w-full mt-2 text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10  px-2 rounded-lg outline-none'
                    placeholder='Username'
                  />

                  <div>
                    {errors.userName && touched.userName ? (
                      <small className='text-red-500'>{errors.userName}</small>
                    ) : null}
                  </div>
                </div>

                <div className='relative w-full text-start'>
                  <label htmlFor=''>Password</label>
                  <Field
                    name='password'
                    type='text'
                    className='bg-gray-50 mt-2 text-black text-red border-[1px] border-gray-300 focus:border-blue-300  text-sm py-1 h-10 w-full   px-2 rounded-lg outline-none'
                    placeholder='Password'
                  />
                  <div>
                    {errors.password && touched.password ? (
                      <small className='text-red-500'>{errors.password}</small>
                    ) : null}
                  </div>
                </div>
                <div className='relative w-full text-start'>
                  <label htmlFor=''>Confirm Password</label>
                  <Field
                    name='confirmPassword'
                    type='text'
                    className='bg-gray-50 mt-2 text-black text-red border-[1px] border-gray-300 focus:border-blue-300  text-sm py-1 h-10 w-full   px-2 rounded-lg outline-none'
                    placeholder='Confirm Password'
                  />
                  <div>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <small className='text-red-500'>
                        {errors.confirmPassword}
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className='relative w-full text-start'>
                  <Field
                    name='event'
                    as='select'
                    className='bg-gray-50 mt-2 text-black text-red border-[1px] border-gray-300 focus:border-blue-300  text-sm py-1 h-10 w-full   px-2 rounded-lg outline-none'
                  >
                    <option value=''>Select Event</option>
                    {allUpcomingEvents?.map((event: any) => (
                      <option key={event._id} value={event._id}>
                        {event.name}
                      </option>
                    ))}
                  </Field>
                  <div>
                    {errors.event && touched.event ? (
                      <small className='text-red-500'>{errors.event}</small>
                    ) : null}
                  </div>
                </div>
                <button
                  className='w-full cursor-pointer rounded-lg hover:bg-white border-[1px] hover:border-brand_color bg-brand_gradient py-2 text-center text-xl font-bold text-white shadow-md xl:text-common'
                  type='submit'
                  onClick={() => handleReset(resetForm)}
                >
                  Register
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className='w-full text-start rounded-lg bg-gray-50 py-6 my-6 shadow-sm shadow-slate-400'>
        <p className='dashboard_secondary_title px-4'>All checker</p>
        {data?.length > 0 ? (
          <Loader status={status}>
            <Table
              //@ts-ignore
              columns={[
                {
                  title: 'User Name',
                  dataIndex: 'userName',
                  className: 'px-4',
                  width: 150,
                  key: 'userName',
                  align: 'left',
                },
                {
                  title: 'Assigned Event',
                  dataIndex: 'event',
                  className: 'px-2 transition-all duration-600 ease-in-out',
                  width: 150,
                  key: 'event',
                  align: 'left',
                  render: (event: any) => (
                    <div
                      className='flex space-x-2 justify-start items-center cursor-pointer'

                    >
                      <p>{event.name}</p>
                    </div>
                  ),
                },
                {
                  title: 'History',
                  dataIndex: 'events',
                  className: 'px-2',
                  width: 150,
                  key: 'events',
                  align: 'left',
                  render: (events: any) => (
                    <div className='text-start'>
                      {events.map((event: any) => (
                        <div key={event._id} className='w-full text-start'>
                          <li className='list-disc'>{event.name}</li>
                        </div>
                      ))}
                    </div>
                  ),
                },

                {
                  title: 'Joined At',
                  dataIndex: 'createdAt',
                  className: 'm-2 min-w-32 px-2',
                  key: 'createdAt',
                  align: 'left',
                  width: 200,
                  render: (createdAt: any) => (
                    <p>
                      {format(new Date(createdAt), "Pp")}
                    </p>
                  ),
                },
                {
                  title: 'Restriction',
                  dataIndex: 'isRestricted',
                  className: 'px-2',
                  key: 'isRestricted',
                  width: 100,
                  align: 'left',
                  render: (isRestricted: any, { _id }: any) => (
                    <div className='text-start'>
                      {isRestricted ? (
                        <p
                          onClick={() => {
                            setSelectedChecker(_id);
                            setApproveModal(true);
                          }}
                          className='bg-green-500 text-white rounded-md px-2 py-1 w-max cursor-pointer'
                        >
                          Un-restrict
                        </p>
                      ) : (
                        <p
                          onClick={() => {
                            setSelectedChecker(_id);
                            setRestrictModal(true);
                          }}
                          className='bg-red-500 text-white rounded-md px-2 py-1 w-max cursor-pointer'
                        >
                          Restrict
                        </p>
                      )}
                    </div>
                  ),
                },
                {
                  title: 'Assign An Event',
                  dataIndex: '_id',
                  className: 'px-2',
                  key: '_id',
                  width: 100,
                  align: 'left',
                  render: (_id: any, { event }: any) => (
                    <div>
                      <p
                        onClick={() => {
                          setSelectEvent(true);
                          setChecker_id(_id);
                          setEvent_id(event._id)
                        }}
                        className='bg-brand_gradient text-white rounded-md px-2 py-1 w-max cursor-pointer'
                      >
                        Select Event
                      </p>
                    </div>
                  ),
                },
              ]}
              rowClassName={({ isRestricted }) =>
                isRestricted
                  ? 'px-2 border-b-[1px] border-brand_color w-full overflow-x-scroll bg-red-200 h-10 transition-all duration-300 ease-in-out'
                  : 'px-2 border-b-[1px] border-brand_color w-full overflow-x-scroll h-10  bg-green-100 transition-all duration-300 ease-in-out'
              }
              className='text-sm p-2'
              emptyText={'No checker found'}
              data={getData(current, size)}
              rowKey='id'
              scroll={{ x: true }}
            />
            <TablePagination
              current={current}
              size={size}
              setSize={setSize}
              setCurrent={setCurrent}
              data={data}
            />
          </Loader>
        ) : (
          <p className='text-center text-lg py-5'>No checker found!</p>
        )}
      </div>
    </div>
  );
};

export default Checker;
