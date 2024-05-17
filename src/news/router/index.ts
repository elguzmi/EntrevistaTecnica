import type { RouteRecordRaw } from 'vue-router'

const NAME_ROUTE: string = 'home'
export const newsRouter: RouteRecordRaw = {
  path: `/${NAME_ROUTE}`,
  name: 'home',
  redirect: `/${NAME_ROUTE}/popularNews`,
  component: () => import('@/news/layouts/NewsLayout.vue'),
  children: [
    {
      path: `/${NAME_ROUTE}/popularNews`,
      name: 'popularNews',
      component: () => import('@/news/views/HomeNews.vue')
    },
    {
      path: `/${NAME_ROUTE}/news`,
      name: 'news',
      component: () => import('@/news/views/NewsView.vue'),
      redirect: `/${NAME_ROUTE}/news/technology`,
      children: [
        {
          path: `/${NAME_ROUTE}/news/:category`,
          name: 'newscategory',
          component: () => import('@/news/views/CategoryView.vue'),
          props: { test: 1 }
        }
      ]
    }
  ]
}
