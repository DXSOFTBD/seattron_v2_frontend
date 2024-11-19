import React from 'react';
import confetti from 'canvas-confetti';
import { MdCheckCircleOutline } from 'react-icons/md';
import dynamic from 'next/dynamic';
import Link from 'next/link';
const Layout = dynamic(import('@/components/layouts/Primary'));

const Success = () => {
  var duration = 10 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: any, max: any) {
    return Math.random() * (max - min) + min;
  }

  var interval: any = setInterval(function () {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
  return (
    <div className='w-full h-full flex justify-center items-center min-h-[90vh] text-black'>
      <div className='bg-gray-50 shadow-md rounded-md text-center h-[400px] w-[500px] p-6 flex justify-center items-center'>
        <div>
          <div>
            <p className='text-2xl font-bold text-brand_color'>
              Congratulations!
            </p>
            <p className='text-lg font-semibold text-gray-700 my-2'>
              You successfully booked your spot.
            </p>
          </div>
          <MdCheckCircleOutline className='h-16 w-16 text-green-600 mx-auto px-auto my-2' />
          <div>
            <p>Thank you for your purchase</p>
            <small>
              You will receive an email with PDF attachment.Please keep the PDF
              safe.
            </small>
          </div>
          <Link href='/events'>
            <button className='bg-gray-500 px-3 py-2 text-white cursor-pointer rounded-md my-6'>
              {`  See what's upcoming`}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
Success.Layout = Layout;
export default Success;
