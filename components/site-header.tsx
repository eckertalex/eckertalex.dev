import { ModeToggle } from "./mode-toggle";
import { SkipNav } from "./skip-nav";
import { SiteLogo } from "./site-logo";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { RssIcon } from "lucide-react";
import Link from "next/link";

export function SiteHeader() {
	return (
		<header className="flex items-center justify-between py-4">
			<SkipNav />
			<SiteLogo />
			<div className="flex gap-4">
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
			</div>
		</header>
	);
}
