import React from 'react';
import { CgClose } from 'react-icons/cg';
import ReactPlayer from 'react-player';
const YoutubePlayer = ({ video, setShowTrailer, showTrailer }: any) => {
  return (
    <div className='z-[1500] mx-auto px-auto text-center'>
      <div className='player-wrapper text-center mx-auto'>
        <div className='bg-gray-600 rounded-md  mx-auto p-4 text-center border-[1px] w-full h-full  md:w-[650px] md:h-[450px] border-brand_color'>
          <div
            onClick={() => setShowTrailer(false)}
            className='flex items-center justify-center cursor-pointer space-x-2 mx-auto px-auto mb-2'
          >
            <CgClose className='w-8 h-8 z-[2000]  text-white ' />
            <p className='text-white'>Close Player</p>
          </div>

          <ReactPlayer
            className='react-player m-4 h-max-[400px] mx-auto px-auto'
            url={video}
            width='100%'
            height='90%'
            controls={true}
            loop={true}
            playing={showTrailer}
          />
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
