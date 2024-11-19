
import React from 'react';


const Form = ({ reload, setReload }: any) => {
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      phone: e.target.phone.value,
      role: e.target.role.value,
    };

    // const response = await createProduct(data);
    // if (response) {
    //   setReload(!reload);
    //   alert('Product created sucessfull');
    // } else {
    //   alert('Failed!,Please try again');
    // }
  };

  return (
    <div className='contact-form--1'>
      <div className='container'>
        <div className=''>
          <div className=''>
            <p className='my-4'>
              All the fields are required for successful account creation.
            </p>
            <div className='form-wrapper'>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='col-lg-4'>
                    <label htmlFor='item01'>
                      <input
                        type='text'
                        name='name'
                        className='bg-white text-black outline-blue-300 px-2 py-2 my-2 rounded-md lg:w-200 w-full'
                        id='item01'
                        placeholder='Enter name'
                      />
                    </label>
                  </div>

                  <div className='col-lg-4'>
                    <label htmlFor='item02'>
                      <input
                        type='text'
                        name='email'
                        className='bg-white text-black outline-blue-300 px-2 py-2 my-2 rounded-md lg:w-200 w-full'
                        id='item02'
                        placeholder='Enter email'
                      />
                    </label>
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor='item03'>
                      <input
                        type='phone'
                        name='phone'
                        id='item03'
                        className='bg-white text-black outline-blue-300 px-2 py-2 my-2 rounded-md lg:w-200 w-full'
                        placeholder='Enter phone number'
                      />
                    </label>
                  </div>
                  <div className='col-lg-4'>
                    <label htmlFor='item04'>
                      <input
                        type='text'
                        name='role'
                        id='item04'
                        className='bg-white text-black outline-blue-300 px-2 py-2 my-2 rounded-md lg:w-200 w-full'
                        placeholder='Enter account role'
                      />
                    </label>
                  </div>
                </div>

                <button
                  className='bg-brand_color mt-10 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                  type='submit'
                  value='submit'
                  name='submit'
                  id='mc-embedded-subscribe'
                >
                  Create An Event
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
