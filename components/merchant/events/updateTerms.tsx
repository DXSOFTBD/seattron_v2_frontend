import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const UpdateTerms = ({ term, terms, setTerms, i }: any) => {
  const [isSaved, setIsSaved] = useState(false);
  let newTerms = [...terms];
  const termSchema = Yup.object().shape({
    term: Yup.string().test(
      'len',
      'Must not exceed 280 characters',
      (val): any => val !== undefined && val.toString().length <= 280
    ),
  });

  return (
    <div className='w-full'>
      {/* <Breadcrumb from='giftCard' /> */}

      <div className='w-full'>
        <Formik
          initialValues={{
            term: term,
          }}
          validationSchema={termSchema}
          onSubmit={(values: any) => {
            newTerms[i] = values.term;
            setTerms(newTerms);
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
                className={`py-1 mt-6 mb-4 px-2 w-fit rounded-md hover:bg-cyan-700  text-white ${isSaved ? 'bg-green-500' : 'bg-brand_color'
                  }`}
                type='submit'
              >
                {isSaved ? 'Saved' : 'Save'}
              </button>
              {/* <div
                className={`py-1 mt-6 mb-4 px-2 w-fit text-white rounded-md cursor-pointer bg-red-500 hover:bg-cyan-700  `}
                onClick={() => {
                  console.log(i)
                  const terms = newTerms.splice(i, 1)
                  console.log(terms)
                  console.log(newTerms)
                  setTerms(newTerms);
                }}
              >
                remove
              </div> */}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default UpdateTerms;
