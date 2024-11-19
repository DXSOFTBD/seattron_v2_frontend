import Head from 'next/head';
import styles from '../styles/home/Home.module.css';
import dynamic from 'next/dynamic';
import AboutUs from '@/components/about-privacy-terms/about-us';
import Footer from '@/components/home/footer';
const Layout = dynamic(() => import('@/components/layouts/Primary'));

const Index = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Seattron -About Us</title>
        <meta property="url" content={`${process.env.NEXT_PUBLIC_CLIENT_HOST}/about-us`}></meta>
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_CLIENT_HOST}/about-us`}></meta>
        <meta property="og:title" content='About Us'></meta>
        <meta name='description' content="Seattron: Your Ultimate Online Event Management Solution

Welcome to Seattron, your go-to online event management platform! Whether you're planning a corporate conference, a dazzling wedding, a concert, or any other event, Seattron is your one-stop solution for seamless event planning and execution.

Our user-friendly interface makes it a breeze to create and manage events, from setting up event details and ticketing to promoting your event to a wide audience. With Seattron, you can:

Effortlessly Create Events: Our intuitive event creation tools allow you to set up events in minutes, including all the essential details and ticketing options.

Streamlined Ticketing: Sell tickets online with ease, manage pricing tiers, and track ticket sales in real-time. We offer secure payment processing to ensure your transactions are hassle-free.

Promote Your Event: Leverage our marketing tools to reach a broader audience through social media integration, email campaigns, and customized event promotion.

Manage Attendees: Keep track of attendees, collect vital information, and streamline check-in processes to ensure a smooth event experience for your guests.

Robust Analytics: Gain valuable insights into your event's performance with comprehensive analytics, helping you make data-driven decisions for future events.

Customer Support: Our dedicated support team is here to assist you at every step, ensuring your event is a resounding success.

Seattron is designed to simplify event management and enhance your event's success. Join the Seattron community today and take your event planning to the next level!"/>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='text-center font-lato'>
        <AboutUs />
        <Footer />
      </main>
    </div>
  );
};
Index.Layout = Layout;
export default Index;
export async function getStaticProps() {
  return {
    props: {},
  };
}
