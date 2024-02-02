'use server'

import React from 'react'
import authOptions from '@/shared/lib/options'
import { getServerSession } from 'next-auth'

import FavoriteList from '@/components/c-user-favorite-manga'

import { getUserFavoriteManga } from '../actions/manga-actions'
import { getUserFavorite } from '../actions/user-actions'

type Props = {}

const Favorite = async () => {
  const session = await getServerSession(authOptions)
  const favorite = await getUserFavoriteManga(session?.user?.email as string)

  console.log('USERFAVORITE', favorite)
  return (
    <section className="containerM overflow-x-hidden">
      <h1 className="py-4 text-3xl">Favorite Manga</h1>
      <FavoriteList favorite={favorite}></FavoriteList>
    </section>
  )
}

export default Favorite
