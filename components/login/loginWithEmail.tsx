import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setPopup } from 'redux/slices/popupslice';
import { login } from 'redux/slices/userSlice';
import * as Yup from 'yup';
import Toast from '../common/toast';

const LoginWithEmail = ({ setAuth }: any) => {
  const [toast, setToast] = useState({});

  const router = useRouter()
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('No password provided.')
      .min(6, 'Password is too short - should be 6 chars minimum.'),
  });
  const dispatch = useAppDispatch();
  return (
    <div className='text-center w-full my-4'>
      <div>
        <p className='text-2xl text-brand_color mb-4 font-semibold'>
          Login to Seattron
        </p>
      </div>
      <div className=''>
        <Toast toast={toast} setToast={setToast} />
      </div>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values: any) => {
          dispatch(
            login({
              password: values.password,
              email: values.email,
            })
          ).then((res: any) => {
            if (res.type === 'user/login/fulfilled') {
              dispatch(
                setPopup({
                  type: 'success',
                  message: 'User login successful',
                  show: true,
                })
              );
              router.push('/')
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
        }}
      >
        {({ errors, touched }: any) => (
          <Form className=' text-center mt-8'>
            <div className='flex flex-col space-y-8 items-center justify-start'>
              <div className='relative w-full'>
                <Field
                  name='email'
                  type='text'
                  className='bg-gray-50 w-full text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10  px-2 rounded-lg outline-none'
                  placeholder='Enter your email address'
                />

                <div>
                  {errors.email && touched.email ? (
                    <small className='text-red-500 absolute left-0 top-11'>
                      {errors.email}
                    </small>
                  ) : null}
                </div>
              </div>

              <div className='relative w-full'>
                <Field
                  name='password'
                  type='password'
                  className='bg-gray-50 text-black text-red border-[1px] border-gray-300 focus:border-blue-300  text-sm py-1 h-10 w-full   px-2 rounded-lg outline-none'
                  placeholder='Enter your password'
                />
                <div>
                  {errors.password && touched.password ? (
                    <small className='text-red-500 absolute left-0 top-11'>
                      {errors.password}
                    </small>
                  ) : null}
                </div>
              </div>

              <button
                className='w-full cursor-pointer rounded-lg hover:text-brand_color hover:bg-white border-[1px] hover:border-brand_color bg-brand_color py-2 text-center text-xl font-bold text-white shadow-md xl:text-common'
                type='submit'
              >
                Log in
              </button>
            </div>
            <div>
              <p
                className='mt-4 text-black'
                onClick={() =>
                  setAuth({
                    login: false,
                    signUp: false,
                  })
                }
              >
                {`Don't have an account?`}
                <span className='text-brand_color underline cursor-pointer'>
                  &nbsp; Sign up
                </span>
              </p>
              <p className='my-4 underline text-blue-600 cursor-pointer'>
                Forgot your password
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginWithEmail;
