import Link from "next/link";

import { siteConfig } from "@/config/site";

import { SiteLogo } from "./site-logo";

export function SiteFooter() {
	return (
		<footer className="mt-16 border-t pb-16 pt-24">
			<div className="grid grid-cols-2 gap-16 md:grid-cols-4">
				<div className="col-span-2 flex flex-col space-y-6">
					<SiteLogo />
					<p className="text-muted-foreground text-xl">
						A developer who cares about the user.
					</p>
				</div>
				<div>
					<div className="scroll-m-20 text-lg font-semibold tracking-tight">
						General
					</div>
					<ul className="mt-4 flex flex-col gap-4">
						<li>
							<Link
								href="/impressum"
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								Impressum
							</Link>
						</li>
						<li>
							<Link
								href="/datenschutz"
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								Datenschutz
							</Link>
						</li>
						<li>
							<Link
								href={siteConfig.links.github}
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								GitHub
							</Link>
						</li>
						<li>
							<Link
								href={siteConfig.links.linkedin}
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								LinkedIn
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
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								href="/blog"
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								Blog
							</Link>
						</li>
						<li>
							<Link
								href="/about"
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								About
							</Link>
						</li>
						<li>
							<Link
								href="/sitemap.xml"
								className="text-muted-foreground ring-offset-background focus-visible:ring-ring rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
							>
								Sitemap.xml
							</Link>
						</li>
					</ul>
				</div>
			</div>
			<p className="text-muted-foreground mt-8 text-sm">
				All rights reserved © Alexander Eckert 2024
			</p>
		</footer>
	);
}
