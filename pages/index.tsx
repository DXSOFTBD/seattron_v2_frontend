import styles from '../styles/home/Home.module.css';
import dynamic from 'next/dynamic';
import { pastEvents, upcomingEvents } from 'lib/fetchData';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
const Home = dynamic(() => import('@/components/home/Home'));
const Layout = dynamic(() => import('@/components/layouts/Primary'));

const Index = ({ pastEvents, upcomingEvents }: any) => {

  return (
    <div className={styles.container}>
      <Head>
        <link rel="canonical" href="https://seattron.com/" />
        <meta name="robots" content="follow, index, max-snippet:-1, max-video-preview:-1, max-image-preview:large"></meta>
      </Head>
      <NextSeo
        title=
        "Seattron: Elevate Your Event Planning Experience"
        description={`Welcome to Seattron, your go-to online event management platform! Whether you're planning a corporate conference, a dazzling wedding, a concert, or any other event, Seattron is your one-stop solution for seamless event planning and execution.

        Our user-friendly interface makes it a breeze to create and manage events, from setting up event details and ticketing to promoting your event to a wide audience. With Seattron, you can:
        
        Effortlessly Create Events: Our intuitive event creation tools allow you to set up events in minutes, including all the essential details and ticketing options.
        
        Streamlined Ticketing: Sell tickets online with ease, manage pricing tiers, and track ticket sales in real-time. We offer secure payment processing to ensure your transactions are hassle-free.
        
        Promote Your Event: Leverage our marketing tools to reach a broader audience through social media integration, email campaigns, and customized event promotion.
        
        Manage Attendees: Keep track of attendees, collect vital information, and streamline check-in processes to ensure a smooth event experience for your guests.
        
        Robust Analytics: Gain valuable insights into your event's performance with comprehensive analytics, helping you make data-driven decisions for future events.
        
        Customer Support: Our dedicated support team is here to assist you at every step, ensuring your event is a resounding success.
        
        Seattron is designed to simplify event management and enhance your event's success. Join the Seattron community today and take your event planning to the next level!"`}
        openGraph={{
          url: `${process.env.NEXT_PUBLIC_CLIENT_HOST}/`,
          title: "Seattron: Elevate Your Event Planning Experience",
          description: '"Seattron: Your All-in-One Event Management Solution. Create, promote, and manage events effortlessly. Sell tickets, track sales, and access robust analytics. Simplify event planning with Seattron!"',
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
              alt: 'Seattron',
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
      <main className='text-center font-lato'>
        <Home pastEvents={pastEvents} upcomingEvents={upcomingEvents} />
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