import axios from 'axios';
import { useEffect } from 'react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { RiFacebookCircleFill } from 'react-icons/ri';

const Login = ({ setAuth }: any) => {
  return (
    <div>
      <div className='flex flex-col justify-center items-center my-4 space-y-6'>
        <div>
          <h1 className=' text-2xl font-bold text-gray-900 '>Welcome!</h1>
        </div>

        <div>
          <p className='text-md text-gray-600 xl:text-lg'>
            Sign up or log in to continue
          </p>
        </div>

        {/* google signing div */}

        {/* <div className=' flex w-full cursor-pointer items-center rounded-lg  hover:bg-gray-200 py-2 pl-2 text-lg  text-gray-600 drop-shadow-md bg-white xl:text-common'>
          <FcGoogle />
          <div className='w-full text-center'>Continue with Google</div>
        </div> */}

        {/*    Facebook signing div */}
        {/* <div className='flex w-full cursor-pointer items-center rounded-lg bg-blue-600 py-2  pl-2 text-center text-lg  text-white hover:bg-blue-500 xl:text-common'>
          <RiFacebookCircleFill className='text-white' />
          <div className='w-full text-center'>Continue with Facebook</div>
        </div> */}

        {/* Email signing div */}
        <div
          className='w-full cursor-pointer rounded-lg hover:text-brand_color hover:bg-white border-[1px] hover:border-brand_color bg-brand_color py-2 text-center text-xl font-bold text-white shadow-md xl:text-common'
          onClick={() =>
            setAuth({
              login: true,
              signUp: false,
            })
          }
        >
          Log in
        </div>
        <div
          className='w-full cursor-pointer rounded-lg border-[1px]  border-brand_color py-2 text-center text-xl font-bold text-brand_color hover:bg-brand_color hover:text-white shadow-md xl:text-common'
          onClick={() =>
            setAuth({
              login: false,
              signUp: true,
            })
          }
        >
          Sign up
        </div>
        {/* Terms  and conditions */}
        <div>
          <small className='text-black'>
            By signing up, you agree to our
            <span className='px-1 font-bold text-brand_color'>
              <Link href='/terms'>Terms and Conditions</Link>
            </span>
            and
            <span className='px-1 font-bold text-brand_color'>
              <Link href='/privacy'>Privacy Policy.</Link>
            </span>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
