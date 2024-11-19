import dynamic from 'next/dynamic';
import { pastEvents, upcomingEvents } from 'lib/fetchData';
const Events = dynamic(
  () => import('../../components/events/eventsPage/event'),
  {
    ssr: false,
  }
);
const Layout = dynamic(() => import('../../components/layouts/Primary'), {
  ssr: false,
});

const Index = ({ pastEvents, upcomingEvents }: any) => {
  return (
    <div>
      {/* <NextSeo
        title="Discover Our Exciting Event Lineup"
        description="Explore our dynamic event lineup, featuring a diverse range of exciting experiences and entertainment. From concerts to conferences, discover your next unforgettable event here."
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_CLIENT_HOST}/events`,
          title: "Discover Our Exciting Event Lineup",
          description: "Explore our dynamic event lineup, featuring a diverse range of exciting experiences and entertainment. From concerts to conferences, discover your next unforgettable event here.",
          images: [
            {
              url: process.env.NEXT_PUBLIC_CLIENT_HOST + '/assets/background/home.jpg',
              width: 1080,
              height: 600,
              alt: 'Seattron - Events',
              type: 'image/jpeg',
            },
            {
              url: process.env.NEXT_PUBLIC_CLIENT_HOST + '/assets/background/home.jpg',
              width: 1080,
              height: 600,
              alt: 'Seattron - Events',
              type: 'image/jpeg',
            },
          ],
          siteName: 'Seattron',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      /> */}
      <main className='text-center font-lato'>
        <Events pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
      </main>
    </div>
  );
};
Index.Layout = Layout;
export default Index;
export async function getStaticProps() {
  const past: any = await pastEvents();
  const upcoming = await upcomingEvents();

  return {
    props: {
      pastEvents: past,
      upcomingEvents: upcoming,
    },
    revalidate: 60,
  };
}
