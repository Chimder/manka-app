import React from 'react'
import { useFiLter } from '@/shared/Store/filter'
import useStore from '@/shared/Store/useStore'
import { Cross1Icon } from '@radix-ui/react-icons'

import { Badge } from './ui/badge'

interface Props {
  handleTag: (tag: string, category: string) => void
}

export const BadgeList = ({ handleTag }: Props) => {
  const genresTag = useStore(useFiLter, store => store.genresTag)
  const langTag = useStore(useFiLter, store => store.langTag)
  const statusTag = useStore(useFiLter, store => store.statusTag)
  const sortTag = useStore(useFiLter, store => store.sortTag)
  return (
    <>
      {genresTag?.map(tag => (
        <Badge
          onClick={() => handleTag(tag, 'genres')}
          key={tag}
          className="relative ml-3 cursor-pointer bg-emerald-500 text-black    hover:bg-emerald-500/50"
        >
          {tag}
          <Cross1Icon className="ml-1 h-3 w-3 overflow-visible text-base hover:block" />
        </Badge>
      ))}
      {langTag && (
        <Badge
          onClick={() => handleTag(langTag, 'lang')}
          key={langTag}
          className="relative ml-3 cursor-pointer  bg-pink-600  text-black hover:bg-pink-600/50"
        >
          {langTag}
          <Cross1Icon className="ml-1 h-3 w-3 overflow-visible text-base hover:block" />
        </Badge>
      )}
      {statusTag && (
        <Badge
          onClick={() => handleTag(statusTag, 'status')}
          key={statusTag}
          className="relative ml-3 cursor-pointer bg-cyan-600 text-black  hover:bg-cyan-600/50"
        >
          {statusTag}
          <Cross1Icon className="ml-1 h-3 w-3 overflow-visible text-base hover:block" />
        </Badge>
      )}
      {sortTag && (
        <Badge
          onClick={() => handleTag(sortTag, 'sort')}
          key={sortTag}
          className="relative ml-3 cursor-pointer bg-fuchsia-600 text-black  hover:bg-fuchsia-600/50"
        >
          {sortTag}
          <Cross1Icon className="ml-1 h-3 w-3 overflow-visible text-base hover:block" />
        </Badge>
      )}
    </>
  )
}
