<script>
import Article from '@components/article.vue'
import { getArticles } from '@controllers/articlesController.js'

export default {
  components: { Article },
  data() {
    return {
      Articles: [],
    }
  },
  async beforeMount() {
    this.Articles = await getArticles()
  },

}
</script>

<template>
  <div>
    <Article />
  </div>
</template>

<style scoped>

</style>
