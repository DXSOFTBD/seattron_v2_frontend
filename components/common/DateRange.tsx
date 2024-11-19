import React from 'react';
import { getLastMonth, getLastWeek, getLastYear } from '../ui/date';


const DateRange = ({ dateRange, setDateRange }:any) => {
  const handleSubmit = (e:any) => {
    const newDateRange = {
      ...dateRange,
    };
    newDateRange[e.target.startDate.name] = e.target.startDate.value;
    newDateRange[e.target.endDate.name] = e.target.endDate.value;
    newDateRange.message = `Showing data from  ${newDateRange.startDate} to ${newDateRange.endDate}`;

    // newDateRange[e.target.startDate]
    setDateRange({ ...newDateRange });
    e.preventDefault();
  };

  const handleLastWeek = () => {
    let newDateRange = { ...dateRange };
    let lastWeek = getLastWeek();
    newDateRange.startDate = lastWeek;
    newDateRange.message = `Showing data from last 7 days`;
    setDateRange({ ...newDateRange });
  };
  const handleLastMonth = () => {
    let newDateRange = { ...dateRange };
    let lastMonth = getLastMonth();
    newDateRange.startDate = lastMonth;
    newDateRange.message = `Showing data from  last 30 days`;
    setDateRange({ ...newDateRange });
  };
  const handleLastYear = () => {
    let newDateRange = { ...dateRange };
    let lastYear = getLastYear();
    newDateRange.startDate = lastYear;
    newDateRange.message = `Showing data from last Year`;

    setDateRange({ ...newDateRange });
  };

  return (
    <div className='relative bg-daterange p-2 md:p-4 text-black rounded-lg w-350 md:w-400'>
      <h6 className='text-xl font-semibold mx-auto'>Select Date Range </h6>
      <div className=' main'>
        <div className='flex justify-around items center my-4'>
          <p className='border-2 border-gray-600 cursor-pointer py-2 hover:bg-brand_color rounded-md bg-admin_redis px-4 text-white ' onClick={() => handleLastWeek()}>
            Last Week
          </p>
          <p className='border-2 border-gray-600 cursor-pointer py-2 hover:bg-brand_color text-white  rounded-md bg- px-4 bg-admin_redis ' onClick={() => handleLastMonth()}>
            Last 30 Days
          </p>
          <p className='border-2 border-gray-600 cursor-pointer py-2  hover:bg-brand_color text-white  rounded-md px-4 bg-admin_redis ' onClick={() => handleLastYear()}>
            Last year
          </p>
        </div>

        <div className='mb-10'>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-content-center mt-4 align-items-center'>
              <div className='flex space-x-4 items-center '>
                <label htmlFor='startDate'> From </label>
                <input
                  className='startDate'
                  style={{
                    height: '30px',
                    width: ' 130px',
                    marginRight: '5px',
                    borderRadius: ' 5px',
                    fontSize: '.7rem',
                    fontWeight: ' 500',
                    backgroundColor: ' #f7f7f7',
                  }}
                  type='date'
                  name='startDate'
                  required
                />
              </div>
              <div className=' flex space-x-4 items-center '>
                <label htmlFor='endDate'> To </label>
                <input
                  className='startDate'
                  style={{
                    height: '30px',
                    width: ' 130px',
                    marginRight: '5px',
                    borderRadius: ' 5px',
                    fontSize: '.7rem',
                    fontWeight: ' 500',
                    backgroundColor: ' #f7f7f7',
                  }}
                  type='date'
                  name='endDate'
                  required
                />
              </div>

            </div>
          </form>
          <input type='submit' value='Apply' className='bg-gray-800 p-2 rounded-md  absolute right-6 bottom-2 hover:bg-gray-600 text-white' />
        </div>
      </div>
    </div>
    
  );
};

export default DateRange;