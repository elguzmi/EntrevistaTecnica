import axios from 'axios'

const newsApi = axios.create({
  baseURL: 'https://newsapi.org/v2/'
})
newsApi.defaults.headers.common['Authorization'] = 'a785abdd715e4f8dbfa753b7f057d46c'
export default newsApi
