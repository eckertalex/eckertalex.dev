import React from 'react'
import classNames from 'classnames'
/* -------------------------------------------------------------------------- */

type FiltersProps = {
  filters: {
    name: string
    count: number
  }[]
  currentFilter: string
  setFilter: (s: string) => void
}

export default function Filters(props: FiltersProps) {
  const {filters, currentFilter, setFilter} = props

  return (
    <div className="mb-6">
      {filters.map((filter) => (
        <button
          key={filter.name}
          type="button"
          onClick={() => setFilter(filter.name)}
          className={classNames(
            'mr-2 my-2 cursor-pointer font-mono text-lg inline-block leading-none  align-middle rounded shadow py-1 px-2',
            {
              'text-white bg-pink-500 ': filter.name === currentFilter,
              'text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800': filter.name !== currentFilter,
            }
          )}
        >
          {filter.name}{' '}
          <span
            className={classNames({
              'text-gray-100': filter.name === currentFilter,
              'text-pink-500': filter.name !== currentFilter,
            })}
          >
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  )
}
