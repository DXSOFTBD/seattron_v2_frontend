import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
} from 'react-icons/fa';
import { GoLocation } from 'react-icons/go';
import { MdEmail } from 'react-icons/md';
import payImg from '/public/assets/background/pay.png';
import logo from '/public/assets/logo/Seattorn Logo-02.svg';

// import cookies from 'js-cookie';

const SocialShare = [
  {
    Social: <FaFacebookF />,
    link: 'https://www.facebook.com/MethodMelodyOfficial',
  },
  {
    Social: <FaLinkedinIn />,
    link: 'https://www.linkedin.com/company/method-melody',
  },
  { Social: <FaInstagram />, link: 'https://www.instagram.com/method_melody/' },
  // { Social: <FaTwitter />, link: "https://twitter.com/method_melody" },
];

const Footer = () => {

  return (
    <div className=' w-full text-center relative bg-white'>
      <div className='footer_section'></div>
      <footer className='px-8 md:px-28 lg:px-8 xl:mx-12 2xl:mx-32 md:pt-24  xl:pt-60 3xl:pt-[300px] relative bg-black lg:bg-transparent  z-50 '>
        <div className='lg:grid grid-cols-3 gap-4'>
          <div className='flex flex-wrap    justify-between lg:grid grid-cols-2  lg:grid-cols-3 col-span-2  text-center md:text-start'>
            <div className='w-full'>
              <div className='text-white w-min  text-start'>
                <Image
                  src={logo}
                  alt='logo'
                  className='h-16 w-min -ml-6 '
                ></Image>

                <ul className='w-full mx-auto lg:text-sm xl:text-md'>
                  <li className='cursor-pointer  hover:text-white my-2 flex justify-start space-x-2 items-center'>
                    <FaPhone />
                    <Link href='tel:+8801923088574'>
                      <p>+8801913130113</p>
                    </Link>
                  </li>
                  <li className='cursor-pointer  hover:text-white my-2 flex justify-start space-x-2 items-center'>
                    <MdEmail />{' '}
                    <Link href='mailto:admin@example.com'>
                      <p>support@seattron.com</p>
                    </Link>
                  </li>

                  <Link href='/methodmelody.com'>
                    <li className='cursor-pointer hover:text-white my-2 flex justify-start space-x-2 items-center'>
                      <div>
                        <GoLocation />
                      </div>
                      <p>
                        Plot no 2, Rupayan Shopping Square, Sayem Sobhan Anvir
                        Rd, Bashundhara R/A, Dhaka 1229
                      </p>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
            <div className='text-white'>
              <h3 className='text-2xl text-white font-bold my-2'>Explore</h3>
              <ul className='text-start  text-lg'>
                <Link href='/events'>
                  <li className='cursor-pointer hover:text-brand_color my-2'>
                    Events
                  </li>
                </Link>
                <Link href='/terms-conditions'>
                  <li className='cursor-pointer hover:text-brand_color my-2'>
                    Terms
                  </li>
                </Link>
                <Link href='/support'>
                  <li className='cursor-pointer hover:text-brand_color my-2'>
                    Support
                  </li>
                </Link>
              </ul>
            </div>
            <div className='text-start text-white'>
              <h3 className='text-2xl text-white font-bold my-2'>About</h3>
              <ul className='text-start text-lg '>
                <Link href='/about-us'>
                  <li className='cursor-pointer hover:text-brand_color my-2'>
                    About Us
                  </li>
                </Link>
                <Link href='/privacy-policy'>
                  <li className='cursor-pointer hover:text-brand_color my-2'>
                    Privacy
                  </li>
                </Link>
                <Link href='/contact'>
                  <li className='cursor-pointer hover:text-brand_color my-2'>
                    Contact
                  </li>
                </Link>
              </ul>
            </div>
          </div>

          <div className='footer-r-ssl  '>
            <Image alt='ssl' src={payImg} className=' ' />
          </div>
        </div>
        <div className='flex justify-center mt-4 md:mt-0 md:justify-end items-center space-x-2'>
          <ul className='flex justify-center items-center h-min space-x-2 '>
            {SocialShare.map((val, i) => (
              <li key={i} className='text-white text-xl'>
                <a
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`${val.link}`}
                >
                  {val.Social}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className=' text-white w-full pb-4 text-center border-t-gray-900 border-t-2 '>
          <div>
            <span>Copyright © {new Date().getFullYear()}</span>

            <strong className='text-white'> Seattron Intl.</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
