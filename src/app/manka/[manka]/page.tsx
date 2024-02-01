// 'use server'

import React from 'react'
import { revalidatePath } from 'next/cache'
import useWindowSize from '@/shared/lib/isMobile'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getServerSession } from 'next-auth'
import { signIn, useSession } from 'next-auth/react'

import MangaChapter from '@/components/c-manga-chapter'
import MangaInfo from '@/components/c-manga-info'
import { getMangaByName, getUserFavorite } from '@/app/actions/manga-actions'
import { toggleUserFavoriteManga } from '@/app/actions/user-actions'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Manga = async ({ params }: { params: { manka: string } }) => {
  const queryClient = new QueryClient()
  const session = await getServerSession(authOptions)
  const decodedName = decodeURIComponent(params.manka)

  const manga = await getMangaByName(decodedName)
  const favorite = await getUserFavorite(session?.user?.email as string, decodedName)

  // const { mutate, isPending } = trpc.user.toggleUserFavoriteManga.useMutation({
  //   onSuccess: () => {
  //     refetchFavorite()
  //   },
  // })

  const addFavorite = async (name: string) => {
    'use server'
    if (!session?.user?.email) {
      signIn()
    } else {
      await toggleUserFavoriteManga(session?.user?.email as string, name)
      revalidatePath(`/manka/${params.manka}`)
    }
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="overflow-x-hidden ">
        <MangaInfo manga={manga} addFavorite={addFavorite} favorite={favorite} />
        <MangaChapter manga={manga} />
      </main>
    </HydrationBoundary>
  )
}

export default Manga
