'use client';
import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ImCross } from 'react-icons/im'
import Modal from '@/components/common/Modal';
import axios from '@/axios/config';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPopup } from 'redux/slices/popupslice';
import { getEventLineup } from 'redux/slices/lineupSlice';
const CreateLineup = ({
    setCreate, event
}: any) => {
    const dispatch = useAppDispatch()
    const [showModal, setShowModal] = useState(false)
    const [data, setData] = useState({})
    const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
    ];

    // validation schema
    const CreateNewsSchema = Yup.object().shape({
        caption: Yup.string().required('caption is required'),
        thumb: Yup.mixed().test(
            'fileSize',
            'thumb size will be less than  1MB',
            (value: any) => (value?.size ? value.size <= 1000 * 1000 : true)
        ).test(
            'fileFormat',
            'Unsupported Format',
            (value: any) => value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
        ),
    });
    //  create lineup start

    const handleCreateLineup = () => {
        // console.log(data)
        axios
            .post('events/lineup', data, {
                headers: {
                    'Authorization': `Bearer ${agent.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {

                dispatch(getEventLineup({ token: agent.token, eventId: event._id }))
                setCreate(false)

                setShowModal(false)
                dispatch(setPopup({
                    type: 'success',
                    message: res.data.msg,
                    show: true
                }))

                setTimeout(() => {
                    dispatch(setPopup({ show: false, type: '', message: '' }));
                }, 5000);
            })
            .catch((err) => {
                // console.log(err)
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

    }
    // create lineup end
    return (
        <div className='font-lato relative border-[1px] border-gray-100 py-2 px-4 rounded-md'>
            {showModal ? (
                <Modal
                    handleConfirm={handleCreateLineup}
                    confirmText='Create'
                    // footer={true}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title='Are you sure you want to Create?'
                ></Modal>
            ) : null}
            <p onClick={() => setCreate(false)} className='absolute top-2 right-2 cursor-pointer'><ImCross className='w-4 h-4' /></p>
            <div className='w-full rounded-md'>
                <div className='text-gray-800 max-w-container'>
                    <div>
                        {/* for someone else information */}

                        <div className='my-4'>
                            <Formik
                                initialValues={{
                                    caption: '',
                                    thumb: '',

                                }}
                                validationSchema={CreateNewsSchema}
                                onSubmit={(values: any) => {
                                    let data = {
                                        caption: values.caption,
                                        thumb: values.thumb,
                                        eventId: event._id
                                    };
                                    setShowModal(true)
                                    setData(data)
                                    // const newlineup = lineup.filter((l: any) => l !== '');
                                    // setLineUp([...newlineup, data]);
                                    // setIndexLineup(data)
                                    // setIsSaved(true);
                                }}
                            >
                                {({ errors, touched, setFieldValue }: any) => (
                                    <Form className='mt-4 text-start font-lato'>
                                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                            <div className='relative'>
                                                <div>
                                                    <label htmlFor='' className='form_label'>
                                                        thumb (width*height = 1920*1080)
                                                    </label>
                                                    <Field
                                                        name='thumb'
                                                        value={undefined}
                                                        onChange={(e: any) => {
                                                            // validatethumbDimensions(e.target.files[0],setDimension)

                                                            setFieldValue('thumb', e.target.files[0]);
                                                        }}
                                                        type='file'
                                                        className='bg-gray-50 text-gray-800 text-red border-[1px]  focus:outline-blue-300 focus:outline-1 text-sm py-1 my-1 h-10 w-full px-2 rounded-md outline-none'
                                                        placeholder='Upload thumb'
                                                    />
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
                                                    Caption
                                                </label>
                                                <Field
                                                    name='caption'
                                                    placeholder='caption'
                                                    className='border-[1px]  outline-none text-gray-800 bg-white w-full  h-10  text-sm px-2 py-1 my-1 rounded-md '
                                                ></Field>
                                                <div>
                                                    {errors.caption && touched.caption ? (
                                                        <small className='text-red-400 mt-1'>
                                                            {errors.caption}
                                                        </small>
                                                    ) : null}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            className='py-2 mt-2 px-2 w-fit rounded-md hover:bg-cyan-700 bg-brand_color text-white'
                                            type='submit'
                                        >
                                            Create
                                        </button>


                                    </Form>
                                )}
                            </Formik>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLineup;