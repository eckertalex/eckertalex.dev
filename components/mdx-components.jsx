import Image from 'next/image'
import {CustomLink} from '@/components/link'
import {Badge} from '@/components/badge'
import {Code} from '@/components/code'

const MDXComponents = {
  Image,
  Badge,
  a: CustomLink,
  code: Code,
}

export {MDXComponents}
