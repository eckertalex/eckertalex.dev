import Image from "next/image";

export default function AboutPage() {
	return (
		<article className="space-y-4">
			<section className="mt-8 flex flex-col-reverse gap-4 md:flex-row md:items-end">
				<div className="flex flex-1 flex-col items-start gap-2">
					<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
						Hey, I'm Alexander
					</h1>
					<p className="text-xl text-muted-foreground">
						A developer who cares about the user.
					</p>
					<p className="text-xl text-muted-foreground">
						I am a software developer, father of two and husband to
						a wonderful wife.
					</p>
				</div>
				<Image
					alt="Alexander Eckert"
					width={88}
					height={88}
					quality={100}
					priority
					src="/portrait.jpg"
					className="rounded-md"
				/>
			</section>
		</article>
	);
}
