import Link from "next/link";
import { GithubIcon, HexagonIcon, TwitterIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

import { MainNav } from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import { SkipNav } from "./skip-nav";

export function SiteHeader() {
	return (
		<header className="flex flex-row items-center py-4">
			<SkipNav />
			<div className="flex flex-1 items-center">
				<Link
					href="/"
					className="ring-offset-background focus-visible:ring-ring mr-6 flex h-9 items-center space-x-2 rounded-md px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
				>
					<HexagonIcon className="size-6 text-pink-600 dark:text-pink-400" />
					<span className="hidden font-bold sm:inline-block">
						{siteConfig.name}
					</span>
				</Link>
				<MainNav />
			</div>
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
				<ModeToggle />
			</nav>
		</header>
	);
}
