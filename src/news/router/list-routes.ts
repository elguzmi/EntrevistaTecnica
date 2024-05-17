export interface RouterLinks {
  name: string
  path: string
  title: string
  redirect?: string
}
const NAME_ROUTE: string = 'home'
export const routerLinks: RouterLinks[] = [
  { path: `/${NAME_ROUTE}/popularNews`, name: 'popularNews', title: 'Inicio' },
  {
    path: `/${NAME_ROUTE}/news`,
    name: 'news',
    title: 'News'
  }
]

export const routerLinksCategory: RouterLinks[] = [
  { path: `/${NAME_ROUTE}/news/technology`, name: 'sport', title: 'Technology' },
  { path: `/${NAME_ROUTE}/news/science`, name: 'science', title: 'Science' },
  { path: `/${NAME_ROUTE}/news/health`, name: 'health', title: 'Health' }

  // {path:'/' , name:'home' , title :'home' },
]
