import { useRouter } from 'next/router';
import React, { useState } from 'react';
import LeftSidebar from '../merchant/dashbord/LeftSidebar';
import AgentNavbar from '../common/navbar/agentNavbar';
import dynamic from 'next/dynamic';
const ProtectRoute = dynamic(import('@/components/common/ProtectedRoute'), { ssr: false })

const Agent: React.FC<{ children?: React.ReactNode }> = ({ children }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);

  const router = useRouter();
  const { pathname } = router;
  const login = pathname.includes('/dashboard');
  return (
    <ProtectRoute>
      <div className='bg-white text-black relative'>
        {!login && (
          <div>
            <AgentNavbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {children}
          </div>
        )}
        {/* left admin sidebar  */}
        {login && (
          <div className='flex'>
            <div
              className={` left_bar text-white absolute md:relative z-[3000] ${isMenuOpen ? 'block' : 'hidden md:block'
                }`}
            >
              <LeftSidebar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>

            <div
              // className={`h-full w-full  ${
              //   isMenuOpen ? 'ml-0 md:ml-[25px] ' : 'ml-0 md:ml-[120px]'
              // }`}
              className='w-full h-full bg-white text-black'
            >
              <AgentNavbar
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
              <div className='px-4 md:px-12 py-8'>{children}</div>
            </div>
          </div>
        )}
      </div>        </ProtectRoute>
  );
};

export default Agent;
