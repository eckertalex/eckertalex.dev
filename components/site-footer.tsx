import Link from "next/link";
import {
	GithubIcon,
	HexagonIcon,
	LinkedinIcon,
	RssIcon,
	TwitterIcon,
} from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function SiteFooter() {
	return (
		<footer className="mt-16 border-t pb-16 pt-48">
			<div className="grid grid-cols-2 gap-16 md:grid-cols-4">
				<div className="col-span-2 flex flex-col space-y-6">
					<Link
						href="/"
						className="mr-6 flex items-center space-x-2 rounded-md ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
					>
						<HexagonIcon className="size-10 text-pink-600 dark:text-pink-400" />
						<span className="text-2xl font-bold">
							{siteConfig.name}
						</span>
					</Link>
					<p className="text-xl text-muted-foreground">
						A developer who cares about the user.
					</p>
					<nav className="flex space-x-1">
						<Link
							href={siteConfig.links.github}
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({
									size: "sm",
									variant: "ghost",
								}),
								"w-9 px-0"
							)}
						>
							<GithubIcon className="size-5" />
							<span className="sr-only">GitHub</span>
						</Link>
						<Link
							href={siteConfig.links.twitter}
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({
									size: "sm",
									variant: "ghost",
								}),
								"w-9 px-0"
							)}
						>
							<TwitterIcon className="size-5 fill-current" />
							<span className="sr-only">Twitter</span>
						</Link>
						<Link
							href={siteConfig.links.linkedin}
							target="_blank"
							rel="noreferrer"
							className={cn(
								buttonVariants({
									size: "sm",
									variant: "ghost",
								}),
								"w-9 px-0"
							)}
						>
							<LinkedinIcon className="size-5 fill-current" />
							<span className="sr-only">Linkedin</span>
						</Link>
						<Link
							href="/rss.xml"
							className={cn(
								buttonVariants({
									size: "sm",
									variant: "ghost",
								}),
								"w-9 px-0"
							)}
						>
							<RssIcon className="size-5 fill-current" />
							<span className="sr-only">RSS</span>
						</Link>
					</nav>
				</div>
				<div>
					<div className="scroll-m-20 text-lg font-semibold tracking-tight">
						General
					</div>
					<ul className="mt-4 flex flex-col gap-4">
						<li>
							<Link
								href="/impressum"
								className="rounded-md text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								Impressum
							</Link>
						</li>
						<li>
							<Link
								href="/datenschutz"
								className="rounded-md text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								Datenschutz
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<div className="scroll-m-20 text-lg font-semibold tracking-tight">
						Sitemap
					</div>
					<ul className="mt-4 flex flex-col gap-4">
						<li>
							<Link
								href="/"
								className="rounded-md text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/blog"
								className="rounded-md text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="rounded-md text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/sitemap.xml"
								className="rounded-md text-muted-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
							>
								Sitemap.xml
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<p className="mt-8 text-sm text-muted-foreground">
				All rights reserved © Alexander Eckert 2024
			</p>
		</footer>
	);
}
