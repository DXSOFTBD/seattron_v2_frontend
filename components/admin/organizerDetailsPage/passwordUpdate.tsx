import React from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const PasswordInformation = ({ agent }: any) => {
  const businessDetailsSchema = Yup.object().shape({
    oldPassword: Yup.string(),
    newPassword: Yup.string(),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Passwords must match'
    ),
  });
  return (
    <div className='w-full h-max border-2 border-brand_color rounded-md  text-center p-4'>
      <p className='dashboard_secondary_title '>Password</p>
      <div className='w-full'>
        <Formik
          initialValues={{
            oldPassword: agent.oldPassword,
            newPassword: agent.newPassword,
          }}
          validationSchema={businessDetailsSchema}
          onSubmit={(values: any) => {
            const loginInformation = {
              oldPassword: values.oldPassword,
              newPassword: values.newPassword,
            };
          }}
        >
          {({ errors, touched, setFieldValue }: any) => (
            <Form className='mt-4 text-start font-lato w-full'>
              <div className='grid grid-cols-1 gap-2'>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                   Old Password
                  </label>

                  <div>
                    <Field
                      name='oldPassword'
                      type='password'
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white   h-6 w-[280px]  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.oldPassword && touched.oldPassword ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.oldPassword}
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
                      className='border-[1px] h-6 w-[280px] border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
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
                      className='border-[1px] h-6 w-[280px] border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
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
                className='text-xl justify-center items-center  flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
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
