import Link from "next/link";
import { RssIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { ModeToggle } from "./mode-toggle";
import { SiteLogo } from "./site-logo";
import { SkipNav } from "./skip-nav";
import { buttonVariants } from "./ui/button";

export function SiteHeader() {
	return (
		<header className="flex items-center justify-between py-4">
			<SkipNav />
			<SiteLogo />
			<nav className="flex gap-4">
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
				<ModeToggle />
			</nav>
		</header>
	);
}
