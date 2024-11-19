import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from 'redux/hooks';
import axios from '@/axios/config';
import Modal from '@/components/common/Modal';
import { BsPlus } from 'react-icons/bs';
import CreateUserForm from './createUserForm';
import ComingSoon from '@/components/common/comingSoon';

const CreateUser = ({ event }: any) => {
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<any>({});

  const createUserHandler = () => {
    const data = {
      ...userData,
      event: event.data._id,
    };
  };

  return (
    <ComingSoon>
      <div className=''>
        {/* <Breadcrumb from='giftCard' /> */}

        <Modal
          showModal={showModal}
          setShowModal={setShowModal}
          handleConfirm={createUserHandler}
          title='Are you sure?'
          confirmText='Create Ticket'
          data={userData}
        >
          {userData && (
            <div className='font-lato flex   flex-col space-y-2 min-w-300 text-gray-600 bg-gray-200 p-4 rounded-lg'>
              <p className='text-3xl my-2 font-semibold px-auto mx-auto w-max'>
                Ticket Details
              </p>
              <div className='flex item-center justify-start space-x-2'>
                <p className='w-44 text-gray-900'>Package:</p>
                <small>{userData.package}</small>
              </div>
              <div className='flex item-center justify-start space-x-2'>
                <p className='w-44 text-gray-900'>Price</p>
                <small>{userData.price}</small>
              </div>
              <div className='flex item-center justify-start space-x-2'>
                <p className='w-44 text-gray-900'>Details:</p>

                <div
                  dangerouslySetInnerHTML={{
                    __html: userData.detail,
                  }}
                />
              </div>
              <div className='flex item-center justify-start space-x-2'>
                <p className='w-44 text-gray-900'>Ticket limit:</p>
                <small>{userData.limit}</small>
              </div>
            </div>
          )}
        </Modal>

        <div className='w-full bg-gray-100 text-gray-800 rounded-md p-8 '>
          <div>
            <div className='flex items-center justify-between'>
              <p className='dashboard_secondary_title'>Create User</p>
              <div>
                <div className='flex items-center justify-center space-x-6'>
                  <p className='text-md'>
                    <div className='flex items-center justify-start space-x-4 text-gray'>
                      <p> Activate Account</p>
                      <div className='toggle-switch '>
                        <input
                          type='checkbox'
                          name='userEmail'
                          value='userEmail'
                          className='toggle-input'
                        />
                        <label className='toggle-label' />
                      </div>
                    </div>
                  </p>
                  <p className='text-md px-2 py-1 rounded-lg  text-white bg-red-400'>
                    Remove Account
                  </p>
                </div>
              </div>
            </div>

            {/* ticket form */}

            <CreateUserForm setUserData={setUserData} userData={userData} />
          </div>
        </div>
      </div>
    </ComingSoon>
  );
};

export default CreateUser;
