import {getFileBySlug} from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import hydrate from 'next-mdx-remote/hydrate'
import {SocialIcons} from '@/components/social-icons'
import {MDXComponents} from '@/components/mdx-components'
import {PageSeo} from '@/components/seo'
import {PageTitle} from '@/components/page-title'

export default function About({about}) {
  const {mdxSource, frontMatter} = about,
    content = hydrate(mdxSource, {
      components: MDXComponents,
    })

  return (
    <>
      <PageSeo
        description={`${frontMatter.title} - ${siteMetadata.author}`}
        title={`${frontMatter.title} - ${siteMetadata.author}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <PageTitle>{frontMatter.title}</PageTitle>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <img alt="avatar" className="w-48 h-48 rounded-full" src={siteMetadata.image} />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{siteMetadata.author}</h3>
            <div className="text-gray-500 dark:text-gray-400">Software Developer (Frontend)</div>
            <div className="text-gray-500 dark:text-gray-400">EDAG Engineering GmbH</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcons href={`mailto:${siteMetadata.email}`} kind="mail" />
              <SocialIcons href={siteMetadata.github} kind="github" />
              <SocialIcons href={siteMetadata.linkedin} kind="linkedin" />
              <SocialIcons href={siteMetadata.twitter} kind="twitter" />
            </div>
          </div>
          <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">{content}</div>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const about = await getFileBySlug('about')

  return {props: {about}}
}
