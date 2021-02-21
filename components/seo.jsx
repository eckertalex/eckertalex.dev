import {ArticleJsonLd, NextSeo} from 'next-seo'
import siteMetadata from '@/data/siteMetadata'

export const SEO = {
  title: siteMetadata.title,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: siteMetadata.title,
        width: 1200,
        height: 600,
      },
    ],
  },
  twitter: {
    handle: siteMetadata.twitter,
    site: siteMetadata.twitter,
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'author',
      content: siteMetadata.author,
    },
  ],
}

export function PageSeo({title, description, url}) {
  return (
    <NextSeo
      canonical={url}
      description={description}
      openGraph={{
        url,
        title,
        description,
      }}
      title={`${title} – ${siteMetadata.title}`}
    />
  )
}

export function BlogSeo({title, summary, date, lastmod, url, tags, images = []}) {
  const publishedAt = new Date(date).toISOString(),
    modifiedAt = new Date(lastmod || date).toISOString(),
    imagesArr = images.length === 0 ? [siteMetadata.socialBanner] : typeof images === 'string' ? [images] : images,
    featuredImages = imagesArr.map((img) => {
      return {
        url: `${siteMetadata.siteUrl}${img}`,
        alt: title,
      }
    })

  return (
    <>
      <NextSeo
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: featuredImages[0].url,
          },
        ]}
        canonical={url}
        description={summary}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            authors: [`${siteMetadata.siteUrl}/about`],
            tags,
          },
          url,
          title,
          description: summary,
          images: featuredImages,
        }}
        title={`${title} – ${siteMetadata.title}`}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={publishedAt}
        datePublished={modifiedAt}
        description={summary}
        images={featuredImages}
        publisherName={siteMetadata.author}
        title={title}
        url={url}
      />
    </>
  )
}
