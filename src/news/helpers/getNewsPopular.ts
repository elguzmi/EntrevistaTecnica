import newsApi from '../api/newsApi'
import type { Source, Article, newsResponse } from '../interfaces/index'

export const getNews = async (): Promise<newsResponse> => {
  const { data } = await newsApi.get('/everything?q=Apple&from=2024-05-14&sortBy=popularity')
  return data
}
