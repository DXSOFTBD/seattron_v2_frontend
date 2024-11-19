import React from "react";

const StickerCard = ({ title, pillColor, value }: any) => {
  const newValue = Number(value);
  return (
    <div className='flex flex-col w-full h-full p-7 rounded-md bg-gray-100 border-[1px] border-brand_color text-gray-800'>
      <div className='flex w-full h-fu{ll items-start justify-start space-x-2'>
        <div
          className={`bg-${
            pillColor ? pillColor : 'brand_color'
          } h-10 w-10 rounded-fifty_percent`}
        ></div>
        <div>
          <p className='text-2xl text-gray-900'>{title}</p>
          <div className='mt-4'>
            <p className='text-3xl text-gray-900'>{newValue ? newValue : 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerCard;
