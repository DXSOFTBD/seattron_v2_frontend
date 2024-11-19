import dynamic from 'next/dynamic';
const CheckTicket = dynamic(
  import('@/components/merchant/ticket-checking/checkTicket')
);

const Index = () => {
  //   const openGraph = {
  //     title: 'Seattron Login',
  //     url: `https://seattron.com/login`,
  //   };
  return (
    <div className='w-full font-lato h-screen bg-white'>
      <CheckTicket />
    </div>
  );
};
// Index.Layout = Layout;
export default Index;
