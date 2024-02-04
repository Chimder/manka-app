'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Prisma } from '@prisma/client'
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons'

import { Anime } from '@/app/actions/manga-actions'

import DropDownN from './drop-down'
import { Progress } from './ui/progress'

interface Props {
  manga: Anime
  isSuccess?: boolean
}

function AsideBarChapter({ manga }: Props) {
  const param = useParams()

  const chapter = param?.chapter
  const manka = decodeURIComponent(param?.manka as string)

  const params = Number(chapter)
  const prew = params - 1
  const next = params + 1
  return (
    <div className="nav_bar_container ">
      <div className="z-100 flex w-full justify-evenly">
        <div className="noisee" style={{ backgroundImage: 'url(/noise.webp)' }}></div>
        <Link className="nav_icon" href="/">
          ❄️
        </Link>
        <Link href={`/manka/${manka}`} className="nav_btn">
          Manga
        </Link>

        <div>
          <DropDownN
            text={chapter!}
            ctgr="chapter"
            clsn="w-[20vw] xl:w-[30vw] lg:w-[40vw] md:w-[80vw] h-full flex rounded-md bg-background/40  backdrop-blur-md z-999 p-4 text-lg overflow-y-auto "
            data={manga}
          ></DropDownN>
        </div>

        <Link
          href={`/manka/${manka}/${prew}`}
          className={`" nav_btn flex-col", flex ${
            params === 1 && 'pointer-events-none opacity-40'
          }`}
        >
          <ArrowLeftIcon />
          <span>Prew</span>
        </Link>
        <Link
          href={`/manka/${manka}/${next}`}
          className={`" nav_btn flex-col", flex ${
            params === manga?.chapters?.length && 'pointer-events-none opacity-40'
          }`}
        >
          <span>Next</span>
          <ArrowRightIcon />
        </Link>
      </div>
      <Progress className="fixed -bottom-5  left-1/2 z-50 flex h-[40px] w-full max-w-[438px] -translate-x-1/2 -translate-y-1/2 transform rounded-2xl" />
    </div>
  )
}

export default AsideBarChapter
