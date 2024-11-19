import SEO from '@/components/common/SEO/SEO';
import { eventBySlug, upcomingEvents } from 'lib/fetchData';
import { GetStaticPathsContext, GetStaticProps } from 'next';
import { NextSeo } from 'next-seo';
import dynamic from 'next/dynamic';

const Layout = dynamic(import('../../components/layouts/Primary'), {
  ssr: false,
});
const EventDetails = dynamic(
  import('../../components/events/eventDetails/eventDetails'),
  {
    ssr: false,
  }
);
const Index = ({ event, featuredEvents, upcomingEvents }: any) => {
  return (
    <div>
      <NextSeo
        title={event.name}
        description={event.description}
        openGraph={{
          url: `https://seattron.com/events/${event.slug}`,
          title: event.name,
          description: event.description,
          images: [
            {
              url: process.env.NEXT_PUBLIC_SERVER_HOST + event.thumb,
              width: 300,
              height: 450,
              alt: event.slug,
              type: 'image/jpeg',
            },
            {
              url: process.env.NEXT_PUBLIC_SERVER_HOST + event.cover,
              width: 300,
              height: 450,
              alt: event.slug,
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
      />
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
    fallback: true,
  };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const events = await upcomingEvents();
  let featuredEvents = events.filter((event: any) => event.isFeatured === true);
  const event = await eventBySlug(slug);

  return {
    props: {
      event: event,
      upcomingEvents: events,
      featuredEvents: featuredEvents,
    },
    revalidate: 60,
  };
};
