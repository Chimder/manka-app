import React from 'react'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import authOptions from '@/shared/lib/options'
import { getServerSession } from 'next-auth'

import FavoriteList from '@/components/c-user-favorite-manga'

import { getUserFavoriteManga } from '../actions/manga-actions'
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

type Props = {}

const Favorite = async () => {
  const session = await getServerSession(authOptions)
  const favorite = await getUserFavoriteManga(session?.user?.email as string)

  if (!session?.user?.email) {
    revalidatePath('/favorite') // Update cached posts
    redirect('/')
  }

  return (
    <section className="containerM overflow-x-hidden">
      <h1 className="py-4 text-3xl">Favorite Manga</h1>
      <FavoriteList favorite={favorite}></FavoriteList>
    </section>
  )
}

export default Favorite
