import Link from 'next/link';
import { useState } from 'react';
import Login from './login';
import LoginWithEmail from './loginWithEmail';
import SingUp from './signup';

const AllLogin = () => {
  const [auth, setAuth] = useState({
    login: false,
    signUp: false,
  });
  const { login, signUp } = auth;
  return (
    <div className='flex items-center justify-center h-full w-full min-h-[50vh] md:py-20 py-10 px-6'>
      <div className='w-full max-w-400  rounded-lg  bg-gray-50 py-4 px-4 shadow-md shadow-slate-400 '>
        {!login && !signUp && <Login setAuth={setAuth} />}
        {login && !signUp && <LoginWithEmail setAuth={setAuth} />}
        {!login && signUp && <SingUp setAuth={setAuth} />}
      </div>
    </div>
  );
};

export default AllLogin;
