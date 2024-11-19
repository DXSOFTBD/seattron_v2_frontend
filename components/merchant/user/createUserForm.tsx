import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from 'redux/hooks';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
const CreateUserForm = ({ setUserData }: any) => {
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);

  const createUserSchema = Yup.object().shape({
    userName: Yup.string().required('This is required'),
    userEmail: Yup.string().required('This is required'),
    confirmPassword: Yup.string().required('This is required'),
    userPassword: Yup.string(),
    userPhone: Yup.string(),
  });

  return (
    <div className=''>
      {/* <Breadcrumb from='giftCard' /> */}

      <div className='my-4 border-2 border-brand_color p-4 rounded-lg'>
        <Formik
          initialValues={{
            userName: '',
            userEmail: '',
            userPassword: '',
            confirmPassword: '',
            userPhone: '',
          }}
          validationSchema={createUserSchema}
          onSubmit={(values: any) => {
            const ticketDetails = {
              userName: values.userName,
              userEmail: values.userEmail,
              userPassword: values.userPassword,
              confirmPassword: values.confirmPassword,
            };

            setUserData(ticketDetails);
          }}
        >
          {({ errors, touched }) => (
            <Form className='mt-4 text-start font-didot max-w-[700px]'>
              <div className='grid grid-cols-2 gap-6'>
                <div className='relative '>
                  <Field
                    name='userName'
                    placeholder='User Name'
                    className='border-[1px] border-brand_color outline-none text-gray-800 bg-white w-full  h-10  text-sm px-2 py-1 rounded-md '
                  ></Field>
                  <div>
                    {errors.userName && touched.userName ? (
                      <small className='text-red-400 absolute left-0 top-11'>
                        {errors.userName}
                      </small>
                    ) : null}
                  </div>
                </div>

                <div className='relative'>
                  <Field
                    name='userEmail'
                    type='number'
                    className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                    placeholder='User Email'
                  />
                  <div>
                    {errors.userEmail && touched.userEmail ? (
                      <small className='text-red-400 absolute left-0 top-11'>
                        {errors.userEmail}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className='relative'>
                  <Field
                    name='userPhone'
                    type='text'
                    className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                    placeholder='User Phone number'
                  />
                  <div>
                    {errors.userPhone && touched.userPhone ? (
                      <small className='text-red-400 absolute left-0 top-11'>
                        {errors.userPhone}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className='relative'>
                  <Field
                    name='userPassword'
                    type='password'
                    className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                    placeholder='Password'
                  />
                  <div>
                    {errors.userPassword && touched.userPassword ? (
                      <small className='text-red-400 absolute left-0 top-11'>
                        {errors.userPassword}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className='relative'>
                  <Field
                    name='confirmPassword'
                    type='password'
                    className='bg-gray-50 text-gray-800 text-red border-[1px] border-brand_color focus:outline-blue-300 focus:outline-1 text-sm py-1 h-10 w-full  px-2 rounded-md outline-none'
                    placeholder='Confirm Password'
                  />
                  <div>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <small className='text-red-400 absolute left-0 top-11'>
                        {errors.confirmPassword}
                      </small>
                    ) : null}
                  </div>
                </div>
              </div>

              <div>
                <p className='text-2xl font-semibold mt-6 mb-2'>Access Point</p>
                <div>
                  <div className='flex items-center justify-start my-4'>
                    <p className='w-150'>Admin</p>
                    <div className='toggle-switch'>
                      <Field
                        type='checkbox'
                        name='admin'
                        value='admin'
                        className='toggle-input'
                      />
                      <label className='toggle-label' />
                    </div>
                  </div>

                  <div className='flex items-center justify-start my-4'>
                    <p className='w-150'>Editor</p>
                    <div className='toggle-switch '>
                      <Field
                        type='checkbox'
                        name='editor'
                        value='editor'
                        className='toggle-input'
                      />
                      <label className='toggle-label' />
                    </div>
                  </div>
                  <div className='flex items-center justify-start my-4'>
                    <p className='w-150'>Ticket checker</p>
                    <div className='toggle-switch '>
                      <Field
                        type='checkbox'
                        name='ticketChecker'
                        value='ticketChecker'
                        className='toggle-input'
                      />
                      <label className='toggle-label' />
                    </div>
                  </div>
                </div>
              </div>
              <button
                className='py-2 mt-6 mb-4 px-2 w-fit rounded-md bg-brand_gradient text-white'
                type='submit'
              >
                Add User
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUserForm;
