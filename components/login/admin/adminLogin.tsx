import { Field, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { adminLogin } from 'redux/slices/adminSlice';
import { setPopup } from 'redux/slices/popupslice';
import * as Yup from 'yup';

const AdminLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const isAdminLoggedIn = useAppSelector((state) => state.adminReducer.success);
  useEffect(() => {
    isAdminLoggedIn && router.push('admin/dashboard');
  }, [isAdminLoggedIn, router]);

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('No password provided.')
      .min(6, 'Password is too short - should be 6 chars minimum.'),
  });
  return (
    <div className='flex items-center justify-center w-full h-[500px] md:py-20 py-10 px-6 z-100'>
      <div className='w-full max-w-400  rounded-lg bg-gray-50 py-4 px-4 shadow-md shadow-slate-400 text-center'>
        <p className='text-2xl font-semibold text-gray-900'>
          Log in to Seattron
        </p>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginSchema}
          onSubmit={(values: any) => {
            dispatch(
              adminLogin({
                password: values.password,
                email: values.email,
              })
            ).then((res: any) => {
              if (res.type === 'admin/login/fulfilled') {
                dispatch(
                  setPopup({
                    type: 'success',
                    message: 'Admin login successful',
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AdminLogin;
