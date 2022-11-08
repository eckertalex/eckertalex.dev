import { Link, Icon, createIcon, IconButton, IconProps } from '@chakra-ui/react'
import {
	Mail as MailIcon,
	Github as GithubIcon,
	Linkedin as LinkedinIcon,
	Twitter as TwitterIcon,
} from 'lucide-react'

function Mail(props: IconProps) {
	return <Icon as={MailIcon} {...props} />
}

function Github(props: IconProps) {
	return <Icon as={GithubIcon} {...props} />
}

function Linkedin(props: IconProps) {
	return <Icon as={LinkedinIcon} {...props} />
}

function Twitter(props: IconProps) {
	return <Icon as={TwitterIcon} {...props} />
}

const components = {
	mail: Mail,
	github: Github,
	linkedin: Linkedin,
	twitter: Twitter,
}

type SocialIconsProps = {
	kind: keyof typeof components
	href: string
}

function SocialIcons({ kind, href }: SocialIconsProps) {
	const SocialSvg = components[kind]

	return (
		<IconButton
			as={Link}
			isExternal
			href={href}
			aria-label={kind}
			icon={<SocialSvg />}
			isRound
			variant="ghost"
		/>
	)
}

export { SocialIcons }
