import { VFC } from 'react';
import SEO from '../SEO/SEO';

const Head: VFC = () => {
  return (
    <>
      <meta
        key='viewport'
        name='viewport'
        content='width=device-width, initial-scale=1'
      />

      <link rel='manifest' href='/site.webmanifest' key='site-manifest' />
      <link
        rel='preload'
        href='/assets/font/Gotham Bold.otf'
        as='font'
        type='font/woff'
        crossOrigin='crossorigin'
      />
      <link
        rel='preload'
        href='/assets/font/Lato-Regular.ttf'
        as='font'
        type='font/woff'
        crossOrigin='crossorigin'
      />
      {/* <link
        rel='preload'
        href='/assets/font/Didot Regular.ttf'
        as='font'
        type='font/woff'
        crossOrigin='crossorigin'
      /> */}
      <link
        rel='preload'
        href='/assets/font/Didot Bold Italic.ttf'
        as='font'
        type='font/woff'
        crossOrigin='crossorigin'
      />
      <link rel="preconnect" href="https://api.seattron.com" />
    </>
  );
};

export default Head;
