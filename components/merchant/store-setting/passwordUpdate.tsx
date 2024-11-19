import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { setPopup } from 'redux/slices/popupslice';
import axios from '@/axios/config';
import { useAppDispatch } from 'redux/hooks';
import Modal from '@/components/common/Modal';

const PasswordInformation = ({ agent }: any) => {
  const dispatch = useAppDispatch();
  const [loginInformation, setLoginInformation] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const businessDetailsSchema = Yup.object().shape({
    password: Yup.string(),
    newPassword: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'Passwords must match'
    ),
  });
  // update password handler
  const updatePassword = () => {
    axios
      .put('agents/pass', loginInformation, {
        headers: { Authorization: `Bearer ${agent.token}` },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Password updated successfully',
            show: true,
          })
        );

        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        console.log(err)
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
  return (
    <div className='w-full h-max border-2 border-brand_color rounded-md  text-center p-4'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={updatePassword}
        confirmText='Update'
        title='Are you  sure you want to update password?'
      ></Modal>
      <p className='dashboard_secondary_title '>Password</p>
      <div className='w-full'>
        <Formik
          initialValues={{
            password: agent.password,
            newPassword: agent.newPassword,
          }}
          validationSchema={businessDetailsSchema}
          onSubmit={(values: any) => {
            const loginInformation = {
              password: values.password,
              newPassword: values.newPassword,
            };
            setLoginInformation(loginInformation);
            setShowModal(true);
          }}
        >
          {({ errors, touched }: any) => (
            <Form className='mt-4 text-start font-lato w-full'>
              <div className='grid grid-cols-1 gap-2'>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Old Password
                  </label>

                  <div>
                    <Field
                      name='password'
                      type='password'
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white   w-full  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.password && touched.password ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    New Password
                  </label>

                  <div>
                    <Field
                      name='newPassword'
                      type='password'
                      className='border-[1px] w-full border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.newPassword && touched.newPassword ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.newPassword}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Confirm Password
                  </label>

                  <div>
                    <Field
                      name='confirmPassword'
                      type='password'
                      className='border-[1px] h-6 w-full border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.confirmPassword}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <button
                className='text-md justify-center items-center  flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                type='submit'
              >
                Update Password
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default PasswordInformation;
