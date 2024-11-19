import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const Terms = ({ terms, setTerms }: any) => {
  const [isSaved, setIsSaved] = useState(false);
  const termSchema = Yup.object().shape({
    term: Yup.string().test(
      'len',
      'Must not exceed 280 characters',
      (val): any => val && val.toString().length <= 280
    ),
  });

  return (
    <div className='w-full'>
      {/* <Breadcrumb from='giftCard' /> */}

      <div className='w-full'>
        <Formik
          initialValues={{
            term: '',
          }}
          validationSchema={termSchema}
          onSubmit={(values: any) => {
            setTerms([...terms, values.term]);
            setIsSaved(true);
          }}
        >
          {({ errors, touched }: any) => (
            <Form className=' text-start font-lato flex items-center justify-center space-x-4 mt-2 w-full'>
              <div className='relative w-full'>
                <label htmlFor=''></label>
                <Field
                  name='term'
                  as='textarea'
                  placeholder='Enter terms and conditions'
                  className='border-[1px] w-full border-brand_color outline-none text-gray-800 bg-white   h-16  text-sm px-2 py-1 rounded-md '
                ></Field>
                <div>
                  {errors.term && touched.term ? (
                    <small className='text-red-400 '>{errors.term}</small>
                  ) : null}
                </div>
              </div>

              <button
                className='py-2 mt-6 mb-4 px-2 w-fit rounded-md hover:bg-cyan-700 bg-brand_color text-white'
                type='submit'
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Terms;
