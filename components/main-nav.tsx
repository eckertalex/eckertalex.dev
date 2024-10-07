"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { buttonVariants } from "./ui/button";

export function MainNav() {
	const pathname = usePathname();

	return (
		<nav className="flex items-center space-x-6 text-sm font-medium">
			<Link
				href="/blog"
				className={cn(
					buttonVariants({
						variant: "link",
					}),
					"hover:text-foreground/80 transition-colors",
					pathname?.startsWith("/blog")
						? "text-foreground"
						: "text-foreground/60"
				)}
			>
				Blog
			</Link>
		</nav>
	);
}
