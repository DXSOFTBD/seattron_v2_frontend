import Head from 'next/head';
import { FC, Fragment, ReactNode } from 'react';
import seoData from '../../../config/next-seo.config';




// interface OgImage {
//   url?: string;
//   width?: string;
//   height?: string;
//   alt?: string;
// }

// interface Props {
//   title?: string;
//   description?: string;
//   robots?: string;
//   openGraph?: {
//     title?: string;
//     type?: string;
//     locale?: string;
//     description?: string;
//     site_name?: string;
//     url?: string;
//     images?: OgImage[];
//   };
//   children?: ReactNode;
// }

const ogImage = ({ url, width, height, alt, title }: any, index: number) => {
  // generate full URL for OG image url with store base URL
  const imgUrl = url

  return (
    <Fragment key={`og:image:${index}`}>
      <meta
        key={`og:image:url:${index}`}
        property='og:image'
        content={imgUrl}
      />
      <meta
        key={`og:image:width:${index}`}
        property='og:image:width'
        content={width}
      />
      <meta
        key={`og:image:height:${index}`}
        property='og:image:height'
        content={height}
      />
      <meta
        key={`og:image:alt:${index}`}
        property='og:image:alt'
        content={alt}
      />
      <meta
        key={`og:image:title:${index}`}
        property='og:image:title'
        content={title}
      />
    </Fragment>
  );
};

const SEO: FC<any> = ({
  title,
  description,
  openGraph,
  robots,
  children,
}) => {
  /**
   * @see https://nextjs.org/docs/api-reference/next/head
   *
   * meta or any other elements need to be contained as direct children of the Head element,
   * or wrapped into maximum one level of <React.Fragment> or arrays
   * otherwise the tags won't be correctly picked up on client-side navigations.
   *
   * The `key` property makes the tag is only rendered once,
   */
  return (
    <Head>
      <title key='title'>{title ? title : seoData.title}</title>
      <meta
        key='description'
        name='description'
        content={description || seoData.description}
      />
      <meta
        key='og:type'
        property='og:type'
        content={openGraph?.type ?? seoData.openGraph.type}
      />
      <meta
        key='og:title'
        property='og:title'
        content={
          openGraph?.title ? openGraph.title : title ? title : seoData.title
        }
      />
      <meta
        key='og:description'
        property='og:description'
        content={
          openGraph?.description ? description : seoData.description

        }
      />
      <meta
        key='og:site_name'
        property='og:site_name'
        content={openGraph?.site_name ?? seoData.openGraph.site_name}
      />
      <meta
        key='og:url'
        property='og:url'
        content={openGraph?.url ? openGraph.url : seoData.openGraph.url}
      ></meta>
      {openGraph?.locale && (
        <meta key='og:locale' property='og:locale' content={openGraph.locale} />
      )}
      {openGraph?.images?.length
        ? openGraph.images.map((img: any, index: any) => ogImage(img, index))
        : ogImage(seoData.openGraph.images[0], 0)}
      {seoData.twitter.cardType && (
        <meta
          key='twitter:card'
          name='twitter:card'
          content={seoData.twitter.cardType}
        />
      )}
      {seoData.twitter.site && (
        <meta
          key='twitter:site'
          name='twitter:site'
          content={seoData.twitter.site}
        />
      )}
      {seoData.twitter.handle && (
        <meta
          key='twitter:creator'
          name='twitter:creator'
          content={seoData.twitter.handle}
        />
      )}
      <meta key='robots' name='robots' content={robots ?? 'index,follow'} />
      <meta
        key='googlebot'
        name='googlebot'
        content={robots ?? 'index,follow'}
      ></meta>

      {children}
    </Head>
  );
};

export default SEO;
