import React from 'react';
import { useAppSelector } from 'redux/hooks';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const LoginInformation = ({ agent, setStoreDetails, storeDetails }: any) => {
  const businessDetailsSchema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string(),
    category: Yup.string(),
  });
  return (
    <div className='w-full h-max border-2 border-brand_color rounded-md  text-center p-4'>
      <p className='dashboard_secondary_title '>Login Information</p>
      <div className='w-full'>
        <Formik
          initialValues={{
            name: '',
            email: '',
            category: '',
          }}
          validationSchema={businessDetailsSchema}
          onSubmit={(values: any) => {
            const loginInformation = {
              name: values.name ? values.name : agent.name,
              email: values.email ? values.email : agent.email,
              category: values.category ? values.category : agent.category,
            };
            setStoreDetails({ ...storeDetails, ...loginInformation });
          }}
        >
          {({ errors, touched, setFieldValue }: any) => (
            <Form className='mt-4 text-start font-lato w-full'>
              <div className='grid grid-cols-1 gap-2'>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Admin Name
                  </label>

                  <div>
                    <Field
                      disabled
                      name='name'
                      placeholder={agent.name}
                      className='border-[1px] border-brand_color outline-none text-gray-800 bg-white   h-6 w-[280px]  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.name && touched.name ? (
                      <p className='text-red-400 mt-1 text-sm'>{errors.name}</p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Admin Email
                  </label>

                  <div>
                    <Field
                      disabled
                      name='email'
                      type='text'
                      placeholder={agent.email}
                      className='border-[1px] h-6 w-[280px] border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.email && touched.email ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className='relative flex justify-between items-center'>
                  <label htmlFor='' className='form_label'>
                    Category
                  </label>

                  <div>
                    <Field
                      disabled
                      name='category'
                      ty='text'
                      placeholder={agent.category}
                      className='border-[1px] h-6 w-[280px] border-brand_color outline-none text-gray-800 bg-white  text-sm px-2 py-1 my-1 rounded-md '
                    ></Field>
                    {errors.category && touched.category ? (
                      <p className='text-red-400 mt-1 text-sm'>
                        {errors.category}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              {/* <button
                className='justify-center items-center my-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'
                type='submit'
              >
                {storeDetails?.name ? 'Saved' : 'Save'}
              </button>
              {storeDetails?.name ? (
                <button
                  onClick={() =>
                    setStoreDetails({
                      ...storeDetails,
                      name: '',
                      email: '',
                      category: '',
                    })
                  }
                  className='justify-center cursor-pointer items-center mx-2 bg-gray-300 px-4 py-2 rounded-lg text-gray-900 w-max'
                >
                  Discard Changes
                </button>
              ) : null} */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginInformation;
