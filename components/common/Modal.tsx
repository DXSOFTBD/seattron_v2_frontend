import React from 'react';
export default function Modal({
  showModal,
  setShowModal,
  title,
  children,
  handleConfirm,
  data,
  confirmText,
  confirmCrl,
  setIsFree,
  cancel,
  cancelClr
}: any) {
  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center font-lato items-center z-[3000] flex overflow-x-hidden overflow-y-auto fixed inset-0 outline-none focus:outline-none backdrop-blur-[1.5px]'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              {/*content*/}
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                {/*header*/}

                <div className='text-center p-5 border-b border-solid border-slate-200 rounded-t'>
                  <h3 className='text-2xl font-semibold w-full px-auto mx-auto'>
                    {title}
                  </h3>
                </div>
                {/*body*/}
                <div className='relative p-6 flex-auto'>{children}</div>
                {/*footer*/}
                <div className='flex items-center justify-end space-x-2 p-6 border-t border-solid border-slate-200 rounded-b'>
                  <button
                    className={` ${cancelClr ? cancelClr : 'bg-red-500'} rounded-md text-white background-transparent font-bold uppercase px-4 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type='button'
                    onClick={() => {
                      if (setIsFree) {
                        setIsFree(false);
                      }
                      setShowModal()
                    }
                    }
                  >
                    {cancel ? cancel : 'No'}
                  </button>
                  {confirmText && (
                    <button
                      className={`${confirmCrl ? confirmCrl : 'bg-brand_color'} text-white hover:bg-cyan-700 font-bold uppercase text-sm px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                      type='button'
                      onClick={() => {

                        setShowModal(false);
                        if (setIsFree) {
                          setIsFree(true);
                        }
                        if (handleConfirm) {
                          handleConfirm(data);

                        }
                      }}
                    >
                      {confirmText}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
