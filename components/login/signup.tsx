import { Field, Form, Formik } from 'formik';
import { Router, useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookCircleFill } from 'react-icons/ri';
import { useAppDispatch } from 'redux/hooks';
import { setPopup } from 'redux/slices/popupslice';
import { register } from 'redux/slices/userSlice';
import { signIn } from "next-auth/react";
import { useEffect, useState } from 'react';

import * as Yup from 'yup';
import GoogleAuth from '../auth/GoogleAuth';

const SingUp = ({ setAuth }: any) => {
  const loginSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Enter a valid email')
      .required('Email is required'),
    password: Yup.string()
      .required('No password provided.')
      .min(6, 'Password is too short - should be 6 chars minimum.'),

    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLoadingG, setIsLoadingG] = useState<boolean>(false); // Type explicitly as boolean

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoadingG(true);
      await signIn("google", { callbackUrl: '/' });
    } catch (error) {
      console.error('Google login error:', error);
      dispatch(
        setPopup({
          type: 'failed',
          message: 'Google login failed. Please try again.',
          show: true,
        })
      );
    } finally {
      setIsLoadingG(false);
    }
  };


  return (
    <div className=' text-center w-full my-4'>
      <p
        className='text-2xl text-brand_color mb-4 font-semibold
      '
      >
        Sign Up
      </p>
      <div className='flex flex-col justify-center items-center space-y-4'>
        {/* <div className=' flex w-full cursor-pointer items-center rounded-lg  hover:bg-gray-200 py-2 pl-2 text-lg  text-gray-600 drop-shadow-md bg-white xl:text-common'>
          <FcGoogle />
          <div className='w-full text-center'>Continue with Google</div>
        </div> */}
        {/* <button 
          className='flex items-center justify-center w-full cursor-pointer rounded-md hover:text-brand_color hover:bg-white border-[1px] hover:border-brand_color bg-brand_color py-2 text-center text-xl font-bold text-white shadow-md xl:text-common'
          type='button'
          onClick={handleLoginWithGoogle}
          disabled={isLoadingG}
        >
          {isLoadingG ? (
            <>
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <FcGoogle className="mr-2 h-5 w-5" />
              Continue with Google
            </>
          )}
        </button> */}
        {/* <GoogleAuth /> */}

        {/*    Facebook signing div */}
        {/* <div className='flex w-full cursor-pointer items-center rounded-lg bg-blue-600 py-2  pl-2 text-center text-lg  text-white hover:bg-blue-500 xl:text-common'>
          <RiFacebookCircleFill className='text-white' />
          <div className='w-full text-center'>Continue with Facebook</div>
        </div> */}
        {/* <div className='text-gray-800'> or</div> */}
      </div>
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={loginSchema}
        onSubmit={(values: any) => {
          dispatch(register(values)).then((res: any) => {
            if (res.type === 'user/register/fulfilled') {
              dispatch(
                setPopup({
                  type: 'success',
                  message: 'User registration successful',
                  show: true,
                })
              );
              router.push('/');
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
        {({ errors, touched }) => (
          <Form className='my-4 text-center'>
            <div className='flex flex-col space-y-6 items-center justify-start'>
              {/* google signing div */}

              <div className='relative w-full'>
                <Field
                  name='name'
                  className='bg-gray-50 text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10 w-full   px-2 rounded-md outline-none'
                  placeholder='Enter your name'
                />
                <div>
                  {errors.name && touched.name ? (
                    <small className='text-red-400 absolute left-0 top-11'>
                      {errors.name}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className='relative w-full'>
                <Field
                  name='email'
                  type='text'
                  className='bg-gray-50 text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10 w-full   px-2 rounded-md outline-none'
                  placeholder='Enter your email address'
                />

                <div>
                  {errors.email && touched.email ? (
                    <small className='text-red-400 absolute left-0 top-11'>
                      {errors.email}
                    </small>
                  ) : null}
                </div>
              </div>

              <div className='relative w-full'>
                <Field
                  name='password'
                  type='password'
                  className='bg-gray-50 text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10 w-full   px-2 rounded-md outline-none'
                  placeholder='Enter  password'
                />
                <div>
                  {errors.password && touched.password ? (
                    <small className='text-red-400 absolute left-0 top-11'>
                      {errors.password}
                    </small>
                  ) : null}
                </div>
              </div>
              <div className='relative w-full'>
                <Field
                  name='confirmPassword'
                  type='password'
                  className='bg-gray-50 text-black text-red border-[1px] border-gray-300 focus:border-blue-300 text-sm py-1 h-10 w-full   px-2 rounded-md outline-none'
                  placeholder='Enter  confirmPassword'
                />
                <div>
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <small className='text-red-400 absolute left-0 top-11'>
                      {errors.confirmPassword}
                    </small>
                  ) : null}
                </div>
              </div>

              <button
                className='w-full cursor-pointer rounded-md hover:text-brand_color hover:bg-white border-[1px] hover:border-brand_color bg-brand_color py-2 text-center text-xl font-bold text-white shadow-md xl:text-common'
                type='submit'
              >
                Sign Up
              </button>
              <div>
                <p className='text-black'>
                  Already have an account?
                  <span
                    onClick={() =>
                      setAuth({
                        login: false,
                        signUp: false,
                      })
                    }
                    className='text-brand_color underline cursor-pointer'
                  >
                    &nbsp;Login
                  </span>
                </p>
                <p className='mt-4 underline text-blue-600 cursor-pointer'>
                  Forgot your password
                </p>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingUp;
