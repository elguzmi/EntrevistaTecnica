export interface RouterLinks {
  name: string
  path: string
  title: string
}

export const routerLinks: RouterLinks[] = [
  { path: '/', name: 'inicio', title: 'Inicio' },
  { path: '/news', name: 'news', title: 'News' }
  // {path:'/' , name:'home' , title :'home' },
]
