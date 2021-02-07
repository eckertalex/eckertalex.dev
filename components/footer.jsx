import {CustomLink} from '@/components/link'
import siteMetadata from '@/data/siteMetadata'
import {SocialIcons} from '@/components/social-icons'
import {NowPlaying} from '@/components/now-playing'

export function Footer() {
  return (
    <footer className="flex flex-col items-center mt-16">
      <div className="flex space-x-4">
        <NowPlaying />
      </div>
      <div className="flex mb-3 space-x-4">
        <SocialIcons kind="mail" href={`mailto:${siteMetadata.email}`} size="6" />
        <SocialIcons kind="github" href={siteMetadata.github} size="6" />
        <SocialIcons kind="linkedin" href={siteMetadata.linkedin} size="6" />
        <SocialIcons kind="twitter" href={siteMetadata.twitter} size="6" />
      </div>
      <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <div>{siteMetadata.author}</div>
        <div>{` • `}</div>
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <CustomLink href="/">{siteMetadata.title}</CustomLink>
      </div>
      <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
        <CustomLink href="/impressum">Impressum</CustomLink>
        <div>{` • `}</div>
        <CustomLink href="/datenschutz">Datenschutz</CustomLink>
      </div>
    </footer>
  )
}
