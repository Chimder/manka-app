import { InferModel, InferSelectModel, relations } from 'drizzle-orm'
import { doublePrecision, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export type Anime = InferSelectModel<typeof Anime>
export type Chapter = InferSelectModel<typeof Chapter>
export type AnimeWithChaper = Anime & { chapter: Chapter[] }

export const Anime = pgTable('Anime', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  img: text('img').notNull(),
  imgHeader: text('imgHeader').notNull(),
  describe: text('describe').notNull(),
  genres: text('genres').array().notNull(),
  author: text('author').notNull(),
  country: text('country').notNull(),
  published: integer('published'),
  averageRating: doublePrecision('averageRating').default(0),
  ratingCount: integer('ratingCount').default(0),
  status: text('status').notNull(),
  popularity: integer('popularity').default(0),
})

export const AnimeRelations = relations(Anime, ({ one, many }) => ({
  Chapter: many(Chapter),
}))

export const Chapter = pgTable('Chapter', {
  chapter: integer('chapter').notNull(),
  img: text('img').array().notNull(),
  name: text('name').notNull(),
  animeName: text('animeName')
    .notNull()
    .references(() => Anime.name),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})

export const ChapterRelations = relations(Chapter, ({ one }) => ({
  Anime: one(Anime, {
    fields: [Chapter.animeName],
    references: [Anime.name],
  }),
}))

export const Users = pgTable('User', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  image: text('image').notNull(),
  favorite: text('favorite').array().notNull(),
  createdAt: timestamp('createdAt').defaultNow().notNull(),
})
