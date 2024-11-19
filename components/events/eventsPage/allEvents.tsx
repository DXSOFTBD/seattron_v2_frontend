import AllEventCard from './allEventCard';

const AllEvents = ({ events }: any) => {
  return (
    <div
      className={`bg-white pt-6 lg:pt-28 w-full h-full text-center relative z-10`}
    >
      <div className='upcoming_banner'></div>
      <main className='mx-auto max-w-[1200px]'>
        <div>
          <p className='ui_title text-brand_color'>ALL EVENTS</p>
          <p className='text-black my-2 text-lg font-lato'>
            Here is the list of events
          </p>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-3 mx-2 lg:mx-0 gap-2 md:gap-6 mt-8'>
          {events.length
            ? events.map((event: any) => (
                <AllEventCard key={event.slug} event={event} />
              ))
            : null}
        </div>
      </main>
    </div>
  );
};

export default AllEvents;
