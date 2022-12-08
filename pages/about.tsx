import { Container } from '../components/container'
import Image from 'next/image'
import portrait from 'public/portrait.jpg'

export default function About() {
	return (
		<Container title={`About - Alexander Eckert`}>
			<div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
					About Me
				</h1>
				<div className="mb-8 prose dark:prose-dark leading-6">
					<h2>Bio</h2>
					<h3>Job Title</h3>
					<p>
						Alexander Eckert, Senior Software Engineer at GoTo Technologies
						Germany GmbH
					</p>
					<h3>Education</h3>
					<p>
						Alexander Eckert graduated from the University of Alaska, Fairbanks,
						with a B.S. in Computer Science.
					</p>
					<h2>Headshot</h2>
					<a href="/portrait.jpg">
						<Image
							alt="Alexander Eckert headshot"
							width={400}
							quality={100}
							src={portrait}
							className="rounded-md"
						/>
					</a>
				</div>
			</div>
		</Container>
	)
}
