'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { HeartFilledIcon, HeartIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { getServerSession } from 'next-auth'
import { signOut } from 'next-auth/react'

import { deleteUserAccount } from '@/app/actions/user-actions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

import DeleteUserAndToggleTheme from './c-manga-deleteUser'

async function AsideBar() {
  const session = await getServerSession(authOptions)

  return (
    <div className="nav_bar_container">
      <nav className="z-100 flex w-full justify-evenly">
        <Link className="flex items-center justify-center" href="/">
          ❄️
        </Link>

        <div className="w-18 -ml-2 flex justify-between rounded-xl bg-background/10 py-1 pl-0 pr-4 backdrop-blur-sm ">
          <Link className="nav_btn" href="/">
            Manga
          </Link>
          <Link
            className="flex items-center justify-end rounded-xl bg-background/20 px-3.5 py-1 hover:bg-background/40"
            href="/manka/search"
          >
            <MagnifyingGlassIcon className="h-6 w-6 fill-current text-white" />
          </Link>
        </div>
        {session?.user && (
          <Link className=" nav_btn group h-10 w-10" href="/favorite">
            <HeartIcon className="h-10 w-10 fill-current text-primary group-hover:hidden" />
            <HeartFilledIcon className="hidden h-10 w-10 fill-current text-primary group-hover:block" />
            <div></div>
          </Link>
        )}
        <DeleteUserAndToggleTheme />
      </nav>
    </div>
  )
}

export default AsideBar
