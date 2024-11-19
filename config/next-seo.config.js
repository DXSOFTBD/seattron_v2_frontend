const seoData = {
  title: 'Seattron | Powered by Seattron',
  titleTemplate: '%s - Seattron',
  description: 'Seattron - https://seattron.com',
  openGraph: {
    title: 'Seattron | Powered by Seattron',
    description: 'Seattron - https://seattron.com',
    type: 'Event',
    url: 'https://seattron.com',
    site_name: 'Seattron',
    images: [
      {
        url: process.env.NEXT_PUBLIC_CLIENT_HOST + '/assets/background/home.jpg',
        width: '800',
        height: '600',
        alt: 'Seattron',
      },
    ],
  },
  twitter: {
    handle: '@Seattron',
    site: '@Seattron',
    cardType: 'summary_large_image',
  },
};
export default seoData;
