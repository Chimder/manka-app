import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  genresTag: string[]
  langTag: string
  statusTag: string
  sortTag: string
  inputValue: string
  sortName: string
  sortValue: string
  setGenresTag: (genre: string) => void
  setLangTag: (lang: string) => void
  setStatus: (status: string) => void
  setSort: (sort: string) => void
  resetTag: () => void
  setInputValue: (value: string) => void
}

export const useFiLter = create<State>()(
  devtools(
    set => ({
      genresTag: [],
      langTag: '',
      statusTag: '',
      sortTag: '',
      inputValue: '',
      sortName: '',
      sortValue: '',
      setGenresTag: genre =>
        set(state => {
          const include = state.genresTag.includes(genre)
          if (include) {
            return { genresTag: state.genresTag.filter(tag => tag !== genre) }
          } else {
            return { genresTag: [...state.genresTag, genre] }
          }
        }),
      setLangTag: lang =>
        set(state => {
          const currentTag = state.langTag
          const newTag = lang
          return { langTag: !currentTag || currentTag !== newTag ? newTag : '' }
        }),
      setStatus: status =>
        set(state => {
          const currentTag = state.statusTag
          const newTag = status
          return { statusTag: !currentTag || currentTag !== newTag ? newTag : '' }
        }),
      setSort: sort =>
        set(state => {
          const currentTag = state.sortTag
          const newTag = sort
          let sortName = ''
          let sortValue = ''
          if (sort === 'Latest upload') {
            sortName = 'published'
            sortValue = 'desc'
          } else if (sort === 'Oldest upload') {
            sortName = 'published'
            sortValue = 'asc'
          } else if (sort === 'Title Ascending') {
            sortName = 'name'
            sortValue = 'asc'
          } else if (sort === 'Title Descending') {
            sortName = 'name'
            sortValue = 'desc'
          } else if (sort === 'Highest Rating') {
            sortName = 'averageRating'
            sortValue = 'desc'
          } else if (sort === 'Lowest Rating') {
            sortName = 'averageRating'
            sortValue = 'asc'
          }
          return {
            sortTag: !currentTag || currentTag !== newTag ? newTag : '',
            sortName,
            sortValue,
          }
        }),
      resetTag: () =>
        set(() => ({
          genresTag: [],
          langTag: '',
          statusTag: '',
          sortTag: '',
          inputValue: '',
          sortName: '',
          sortValue: '',
        })),
      setInputValue: value => set(() => ({ inputValue: value })),
    }),
    { name: 'filter' },
  ),
)
