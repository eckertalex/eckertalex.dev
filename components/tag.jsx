import Link from 'next/link'
import {kebabCase} from '@/lib/utils'

export function Tag({text}) {
  return (
    <Link href={`/tags/${kebabCase(text)}`}>
      <a className="text-sm font-medium text-pink-500 uppercase hover:text-pink-600 dark:hover:text-pink-400">
        {text.split(' ').join('-')}
      </a>
    </Link>
  )
}
