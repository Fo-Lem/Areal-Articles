import { createComment, getComments, getCommentsByPeriod, patchComment, removeComment } from '@controllers/commentsController.js'
import store from '..'

export const commentsStore = {

  state: () => {
    return {
      comments: [],
      commentsByPeriod: [],
    }
  },
  actions: {

    async fetchComments(ctx, articleId) {
      const res = await getComments(articleId)
      ctx.commit('updateComments', res)
    },
    async createComment(ctx, value) {
      const [articleId, body] = value
      if (await createComment(articleId, body))
        store.dispatch('fetchComments', articleId)
    },
    async removeComment(ctx, value) {
      const [articleId, commentId] = value
      if (await removeComment(articleId, commentId))
        store.dispatch('fetchComments', articleId)
    },
    async updateComments(ctx, values) {
      const [articleId, commentId, body] = values
      if (await patchComment(articleId, commentId, body))
        store.dispatch('fetchComments', articleId)
    },
    async fetchCommentsByPeriod(ctx, values) {
      const [from, to] = values
      const res = await getCommentsByPeriod(from, to)
      ctx.commit('updateCommentsByPeriod', res)
    },

  },
  getters: {
    allComments(state) {
      return state.comments
    },
    commentsByPeriod(state) {
      return state.commentsByPeriod
    },
  },
  mutations: {
    updateComments(state, comments) {
      state.comments = comments.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    updateCommentsByPeriod(state, comments) {
      state.commentsByPeriod = comments
    },

  },

}
