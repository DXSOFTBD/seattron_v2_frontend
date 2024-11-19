import { Field, Form, Formik } from 'formik';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import * as Yup from 'yup';
import { agentLogin } from 'redux/slices/agentSlice';
import { useRouter } from 'next/router';
import Toast from '@/components/common/toast';
import { setPopup } from 'redux/slices/popupslice';
import { checkerLogin } from 'redux/slices/checkerSlice';

const CheckerLogin = () => {
  const [toast, setToast] = useState<any>([]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isCheckerLoggedIn = useAppSelector(
    (state: any) => state.checkerReducer.success
  );
  useEffect(() => {
    isCheckerLoggedIn && router.push('ticket-checker/dashboard');
  }, [isCheckerLoggedIn, router]);
  const loginSchema = Yup.object().shape({
    userName: Yup.string().required('Username is required'),
    password: Yup.string().required('No password provided.'),
  });
  return (
    <div className='flex items-center justify-center h-full w-full min-h-[50vh] md:py-20 py-10 px-6'>
      <div className='absolute top-16'>
        {toast &&
          toast.map((t: any, index: any) => (
            <Toast key={index} toast={t} setToast={setToast} />
          ))}
      </div>
      <div className='w-full max-w-400  rounded-lg bg-gray-50 py-6 px-4 shadow-md shadow-slate-400 text-center'>
        <p className='text-2xl font-semibold text-brand_color'>
          Welcome to Seattron!
        </p>
        <p className='text-lg my-2 text-gray-600 font-semibold'>
          Login as a checker
        </p>
        <Formik
          initialValues={{
            userName: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values: any) => {
            dispatch(
              checkerLogin({
                password: values.password,
                userName: values.userName,
              })
            ).then((res: any) => {
              // console.log(res)
              if (res.type === 'checker/login/fulfilled') {
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
                    name='userName'
                    type='text'
                    className='bg-gray-50 w-full text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10  px-2 rounded-lg outline-none'
                    placeholder='Enter your userName'
                  />

                  <div>
                    {errors.userName && touched.userName ? (
                      <small className='text-red-500 absolute left-0 top-11'>
                        {errors.userName}
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
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CheckerLogin;
