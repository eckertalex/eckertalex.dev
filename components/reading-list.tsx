import { Fragment } from 'react'
import { format, parseISO } from 'date-fns'
import { Reading, ReadingList as ReadingListType } from '../lib/gitrows'

function ReadingListItem({ reading }: { reading: Reading }) {
	const { author, timestamp, url, title, twitter, date, description } = reading
	return (
		<li key={timestamp} className="w-full">
			<a
				className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100"
				target="_blank"
				rel="noopener noreferrer"
				href={url}
			>
				{title}
			</a>
			<div className="flex text-sm text-gray-500 mb-2">
				{author ? <p>{author}</p> : null}
				{twitter ? (
					<>
						<p>&nbsp;•&nbsp;</p>
						<a
							className="text-pink-500 hover:underline transition"
							target="_blank"
							rel="noopener noreferrer"
							href={`https://twitter.com/${twitter}`}
						>
							@{twitter}
						</a>
					</>
				) : null}
				{date ? (
					<>
						<p>&nbsp;•&nbsp;</p>
						<p>{format(parseISO(date), 'MMMM dd, y')}</p>
					</>
				) : null}
			</div>
			<p className="text-gray-600 dark:text-gray-400">{description}</p>
		</li>
	)
}

export function ReadingList(props: { readings: ReadingListType }) {
	const { readings } = props

	return (
		<ul className="w-full">
			{Object.keys(readings).map((groupDate) => (
				<Fragment key={groupDate}>
					<div className="text-gray-500 flex items-center space-y-2">
						<hr className="w-full border-1 border-gray-200 dark:border-gray-800" />
						<h3 className="text-sm shrink-0 ml-4 !mt-0">
							{format(new Date(groupDate), 'MMMM dd, y')}
						</h3>
					</div>
					<li className="mt-4">
						<ul className="flex flex-col space-y-10">
							{readings[groupDate].map((reading) => (
								<ReadingListItem key={reading.timestamp} reading={reading} />
							))}
						</ul>
					</li>
				</Fragment>
			))}
		</ul>
	)
}
