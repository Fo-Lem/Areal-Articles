import { createRouter, createWebHistory } from 'vue-router'
import ListArticles from '@components/ListArticles.vue'
import Article from '@components/Article.vue'

const routes = [
  { path: '/', redirect: '/listArticles' },
  {
    name: 'listArticles',
    path: '/listArticles',
    component: ListArticles,
  },
  {
    name: 'article',
    path: '/article_:articleId',
    component: Article,
    // children: [
    //   {
    //     name: 'article', path: 'article_:articleId', component: Article,
    //   },
    // ],
  },

]
const router = createRouter(
  {
    routes,
    history: createWebHistory(),
  },
)
export { router }
