import SEO from '@/components/common/SEO/SEO';
import { eventBySlug, pastEventById, upcomingEvents } from 'lib/fetchData';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

const Layout = dynamic(import('../../components/layouts/Primary'));
const EventDetails = dynamic(import('../../components/events/pastEvent/event'));
const Index = ({ event, featuredEvents, upcomingEvents }: any) => {
  const openGraph = {
    images: [
      {
        url: process.env.NEXT_PUBLIC_SERVER_HOST + event.thumb,
        width: '300',
        height: '450',
        alt: event.name,
        type:'image/png'
      },
    ],
    title: event.title,
    url: `https://seattron.com/${event.slug}`,
  };
  return (
    <div>
      <SEO
        title={event?.name}
        description={event.description}
        openGraph={openGraph}
      ></SEO>
      <EventDetails
        event={event}
        featuredEvents={featuredEvents}
        upcomingEvents={upcomingEvents}
      />
    </div>
  );
};

Index.Layout = Layout;
export default Index;
export async function getStaticPaths() {
  const events = await upcomingEvents();
  const paths = events?.map((event: any) => ({
    params: {
      slug: event.slug,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const events = await upcomingEvents();
  let featuredEvents = events.filter((event: any) => event.isFeatured === true);
  const event = await pastEventById(slug);

  return {
    props: {
      event: event,
      upcomingEvents: events,
      featuredEvents: featuredEvents,
    },
    revalidate: 60,
  };
};
