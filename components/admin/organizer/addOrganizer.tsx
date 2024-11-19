import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import axios from '@/axios/config';
import Modal from '@/components/common/Modal';
import dynamic from 'next/dynamic';

// import sharp from 'sharp'
const ReactQuill = dynamic(import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
import { useRouter } from 'next/router';
import BusinessDetails from './businessDetailsForm';
import BankDetails from './bankDetailsForm';
import OrganizerDetails from './organizerDetailsForm';
import { setPopup } from 'redux/slices/popupslice';


const AddOrganizer = () => {
  const [business, setBusiness] = useState(true);
  const [bank, setBank] = useState(false);
  const [organizer, setOrganizer] = useState<any>(false);
  const [showModal, setShowModal] = useState<any>(false);
  const [organizerAllData, setOrganizerAllData] = useState<any>({});
  const admin: any = useAppSelector(
    (state: any) => state.adminReducer.adminInfo
  );
  const router = useRouter();
  const [businessDetails, setBusinessDetails] = useState<any>();
  const [bankDetails, setBankDetails] = useState<any>();
  const [organizerDetails, setOrganizerDetails] = useState<any>();
  const dispatch = useAppDispatch();

  const addOrganizerHandler = () => {
  
    axios
      .post('agents/', organizerAllData, {
        headers: {
          'Authorization': `Bearer ${admin.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        dispatch(
          setPopup({
            type: 'success',
            message: 'Organizer created successfully',
            show: true,
          })
        );
     router.push('/admin/dashboard/organizer');
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      })
      .catch((err) => {
        console.log(err);
        dispatch(
          setPopup({
            type: 'failed',
            message: 'Failed to create Organizer',
            show: true,
          })
        );
        setTimeout(() => {
          dispatch(setPopup({ show: false, type: '', message: '' }));
        }, 5000);
      });
  };

  return (
    <div className='font-lato relative'>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        handleConfirm={addOrganizerHandler}
        title='Are you sure to add organizer?'
        confirmText='Create an Organizer'
        data={organizerAllData}
      >
        {organizerAllData?.name && (
          <div className='font-lato flex flex-col space-y-2 min-w-300 text-gray-600 bg-gray-200 p-4 rounded-lg'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
              <div className='border-r-2 text-gray-800 p-4'>
                <p className='dashboard_secondary_title pb-2'>
                  Organizer Details
                </p>
                <div className=''>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'> Name:</p>
                    <small>
                      {organizerDetails.name ? organizerDetails.name : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'> Email:</p>
                    <small>
                      {organizerDetails.email ? organizerDetails.email : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Password:</p>
                    <small>
                      {organizerDetails.password
                        ? organizerDetails.password
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Category:</p>
                    <small>
                      {organizerDetails.category
                        ? organizerDetails.category
                        : 'N/A'}
                    </small>
                  </div>
                </div>
              </div>
              <div className='p-4 '>
                <p className='dashboard_secondary_title pb-2'>
                  Representative Details
                </p>
                <div className=''>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'> Name:</p>
                    <small>
                      {businessDetails?.representativeDetails.representativeName
                        ? businessDetails?.representativeDetails
                            .representativeName
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'> Designation:</p>
                    <small>
                      {businessDetails?.representativeDetails
                        .representativeDesignation
                        ? businessDetails?.representativeDetails
                            .representativeDesignation
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Email:</p>
                    <small>
                      {businessDetails?.representativeDetails
                        .representativeEmail
                        ? businessDetails?.representativeDetails
                            .representativeEmail
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Phone:</p>
                    <small>
                      {businessDetails?.representativeDetails
                        .representativePhone
                        ? businessDetails?.representativeDetails
                            .representativePhone
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>ID Number:</p>
                    <small>
                      {businessDetails?.representativeDetails
                        .representativeIDNumber
                        ? businessDetails?.representativeDetails
                            .representativeIDNumber
                        : 'N/A'}
                    </small>
                  </div>
                </div>
              </div>
              <div className='border-r-2 text-gray-800 p-4'>
                <p className='dashboard_secondary_title pb-2'>
                  Business Details
                </p>
                <div className=''>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Legal Business Name:</p>
                    <small>
                      {businessDetails?.businessDetails.legalBusinessName
                        ? businessDetails?.businessDetails.legalBusinessName
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'> Brand Name:</p>
                    <small>
                      {businessDetails?.businessDetails.brandName
                        ? businessDetails?.businessDetails.brandName
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Address:</p>
                    <small>
                      {businessDetails?.businessDetails.address
                        ? businessDetails?.businessDetails.address
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Website:</p>
                    <small>
                      {businessDetails?.businessDetails.website
                        ? businessDetails?.businessDetails.website
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Business Email:</p>
                    <small>
                      {businessDetails?.businessDetails.businessEmail
                        ? businessDetails?.businessDetails.businessEmail
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Business Phone No.:</p>
                    <small>
                      {businessDetails?.businessDetails.businessPhone
                        ? businessDetails?.businessDetails.businessPhone
                        : ''}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Business Type:</p>
                    <small>
                      {businessDetails?.businessDetails.businessType
                        ? businessDetails?.businessDetails.businessType
                        : ''}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>BIN number:</p>
                    <small>
                      {businessDetails?.businessDetails.binNumber
                        ? businessDetails?.businessDetails.binNumber
                        : ''}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>TIN number:</p>
                    <small>
                      {businessDetails?.businessDetails.tinNumber
                        ? businessDetails?.businessDetails.tinNumber
                        : ''}
                    </small>
                  </div>
                </div>
              </div>
              <div className='p-4 '>
                <p className='dashboard_secondary_title pb-2'>Bank Details</p>
                <div className=''>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Bank Name:</p>
                    <small>
                      {bankDetails.bankName ? bankDetails.bankName : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'> Bank Account No.:</p>
                    <small>
                      {bankDetails.bankAccountNumber
                        ? bankDetails.bankAccountNumber
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Bank Account Title:</p>
                    <small>
                      {bankDetails.bankAccountTitle
                        ? bankDetails.bankAccountTitle
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Branch Name:</p>
                    <small>
                      {bankDetails.bankBranch ? bankDetails.bankBranch : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Bank Routing Number:</p>
                    <small>
                      {bankDetails.bankRoutingNumber
                        ? bankDetails.bankRoutingNumber
                        : 'N/A'}
                    </small>
                  </div>
                  <div className='flex items-center justify-start space-x-2 my-2'>
                    <p className='w-32'>Bank Address:</p>
                    <small>
                      {bankDetails.bankAddress
                        ? bankDetails.bankAddress
                        : 'N/A'}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <div className='w-full rounded-md'>
        {business && (
          <BusinessDetails
            setBusinessDetails={setBusinessDetails}
            setBank={setBank}
            businessDetails={businessDetails}
            setBusiness={setBusiness}
          />
        )}

        {businessDetails && bank && (
          <BankDetails
            setBankDetails={setBankDetails}
            bankDetails={bankDetails}
            setBank={setBank}
            setBusiness={setBusiness}
            setOrganizer={setOrganizer}
          />
        )}

        {bankDetails && organizer && (
          <OrganizerDetails
            setOrganizerDetails={setOrganizerDetails}
            organizerDetails={organizerDetails}
            bankDetails={bankDetails}
            setBank={setBank}
            setOrganizer={setOrganizer}
            businessDetails={businessDetails}
            setOrganizerAllData={setOrganizerAllData}
            setShowModal={setShowModal}
          />
        )}
      </div>
    </div>
  );
};

export default AddOrganizer;
