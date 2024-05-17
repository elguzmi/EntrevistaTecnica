import newsApi from '../api/newsApi'
import type { Source, Article, newsResponse } from '../interfaces/index'

export const getNews = async (): Promise<newsResponse> => {
  const { data } = await newsApi.get('/everything?q=Apple&from=2024-05-14&sortBy=popularity')
  return data
}

export const getTopNews = async (top: number): Promise<Article[]> => {
  const { data } = await newsApi.get('/everything?q=Technology&from=2024-05-14&sortBy=popularity')
  return data.articles
    .map((e: Article, index: number) => {
      if (index <= top) return { ...e }
    })
    .filter((e: Article) => e)
}

export const getNewsByCtaegory = async (category: string): Promise<Article[]> => {
  const { data } = await newsApi.get(
    '/top-headlines?category=' + category + '&from=2024-05-14&sortBy=popularity'
  )
  return data.articles
    .map((e: Article, index: number) => {
      if (index <= 20) return { ...e }
    })
    .filter((e: Article) => e)
}
