import Link from "next/link";

export function SkipNav() {
	return (
		<Link
			href="#skip"
			className="absolute -top-8 right-1/2 -translate-y-12 px-4 py-3 transition-transform duration-200 focus:top-4 focus:translate-y-3"
		>
			Skip to content
		</Link>
	);
}
