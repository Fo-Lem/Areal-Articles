<script>
import { createArticle, getArticles, removeArticle } from '@controllers/articlesController.js'
import FormArticle from '@components/formArticle.vue'

export default {
  name: 'ListComments',
  components: {
    FormArticle,
  },
  data() {
    return {
      articles: [],
    }
  },
  async beforeMount() {
    await this.fetchArticle()
  },

  methods: {
    async fetchArticle() {
      this.articles = await getArticles()
      this.articles.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt)
      })
    },
    async createArt(value) {
      if (await createArticle(value.title, value.body))
        await this.fetchArticle()
    },
    async remove(articleId) {
      if (await removeArticle(articleId))
        await this.fetchArticle()
    },
  },

}
</script>

<template>
  <div class="flex flex-col gap-5 ">
    <div>
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="">
          <tr>
            <th class="text-start">
              {{ articles.length > 0 ? 'Список статей' : 'Список статей пуст' }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.id" class="hover:bg-gray-100 cursor-pointer">
            <td>
              <router-link :to="{ name: 'article', params: { articleId: article.id } }">
                {{ article.title }}
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <FormArticle :key="articles[articles.length - 1]?.id" @createArticle="(body) => { createArt(body) }" />
  </div>
</template>

<style>

</style>
