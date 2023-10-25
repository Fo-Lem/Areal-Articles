import { createRouter, createWebHistory } from 'vue-router'
import ListArticles from '@components/listArticles.vue'
import Article from '@components/article.vue'
import CommentsByPeriod from '@components/commentsByPeriod.vue'

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
  },
  {
    name: 'commentsByPeriod',
    path: '/commentsByPeriod',
    component: CommentsByPeriod,
  },

]
const router = createRouter(
  {
    routes,
    history: createWebHistory(import.meta.env.BASE_URL),
  },
)
export { router }
