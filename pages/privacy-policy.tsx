import Head from 'next/head';
import styles from '../styles/home/Home.module.css';
import dynamic from 'next/dynamic';
import Privacy from '@/components/about-privacy-terms/privacy-policy';
import Footer from '@/components/home/footer';
const Layout = dynamic(() => import('@/components/layouts/Primary'));

const Index = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Seattron -About Us</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='text-center font-lato'>
        <Privacy />
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
