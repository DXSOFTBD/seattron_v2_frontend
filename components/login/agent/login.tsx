import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as Yup from 'yup';
import { agentLogin } from 'redux/slices/agentSlice';
import { useRouter } from 'next/router';
import Toast from '@/components/common/toast';
import { setPopup } from 'redux/slices/popupslice';

const AgentLogin = () => {
  const [toast, setToast] = useState<any>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAgentLoggedIn = useAppSelector((state) => state.agentReducer.success);
  useEffect(() => {
    isAgentLoggedIn && router.push('merchant/dashboard');
  }, [isAgentLoggedIn, router]);
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('No password provided.')
      .min(6, 'Password is too short - should be 6 chars minimum.'),
  });
  return (
    <div className='flex items-center justify-center h-full w-full  md:py-20 py-10 px-6'>
      <div className='w-full max-w-400  rounded-lg bg-gray-50 py-6 px-4 shadow-md shadow-slate-400 text-center'>
        <p className='text-2xl font-semibold text-brand_color'>
          Welcome to Seattron!
        </p>
        <p className='text-lg my-2'>Login to continue</p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values: any) => {
            dispatch(
              agentLogin({
                password: values.password,
                email: values.email,
              })
            ).then((res: any) => {
              if (res.type === 'agent/login/fulfilled') {
                dispatch(
                  setPopup({
                    type: 'success',
                    message: 'Welcome back to Seattron',
                    show: true,
                  })
                );
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
                <div>
                  <p className='text-gray-800'>
                    Need a merchant account? &nbsp;
                    <Link href='/contact'>
                      <span className='text-brand_color underline cursor-pointer'>
                        Contact
                      </span>
                    </Link>
                  </p>
                  <p className='my-2 underline text-blue-600 cursor-pointer'>
                    Forgot your password
                  </p>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AgentLogin;
