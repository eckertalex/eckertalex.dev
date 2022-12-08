import { useState } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { ReadingList } from '../components/reading-list'
import {
	fetchReadings,
	Reading,
	ReadingList as ReadingListType,
} from '../lib/gitrows'
import { Container } from '../components/container'

function match(searchValue: string, reading: Reading) {
	return (
		(reading.description ?? '')
			.toLowerCase()
			.includes(searchValue.toLowerCase()) ||
		(reading.title ?? '').toLowerCase().includes(searchValue.toLowerCase()) ||
		(reading.author ?? '').toLowerCase().includes(searchValue.toLowerCase())
	)
}

function filterReadings(
	searchValue: string,
	allReadings: ReadingListType,
): ReadingListType {
	return Object.fromEntries(
		Object.entries(allReadings)
			.map(([day, readings]) => [
				day,
				readings.filter((reading) => match(searchValue, reading)),
			])
			.filter(([, readings]) => readings.length > 0),
	)
}

type ReadingPageProps = {
	readings: ReadingListType
}

export default function ReadingPage({ readings }: ReadingPageProps) {
	const [searchValue, setSearchValue] = useState('')
	const filteredReadings = filterReadings(searchValue, readings)

	return (
		<Container
			title="Reading - Alexander Eckert"
			description="All the blog posts I have read since June 2020."
		>
			<div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
				<h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
					Reading
				</h1>
				<p className="mb-4 text-gray-600 dark:text-gray-400">
					{`Since June 2019 I have read ${
						Object.values(readings).flat().length
					} of programming related blog posts. I tried collecting them all here. Use the search below to filter by title, author, or description.`}
				</p>
				<div className="relative w-full mb-4">
					<input
						aria-label="Search articles"
						type="text"
						onChange={(e) => setSearchValue(e.target.value)}
						placeholder="Search articles"
						className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-pink-500 focus:border-pink-500 dark:bg-gray-800 dark:text-gray-100"
					/>
					<SearchIcon className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300" />
				</div>
				{!Object.values(filteredReadings).flat().length ? (
					<p className="mb-4 text-gray-600 dark:text-gray-400">
						No results found.
					</p>
				) : null}
				<ReadingList readings={filteredReadings} />
			</div>
		</Container>
	)
}

export const getStaticProps = async () => {
	const readings = await fetchReadings()

	return {
		props: {
			readings,
		},
		revalidate: 43200, // 12 hours
	}
}
