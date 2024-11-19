import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ImCross } from 'react-icons/im';
import Modal from '@/components/common/Modal';
import axios from '@/axios/config';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPopup } from 'redux/slices/popupslice';
import Image from 'next/image';
import { getEventLineup } from 'redux/slices/lineupSlice';
const UpdateLineup = ({ lineup, setShowEditForm }: any) => {

    const dispatch = useAppDispatch()
    const [isActive, setIsActive] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editedLineup, seteditedLineup] = useState(lineup);
    const [thumbnail, setThumbnail] = useState('')
    const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
    const SUPPORTED_FORMATS = [
        'image/jpg',
        'image/jpeg',
        'image/png',
        'image/webp',
    ];
    // form validation schema
    const updateSchema = Yup.object().shape({
        caption: Yup.string().required('caption is required'),
        thumb: Yup.mixed().test(
            'fileSize',
            'Image size will be less than  1MB',
            (value: any) => (value?.size ? value.size <= 1000 * 2000 : true)
        ).test(
            'fileFormat',
            'Unsupported Format',
            (value: any) => value?.type ? SUPPORTED_FORMATS.includes(value.type) : true
        ),
    });
    // update lineup start
    const handleUpdate = () => {

        axios
            .put('events/lineup/' + lineup._id, editedLineup, {
                headers: {
                    'Authorization': `Bearer ${agent.token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((res) => {
                dispatch(getEventLineup({ token: agent.token, eventId: lineup.event }))
                setShowModal(false)
                setShowEditForm(false)
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
    // update lineup end
    return (
        <div className='w-full border-[1px] border-gray-300 rounded-md p-4 relative'>
            {showModal ? (
                <Modal
                    handleConfirm={handleUpdate}
                    confirmText='Update'
                    // footer={true}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    title='Are you sure you want to Update?'
                ></Modal>
            ) : null}
            <div className="flex justify-start items-center space-x-3 mb-4">
                <label htmlFor="active" className='font-semibold text-2xl'>Active</label>
                <label className="switch">
                    <input type="checkbox" id='active' checked={isActive} onChange={(e) => setIsActive(e.target.checked)}></input>
                    <span className="slider round"></span>
                </label>

            </div>

            <p onClick={() => setShowEditForm(false)} className='absolute top-2 right-2 cursor-pointer'><ImCross className='w-4 h-4' /></p>
            <div className='w-full'>
                {lineup ? <Formik
                    initialValues={{
                        caption: lineup?.caption,
                        thumb: '',
                        isActive: isActive,
                    }}
                    validationSchema={updateSchema}
                    onSubmit={(values: any) => {
                        seteditedLineup({ ...values, isActive: isActive })
                        // console.log(editedLineup)
                        setShowModal(true)
                    }}
                >
                    {({ errors, touched, setFieldValue }: any) => (
                        <Form className=' text-start font-lato mt-2 w-full'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div className='relative col-span-2'>
                                    <div className='relative'>
                                        <label htmlFor='' className='form_label'>
                                            Thumbnail* (width*height = 350*200)
                                        </label>
                                        <div className='flex items-center justify-start py-2'>
                                            <div className="relative">

                                                {thumbnail ? (
                                                    <Image
                                                        src={thumbnail}
                                                        height={200}
                                                        width={350}
                                                        alt='thumb'
                                                        className='h-[200px] w-[350px] object-cover rounded-md'
                                                    ></Image>
                                                ) : (
                                                    <Image
                                                        src={
                                                            process.env.NEXT_PUBLIC_SERVER_HOST +
                                                            lineup.thumb
                                                        }
                                                        height={200}
                                                        width={350}
                                                        alt='thumb'
                                                        className='h-[200px] w-[350px] object-cover rounded-md'
                                                    ></Image>
                                                )}
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
                                                    className='custom-file-event  text-gray-800 text-red absolute top-1/2 right-12 text-sm  my-1  w-200 px-2 rounded-md outline-none'
                                                    placeholder='Enter thumbnail url'
                                                />
                                            </div>


                                        </div>

                                        <div>
                                            {errors.thumb && touched.thumb ? (
                                                <small className='text-red-400 mt-1'>
                                                    {errors.thumb}
                                                </small>
                                            ) : null}
                                        </div>
                                    </div>   </div>

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
                                className={`btn bg-brand_gradient`}
                                type='submit'

                            >
                                Update
                            </button>
                        </Form>
                    )}
                </Formik> : null}

            </div>
        </div>
    );
};

export default UpdateLineup;
