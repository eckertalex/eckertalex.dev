import Link from "next/link";
import { HexagonIcon } from "lucide-react";

import { siteConfig } from "@/config/site";

export function SiteLogo() {
	return (
		<Link
			href="/"
			className="ring-offset-background focus-visible:ring-ring mr-6 flex items-center space-x-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
		>
			<HexagonIcon className="size-10 text-pink-600 dark:text-pink-400" />
			<span className="text-2xl font-bold">
				{siteConfig.name}
			</span>
		</Link>
	)
}
