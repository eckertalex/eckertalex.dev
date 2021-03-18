import {ArticleJsonLd, NextSeo} from 'next-seo'
import siteMetadata from '@/data/siteMetadata.json'

type PageSeoProps = {
  title: string
  description: string
  url: string
}

type BlogSeoProps = {
  title: string
  summary: string
  date: string
  lastmod: string
  url: string
  tags: string[]
  images: string | string[]
}

export const SEO = {
  title: siteMetadata.author,
  description: siteMetadata.description,
  openGraph: {
    type: 'website',
    locale: siteMetadata.language,
    url: siteMetadata.siteUrl,
    title: siteMetadata.author,
    description: siteMetadata.description,
    images: [
      {
        url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
        alt: siteMetadata.author,
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

export function PageSeo(props: PageSeoProps) {
  const {title, description, url} = props
  return (
    <NextSeo
      canonical={url}
      description={description}
      openGraph={{
        url,
        title,
        description,
      }}
      title={title}
    />
  )
}

export function BlogSeo(props: BlogSeoProps) {
  const {title, summary, date, lastmod, url, tags, images = []} = props
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
        title={`${title} – ${siteMetadata.author}`}
      />
      <ArticleJsonLd
        authorName={siteMetadata.author}
        dateModified={publishedAt}
        datePublished={modifiedAt}
        description={summary}
        images={featuredImages.map((img) => img.url)}
        publisherName={siteMetadata.author}
        publisherLogo={`${siteMetadata.siteUrl}${siteMetadata.socialBanner}`}
        title={title}
        url={url}
      />
    </>
  )
}
