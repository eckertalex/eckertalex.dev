import {ArticleJsonLd, NextSeo} from 'next-seo'
import metadata from 'metadata'

type PageSeoProps = {
  title: string
  description?: string
  url: string
}

type PostSeoProps = {
  title: string
  summary: string
  date: string
  lastmod: string
  url: string
  tags: string[]
  images: string | string[]
}

const defaultSeoConfig = {
  title: metadata.author,
  description: metadata.description,
  additionalMetaTags: [
    {property: 'author', content: metadata.author},
    {
      property: 'keywords',
      content: metadata.keywords,
    },
  ],
  twitter: {
    cardType: 'summary_large_image',
    handle: metadata.twitterHandle,
    site: metadata.twitterHandle,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    site_name: metadata.author,
    profile: {
      firstName: metadata.author.split(' ')[0],
      lastName: metadata.author.split(' ')[1],
    },
    images: [
      {
        url: metadata.socialBanner,
        alt: metadata.author,
        width: 1200,
        height: 600,
      },
    ],
  },
}

function PageSeo(props: PageSeoProps) {
  const {title, description, url} = props
  return (
    <NextSeo
      title={title}
      description={description}
      openGraph={{
        url,
        title,
        description,
      }}
      canonical={url}
    />
  )
}

function PostSeo(props: PostSeoProps) {
  const {title, summary, date, lastmod, url, tags, images = []} = props
  const publishedAt = new Date(date).toISOString()
  const modifiedAt = new Date(lastmod || date).toISOString()
  const imagesArr = images.length === 0 ? [metadata.socialBanner] : typeof images === 'string' ? [images] : images
  const featuredImages = imagesArr.map((img) => {
    return {
      url: `${metadata.siteUrl}${img}`,
      alt: title,
    }
  })

  return (
    <>
      <NextSeo
        title={`${title} | ${metadata.author}`}
        description={summary}
        additionalMetaTags={[
          {property: 'author', content: metadata.author},
          {
            name: 'twitter:image',
            content: featuredImages[0].url,
          },
        ]}
        canonical={url}
        openGraph={{
          type: 'article',
          title,
          description: summary,
          url,
          article: {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            authors: [`${metadata.siteUrl}/about`],
            tags,
          },
          images: featuredImages,
        }}
      />
      <ArticleJsonLd
        authorName={metadata.author}
        dateModified={publishedAt}
        datePublished={modifiedAt}
        description={summary}
        images={featuredImages.map((img) => img.url)}
        publisherName={metadata.author}
        publisherLogo={`${metadata.siteUrl}${metadata.favicon}`}
        title={title}
        url={url}
      />
    </>
  )
}

export {defaultSeoConfig, PostSeo, PageSeo}
