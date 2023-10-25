import { createArticle, getArticle, getArticles, patchArticle, removeArticle } from '@controllers/articlesController.js'
import store from '..'

export const articlesStore = {

  state: () => {
    return {
      articles: [],
      article: {},
    }
  },
  actions: {
    async fetchArticles(ctx) {
      const res = await getArticles()
      ctx.commit('updateArticles', res)
    },
    async fetchArticle(ctx, articleId) {
      const res = await getArticle(articleId)
      ctx.commit('updateArticle', res)
    },
    async createArticle(ctx, value) {
      if (await createArticle(value.title, value.body))
        store.dispatch('fetchArticles')
    },
    async removeArticle(ctx, articleId) {
      if (await removeArticle(articleId))
        store.dispatch('fetchArticles')
    },
    async updateArticle(ctx, values) {
      const [articleId, title, body] = values
      if (await patchArticle(articleId, title, body))
        store.dispatch('fetchArticle', articleId)
    },

  },
  getters: {
    allArticles(state) {
      return state.articles
    },
    oneArticle(state) {
      return state.article
    },
  },
  mutations: {
    updateArticles(state, articles) {
      state.articles = articles.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    updateArticle(state, article) {
      state.article = article
    },

  },

}
