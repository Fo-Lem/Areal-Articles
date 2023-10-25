import { createStore } from 'vuex'
import { articlesStore } from './modules/articles.js'
import { commentsStore } from './modules/comments.js'

const store = createStore(
  {
    modules: {
      articlesStore, commentsStore,
    },
  },
)
export default store
