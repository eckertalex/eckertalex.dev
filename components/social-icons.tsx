import Mail from '@/assets/mail.svg'
import Github from '@/assets/github.svg'
import Linkedin from '@/assets/linkedin.svg'
import Twitter from '@/assets/twitter.svg'
// Icons taken from: https://simpleicons.org/

const components = {
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
}

type SocialIconsProps = {
  kind: keyof typeof components
  href: string
  size?: number
}

export function SocialIcons({kind, href, size = 8}: SocialIconsProps) {
  const SocialSvg = components[kind]

  return (
    <a
      className="text-sm text-gray-500 transition hover:text-gray-600"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-500 dark:text-gray-200 hover:text-pink-500 dark:hover:text-pink-400 h-${size} w-${size}`}
      />
    </a>
  )
}
