import React, { useState } from 'react';
import { useAppSelector } from 'redux/hooks';
import BankInformation from './bankInformation';
import LoginInformation from './loginInformation';
import PasswordUpdate from './passwordUpdate';
import StoreInformation from './storeInformation';

const StoreSetting = () => {
  const agent: any = useAppSelector((state) => state.agentReducer.agentInfo);
  const [storeDetails, setStoreDetails] = useState<any>({});
  const [error, setError] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);
  // const handleUpdateStore = () => {
  //   if (isAgreed) {
  //     if (
  //       storeDetails.businessDetails.brandName &&
  //       storeDetails.bankDetails.bankName &&
  //       storeDetails.name
  //     ) {
  //       console.log('store updated');
  //       setError('');
  //       console.log(storeDetails);
  //     } else {
  //       setError('Please Save forms before updating store.');
  //     }
  //   } else {
  //     setError('Check the button of agree with terms and conditions');
  //   }
  // };
  return (
    <div className='w-full text-start '>
      <div className='flex flex-wrap lg:flex-nowrap space-x-4 max-w-[1280px]'>
        <div className='lg:w-[55%] w-full'>
          <StoreInformation
            agent={agent}
            setStoreDetails={setStoreDetails}
            storeDetails={storeDetails}
          />
          <div className='flex justify-center items-center space-x-2 my-4 w-max'>
            {/* <input
              type='checkbox'
              name='agree'
              onChange={(e: any) => {
                if (e.target.checked) {
                  setIsAgreed(true);
                } else {
                  setIsAgreed(false);
                }
              }}
              id=''
              className='cursor-pointer'
            />
            <p>
              I agree to the website {''}
              <span className='text-brand_color'>terms and conditions</span>
            </p>
          </div>

          <div onClick={() => handleUpdateStore()}>
            <p className='text-xl justify-center items-center cursor-pointer flex space-x- mt-6 mb-4 bg-brand_gradient px-4 py-2 rounded-lg text-white w-max'>
              Update store settings
            </p> */}
          </div>
          {/* {error && <p className='text-red-400'>{error}</p>} */}
        </div>
        <div className='flex flex-col space-y-4 lg:w-[45%] w-full'>
          <BankInformation
            agent={agent}
            setStoreDetails={setStoreDetails}
            storeDetails={storeDetails}
          />
          <LoginInformation
            agent={agent}
            setStoreDetails={setStoreDetails}
            storeDetails={storeDetails}
          />
          <PasswordUpdate
            agent={agent}
            setStoreDetails={setStoreDetails}
            storeDetails={storeDetails}
          />
        </div>
      </div>
    </div>
  );
};

export default StoreSetting;
