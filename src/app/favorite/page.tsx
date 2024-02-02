'use server'

import React from 'react'
import { getServerSession } from 'next-auth'

import FavoriteList from '@/components/c-user-favorite-manga'

import { getUserFavorite } from '../actions/user-actions'
import { authOptions } from '../api/auth/[...nextauth]/route'

type Props = {}

const Favorite = async () => {
  const session = await getServerSession(authOptions)
  const favorite = await getUserFavorite(session?.user?.email as string)

  console.log('USERFAVORITE', favorite)
  return (
    <section className="containerM overflow-x-hidden">
      <h1 className="py-4 text-3xl">Favorite Manga</h1>
      <FavoriteList favorite={favorite}></FavoriteList>
    </section>
  )
}

export default Favorite
